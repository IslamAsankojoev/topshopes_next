import { Box } from '@mui/material'
import { AdminProductsService } from 'src/api/services-admin/products/products.service'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ProductForm } from 'src/pages-sections/admin'
import ProductVariantList from 'src/pages-sections/admin/products/product-variants/productVariantList'
import { productFormValidationSchema } from 'src/pages-sections/admin/products/productFormValidationSchema'
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
import { ProductVariantService } from 'src/api/services/product-variants/product-variants.service'
import { AttributesService } from 'src/api/services/attributes/attributes.service'
import VariantList from 'src/pages-sections/admin/products/product-variants/VariantList'
import { AttributesServiceAdmin } from 'src/api/services-admin/attributes/attributes.service'
import { ProductVariantAdminService } from 'src/api/services-admin/product-variants/product-variants.service'
import { dynamicLocalization } from 'src/utils/Translate/dynamicLocalization'

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
		() => AdminProductsService.get(id as string),
		{
			enabled: !!id,
			onError: (e: any) => toast.error(e.message, { autoClose: 5000 }),
		}
	)

	// product mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'product admin update',
		(data: IProduct) => AdminProductsService.update(id as string, data),
		{
			onSuccess: async () => {
				toast.success('success')
				await refetch()
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const { push, replace, asPath } = useRouter()

	const handleFormSubmit = async (data: IProduct, redirect: boolean) => {
		if (product.variants.length === 0) {
			toast.error(
				dynamicLocalization({
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
		push('/admin/products-v2/')
	}

	if (mutationLoading) {
		return <Loading />
	}

	const handleVariantChange = async (data: IProductVariant) => {
		try {
			await ProductVariantAdminService.update(data.id, {
				...dataWithCleanImage(data, 'thumbnail'),
			})

			const attributePromises = data?.attribute_values.map(
				async (attrValue: IProductAttributeValue) => {
					// if (!attrValue.value) return null
					if (attrValue.id) {
						await AttributesServiceAdmin.update(attrValue.id.toString(), {
							product_variant: data.id,
							value: attrValue.value || '',
						})
						return null
					}

					await AttributesServiceAdmin.create(data.id, {
						attribute: attrValue.attribute.id,
						value: attrValue.value || '',
					})
				}
			)

			await Promise.all(attributePromises)
			refetch()
		} catch (error) {
			console.error('Failed to update variant:', error)
		}
	}

	const handleVariantRemove = async (id: string) => {
		await ProductVariantAdminService.delete(id)
		refetch()
	}

	const handleVariantCreate = async (data: IProductVariant) => {
		const createdVariant: IProductVariant =
			await ProductVariantAdminService.create(
				formData({
					...data,
					product: id as string,
				})
			)
		const attributePromises = data?.attribute_values.map(async (attribute) => {
			if (!attribute.value) return null
			await AttributesService.create(createdVariant.id as string, {
				attribute: attribute.attribute.id,
				value: attribute.value || '',
			})
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
