import { Box } from '@mui/material'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { ProductForm } from 'pages-sections/admin'
import Loading from 'components/Loading'
import React, { ReactElement, useEffect } from 'react'
import { ProductFetchTypes } from '../../../src/pages-sections/admin/products/useProductFetch'
import { toast } from 'react-toastify'
import { formData } from 'utils/formData'
import { useRouter } from 'next/router'
import { NextPageAuth } from 'shared/types/auth.types'
import ProductVariantList from 'pages-sections/admin/products/product-variants/productVariantList'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useActions } from 'hooks/useActions'
import { ImagesService } from 'api/services/images/images.service'
import { ProductVariantService } from 'api/services/product-variants/product-variants.service'
import { getErrorMessage } from 'utils/getErrorMessage'
import { ProductsService } from 'api/services/products/product.service'
import { productFormValidationSchemaVendor } from 'pages-sections/admin/products/productFormValidationSchema'
import { AttributesService } from 'api/services/attributes/attributes.service'

const initialValues = {
	title: '',
	published: false,
	category: '',
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
			if (productId) {
				await ProductsService.delete(productId)
			}
			toast.error('product: ' + getErrorMessage(e))
		}
	}

	React.useEffect(() => {
		setVariants([])
	}, [])

	return fetch ? (
		<Box py={4}>
			<H3 mb={2}>Add New Product</H3>

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

CreateProduct.isOnlyUser = true

CreateProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateProduct
