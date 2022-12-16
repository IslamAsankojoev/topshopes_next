import { Box } from '@mui/material'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { ProductForm } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { productFormValidationSchema } from './productFormValidationSchema'
import { useProductFetch } from '../../../src/pages-sections/admin/products/useProductFetch'
import Loading from '../../../src/components/Loading'
import { toast } from 'react-toastify'
import { objToFormData } from '../../../src/utils/formData'
import { useRouter } from 'next/router'
import { AdminProductsService } from 'api/services-admin/products/products.service'

const CreateProduct = () => {
	const initialValues = {
		title: '',
		categories: [],
		colors: [],
		discount: 0,
		price: '0',
		published: false,
		rating: '',
		shop: '',
		sizes: [],
		brand: '',
		thumbnail: '',
		unit: '',
	}
	const fetch = useProductFetch()
	const { push } = useRouter()

	const handleFormSubmit = async (data) => {
		try {
			AdminProductsService.createProduct(objToFormData(data))
			toast.success('success')
			await push('/admin/products/')
		} catch (e: any) {
			toast.error(e?.message)
			console.log(e)
		}
	}

	if (fetch.isLoading) {
		return <Loading />
	}

	return fetch ? (
		<Box py={4}>
			<H3 mb={2}>Add New Product</H3>

			<ProductForm
				productFetch={fetch}
				initialValues={initialValues}
				validationSchema={productFormValidationSchema}
				handleFormSubmit={handleFormSubmit}
				update={false}
			/>
		</Box>
	) : null
}

// =============================================================================
CreateProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

export default CreateProduct
