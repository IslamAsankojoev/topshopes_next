import { Box } from '@mui/material'
import { AttributesService } from 'src/api/services/attributes/attributes.service'
import { ImagesService } from 'src/api/services/images/images.service'
import { ProductVariantService } from 'src/api/services/product-variants/product-variants.service'
import { ProductsService } from 'src/api/services/products/product.service'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ProductForm } from 'src/pages-sections/admin'
import ProductVariantList from 'src/pages-sections/admin/products/product-variants/productVariantList'
import { productFormValidationSchemaVendor } from 'src/pages-sections/admin/products/productFormValidationSchema'
import { ReactElement, useEffect } from 'react'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { formData } from 'src/utils/formData'
import { getErrorMessage } from 'src/utils/getErrorMessage'

const initialValues = {
	title: '',
	published: false,
	category: '',
	brand: '',
	unit: '',
}

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

const CreateProduct: NextPageAuth = () => {
	// fetching
	const { variants } = useTypedSelector((state) => state.productVariantsStore)
	const { setVariants } = useActions()
	const { push } = useRouter()

	const createProduct = async (data: FormData) => {
		try {
			// create product
			const productResponse = await ProductsService.create(data)
			const productId = productResponse.id

			// create variants with new product
			const variantPromises = variants.map(async (variant) => {
				const variantData = formData({
					...variant.variant,
					product: productId,
				})
				const variantResponse = await ProductVariantService.create(variantData)
				const imagePromises = variant?.images.map(async (image) => {
					const imageData = formData({
						product_variant: variantResponse.id,
						image: image.image,
					})
					await ImagesService.create(imageData)
				})
				await Promise.all(imagePromises)
				const attributePromises = variant?.attribute_values.map(
					async (attribute) => {
						if (!attribute.attributeValue && !attribute.value) return
						if (attribute?.available) {
							await AttributesService.update(attribute.attributeId as string, {
								product_variant: variantResponse.id,
								attribute: attribute.attributeId,
								value: attribute.attributeValue || attribute.value,
							})
						} else {
							await AttributesService.create(variantResponse.id as string, {
								attribute: attribute.attributeNameId,
								value: attribute.attributeValue || attribute.value,
							})
						}
					}
				)
				await Promise.all(attributePromises)
			})
			await Promise.all(variantPromises)

			push('/vendor/products/')
		} catch (e) {
			console.error(e)
			toast.error('Продукт не был создан: ' + getErrorMessage(e))
		}
	}

	const handleFormSubmit = async (data: FormData) => {
		if (!variants?.length) {
			toast.error('you must create at least one variant to create a product')
			return
		}
		await createProduct(data)
	}

	useEffect(() => {
		setVariants([])
	}, [])

	return fetch ? (
		<Box py={4}>
			<H3 mb={2}>Добавить новый продукт</H3>

			<ProductForm
				initialValues={initialValues}
				handleFormSubmit={handleFormSubmit}
				update={false}
			/>
			<ProductVariantList create={true} product={variants} />
		</Box>
	) : null
}

CreateProduct.isOnlySeller = true

CreateProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateProduct
