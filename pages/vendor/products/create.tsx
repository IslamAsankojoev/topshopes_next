import { Box } from '@mui/material'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { ProductForm } from 'pages-sections/admin'

import React, { ReactElement, useEffect } from 'react'
import { productFormValidationSchema } from '../../../src/components/validationSchema'
import { useProductFetch } from '../../../src/pages-sections/admin/products/useProductFetch'
import Loading from '../../../src/components/Loading'
import { toast } from 'react-toastify'
import { formData } from '../../../src/utils/formData'
import { useRouter } from 'next/router'
import { NextPageAuth } from 'shared/types/auth.types'
import ProductVariantList from 'pages-sections/admin/products/product-variants/productVariantList'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useActions } from 'hooks/useActions'
import { ImagesService } from 'api/services/images/images.service'
import { ProductVariantService } from 'api/services/product-variants/product-variants.service'
import { getErrorMessage } from 'utils/getErrorMessage'
import { ProductsService } from 'api/services/products/product.service'

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

	// getting all dependencies for selects
	const fetch = useProductFetch(false)

	const { push } = useRouter()

	// fetching
	const handleFormSubmit = async (data: FormData) => {
		try {
			// create product
			const productResponse = await ProductsService.create(data)

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
			}
			push('/admin/products/')
		} catch (e) {
			toast.error('product: ' + getErrorMessage(e))
		}
	}

	React.useEffect(() => {
		setVariants([])
	}, [])

	if (fetch.isLoading) {
		return <Loading />
	}

	return fetch ? (
		<Box py={4}>
			<H3 mb={2}>Add New Product</H3>

			<ProductForm
				productFetch={fetch}
				initialValues={initialValues}
				validationSchema={productFormValidationSchemaVendor}
				handleFormSubmit={handleFormSubmit}
				update={false}
			/>
			<ProductVariantList create={true} product={variants} fetch={fetch} />
		</Box>
	) : null
}

CreateProduct.isOnlyUser = true

CreateProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateProduct
