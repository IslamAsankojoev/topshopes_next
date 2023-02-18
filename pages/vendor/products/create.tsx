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
	// states
	const { variants } = useTypedSelector((state) => state.productVariantsStore)
	const { setVariants } = useActions()

	const { push } = useRouter()

	// fetching
	const handleFormSubmit = async (data: FormData) => {
		if (!variants?.length) {
			toast.error('you must create at least one variant to create a product')
			return
		}
		let productId = null
		try {
			// create product
			const productResponse = await ProductsService.create(data)
			productId = productResponse.id

			// create variants with new product
			for (let i of variants) {
				const variantResponse = await ProductVariantService.create(
					formData({
						...i.variant,
						product: productResponse.id,
					})
				)

				// create images with new variant
				for (let j of i?.images) {
					await ImagesService.create(
						formData({
							product_variant: variantResponse.id,
							image: j.image,
						})
					)
				}

				// create attributes with new variant
				for (let attribute of i?.attribute_values) {
					if (!attribute.attributeValue && !attribute.value) continue
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
			}

			push('/vendor/products/')
		} catch (e) {
			console.log(e)
			if (productId) {
				await ProductsService.delete(productId)
			}
			toast.error('Продукт не был создан')
			toast.error('product: ' + getErrorMessage(e))
		}
	}

	useEffect(() => {
		setVariants([])
	}, [])

	return fetch ? (
		<Box py={4}>
			<H3 mb={2}>Добавить новый продукт</H3>

			<ProductForm
				initialValues={initialValues}
				validationSchema={productFormValidationSchemaVendor}
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
