import { Box } from '@mui/material'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { ProductForm } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { productFormValidationSchema } from './productFormValidationSchema'
import { useProductFetch } from '../../../src/pages-sections/admin/products/useProductFetch'
import Loading from '../../../src/components/Loading'
import { toast } from 'react-toastify'
import { formData } from '../../../src/utils/formData'
import { useRouter } from 'next/router'
import { AdminProductsService } from 'api/services-admin/products/products.service'
import { useMutation } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'

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

const CreateProduct: NextPageAuth = () => {
	// getting all dependencies for selects
	const fetch = useProductFetch()

	const { push } = useRouter()

	// create product
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'product admin create',
		(data: FormData) => AdminProductsService.createProduct(data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/products/')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (data) => {
		await mutateAsync(formData(data))
	}

	if (fetch.isLoading || mutationLoading) {
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

CreateProduct.isOnlyUser = true

CreateProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateProduct
