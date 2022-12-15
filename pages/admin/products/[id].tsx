import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { ProductForm } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import * as yup from 'yup'
import { useQuery } from 'react-query'
import { AdminProductsService } from '../../../src/api/services-admin/products/products.service'
import Loading from '../../../src/components/Loading'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import { IProduct } from '../../../src/shared/types/product.types'
import { instance } from '../../../src/api/interceptor'
import { getProductsUrlAdmin } from '../../../src/config/api.config'
import { useProductFetch } from '../../../src/pages-sections/admin/products/useProductFetch'
import { objToFormData } from '../../../src/utils/formData'
import { useRouter } from 'next/router'

// form field validation schema
export const productFormValidationSchema = yup.object().shape({
	title: yup.string().required('required'),
	categories: yup.array().required('required'),
	colors: yup.array().required('required'),
	discount: yup.number().required('required'),
	price: yup.string().required('required'),
	published: yup.boolean().required('required'),
	rating: yup.string().required('required'),
	shop: yup.string().required('required'),
	sizes: yup.array().required('required'),
	brand: yup.string().required('required'),
	thumbnail: yup.mixed(),
	unit: yup.string().required('required'),
})

// =============================================================================
EditProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

export default function EditProduct({ query }) {
	const {
		data: product,
		isLoading,
		isError,
	} = useQuery(
		'admin-product',
		() => AdminProductsService.getProduct(query.id),
		{
			refetchOnWindowFocus: false,
			retry: 1,
			onError: (e: any) => toast.error(e.message, { autoClose: 5000 }),
		}
	)
	const fetch = useProductFetch()
	const { push } = useRouter()

	const handleFormSubmit = async (data: IProduct) => {
		try {
			const response = await instance.patch(
				getProductsUrlAdmin(`${query.id}/`),
				objToFormData(data)
			)
			toast.success('success')
			await push('/admin/products/')
		} catch (e: any) {
			toast.error(e?.message)
			console.log(e)
		}
	}

	if (isLoading || fetch.isLoading) {
		return <Loading />
	}

	return !isError && fetch ? (
		<Box py={4}>
			<H3 mb={2}>Edit Product</H3>
			{product ? (
				<ProductForm
					initialValues={{
						...product,
						brand: product?.brand?.id,
						shop: product?.shop?.id,
					}}
					validationSchema={productFormValidationSchema}
					handleFormSubmit={handleFormSubmit}
					productFetch={fetch}
					update={true}
				/>
			) : null}
		</Box>
	) : null
}

export const getServerSideProps = async ({ query }) => {
	return { props: { query } }
}
