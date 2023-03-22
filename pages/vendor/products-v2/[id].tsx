import { Box } from '@mui/material'
import { ProductsService } from 'src/api/services/products/product.service'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ProductForm } from 'src/pages-sections/admin'
import ProductVariantList from 'src/pages-sections/admin/products/product-variants/productVariantList'
import { productFormValidationSchemaVendor } from 'src/pages-sections/admin/products/productFormValidationSchema'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import {
	IProduct,
	IProductAttribute,
	IProductAttributeValue,
	IProductVariant,
} from 'src/shared/types/product.types'
import ProductVariantListV2 from 'src/pages-sections/admin/products/product-variants/productVariantListV2'
import VariantList from 'src/pages-sections/admin/products/product-variants/VariantList'
import { ProductVariantService } from 'src/api/services/product-variants/product-variants.service'
import { dataWithCleanImage, formData } from 'src/utils/formData'
import { AttributesService } from 'src/api/services/attributes/attributes.service'
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
	const { t } = useTranslation('adminActions')
	const id = useRouter().query.id

	const {
		data: product,
		isError,
		refetch,
	} = useQuery(
		['product get v2', id],
		() => ProductsService.get(id as string),
		{
			enabled: !!id,
			keepPreviousData: true,
			onError: (e: any) => toast.error(e.message, { autoClose: 5000 }),
		}
	)

	// product mutation
	const { mutateAsync } = useMutation(
		'product update v2',
		(data: IProduct) => ProductsService.update(id as string, data),
		{
			onSuccess: async () => {
				toast.success('updated')
				refetch()
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const { push } = useRouter()

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
		push('/vendor/products-v2/')
	}

	const handleVariantChange = async (data: IProductVariant) => {
		try {
			await ProductVariantService.update(data.id, {
				...dataWithCleanImage(data, 'thumbnail'),
			})

			const attributePromises = data?.attribute_values.map(
				async (attrValue: IProductAttributeValue) => {
					// if (!attrValue.value) return null
					if (attrValue.id) {
						await AttributesService.update(attrValue.id.toString(), {
							product_variant: data.id,
							value: attrValue.value || '',
						})
						return null
					}

					await AttributesService.create(data.id, {
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
		await ProductVariantService.delete(id)
		refetch()
	}

	const handleVariantCreate = async (data: IProductVariant) => {
		const createdVariant: IProductVariant = await ProductVariantService.create(
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
						refetch={refetch}
					/>

					{/* <ProductVariantListV2
						refetch={refetch}
						product={product}
						isAdmin={false}
					/> */}
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
EditProduct.isOnlySeller = true

EditProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default EditProduct
