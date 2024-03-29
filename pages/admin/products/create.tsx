import { Box } from '@mui/material'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ProductForm } from 'src/pages-sections/admin'
import ProductVariantList from 'src/pages-sections/admin/products/product-variants/productVariantList'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { getErrorMessage } from 'src/utils/getErrorMessage'

import { formData } from 'src/utils/formData'
import { localize } from 'src/utils/Translate/localize'
import { api } from 'src/api/index.service'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
const initialValues = {
	name: '',
	published: false,
	category: '',
	shop: '',
	brand: '',
	unit: '',
}

const CreateProduct: NextPageAuth = () => {
	// states
	const { variants } = useTypedSelector((state) => state.productVariantsStore)
	const { setVariants } = useActions()

	const { push } = useRouter()

	// fetching
	const handleFormSubmit = async (data: FormData) => {
		if (!variants?.length) {
			toast.warning(
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
		let productId = null
		try {
			// create product
			const productResponse = await api.products.ProductsService.create(data)
			productId = productResponse.id
			console.log(productId)

			// create variants with new product
			for (let i of variants) {
				const variantResponse = await api.variants.ProductVariantService.create(
					formData({
						...i.variant,
						product: productResponse.id,
					})
				)
				// create images with new variant
				for (let j of i?.images) {
					await api.images.ImagesService.create(
						formData({
							product_variant: variantResponse.id,
							image: j.image,
						})
					)
				}

				// create attributes with new variant
				for (let attribute of i?.attribute_values) {
					if (attribute?.available) {
						await api.attributes.AttributesService.update(
							attribute.attributeId as string,
							{
								product_variant: variantResponse.id,
								attribute: attribute.attributeId,
								value: attribute?.attributeValue || attribute?.value,
							}
						)
					} else {
						await api.attributes.AttributesService.create(
							variantResponse.id as string,
							{
								attribute: attribute.attributeNameId,
								value: attribute?.attributeValue || attribute?.value,
							}
						)
					}
				}
			}

			push('/admin/products/')
		} catch (e) {
			console.log(productId)
			if (productId) {
				await api.products.ProductsService.delete(productId)
			}
			toast.error(
				localize({
					ru: 'Ошибка при создании товара',
					tr: 'Ürün yaratılırken hata',
					en: 'Error creating product',
				})
			)
			console.error('product: ' + getErrorMessage(e))
		}
	}

	useEffect(() => {
		setVariants([])
	}, [])

	return fetch ? (
		<Box py={4}>
			<H3 mb={2}>Add New Product</H3>

			<ProductForm
				initialValues={initialValues}
				handleFormSubmit={handleFormSubmit}
				update={false}
				includeShop={true}
			/>
			<ProductVariantList create={true} product={variants} />
		</Box>
	) : null
}

CreateProduct.isOnlyAdmin = true

CreateProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateProduct
