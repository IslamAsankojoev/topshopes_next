import { Box } from '@mui/material'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ProductForm } from 'src/pages-sections/admin'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import {
	IProduct,
	IProductAttributeValue,
	IProductVariant,
} from 'src/shared/types/product.types'
import { dataWithCleanImage, formData } from 'src/utils/formData'
import VariantList from 'src/pages-sections/admin/products/product-variants/VariantList'
import { localize } from 'src/utils/Translate/localize'
import { api, api_admin } from 'src/api/index.service'

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'adminActions',
			])),
		},
	}
}
const EditProduct: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t: commonT } = useTranslation('common')
	const { t } = useTranslation('adminActions')

	const {
		query: { id },
	} = useRouter()

	// product fetch
	const {
		data: product,
		isError,
		refetch,
	} = useQuery(
		['product admin get', id],
		() => api_admin.products.AdminProductsService.get(id as string),
		{
			enabled: !!id,
			onError: (e: any) => toast.error(e.message, { autoClose: 5000 }),
		}
	)

	// product mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'product admin update',
		(data: IProduct) =>
			api_admin.products.AdminProductsService.update(id as string, data),
		{
			onSuccess: async () => {
				toast.success(
					localize({
						ru: 'Обновлен',
						tr: 'Güncellendi',
						en: 'Updated',
					})
				)
				await refetch()
			},
			onError: (e: any) => {
				console.error(e.message)
			},
		}
	)

	const { push, replace, asPath } = useRouter()

	const handleFormSubmit = async (data: IProduct, redirect: boolean) => {
		if (product.variants.length === 0) {
			toast.info(
				localize({
					ru: 'Добавьте варианты товара',
					tr: 'Ürün varyantlarını ekleyin',
					en: 'Add product variants',
					kg: 'Төрлүктөрдү кошуңуз',
					kz: 'Төрліктерді қосыңыз',
				})
			)
			return null
		}
		await mutateAsync(data)
		push('/admin/products/')
	}

	if (mutationLoading) {
		return <Loading />
	}

	const handleVariantChange = async (data: IProductVariant) => {
		try {
			await api_admin.variants.ProductVariantAdminService.update(data.id, {
				...dataWithCleanImage(data, 'thumbnail'),
			})

			const attributePromises = data?.attribute_values.map(
				async (attrValue: IProductAttributeValue) => {
					// if (!attrValue.value) return null
					if (attrValue.id) {
						await api_admin.attributes.AttributesServiceAdmin.update(
							attrValue.id.toString(),
							{
								product_variant: data.id,
								value: attrValue.value || '',
							}
						)
						return null
					}

					// await AttributesServiceAdmin.create(data.id, {
					// 	attribute: attrValue.attribute.id,
					// 	value: attrValue.value || '',
					// })
				}
			)

			await Promise.all(attributePromises)
			refetch()
		} catch (error) {
			console.error('Failed to update variant:', error)
		}
	}

	const handleVariantRemove = async (id: string) => {
		await api_admin.variants.ProductVariantAdminService.delete(id)
		refetch()
	}

	const handleVariantCreate = async (data: IProductVariant) => {
		const createdVariant: IProductVariant =
			await api_admin.variants.ProductVariantAdminService.create(
				formData({
					...data,
					product: id as string,
				})
			)
		const attributePromises = data?.attribute_values.map(async (attribute) => {
			if (!attribute.value) return null
			await api.attributes.AttributesService.create(
				createdVariant.id as string,
				{
					attribute: attribute.attribute.id,
					value: attribute.value || '',
				}
			)
		})
		await Promise.all(attributePromises)
		refetch()
	}

	return !isError && fetch ? (
		<Box py={4}>
			<H3 mb={2}>{t('editProduct')}</H3>
			{product ? (
				<>
					<ProductForm
						initialValues={product}
						handleFormSubmit={handleFormSubmit}
						update={true}
						includeShop
						refetch={refetch}
					/>

					<VariantList
						variants={product.variants}
						handleVariantChange={handleVariantChange}
						handleVariantRemove={handleVariantRemove}
						handleVariantCreate={handleVariantCreate}
					/>
				</>
			) : null}
		</Box>
	) : null
}
EditProduct.isOnlyAdmin = true

EditProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default EditProduct
