import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { ProductForm } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { AdminProductsService } from '../../../src/api/services-admin/products/products.service'
import Loading from '../../../src/components/Loading'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import { IProduct } from '../../../src/shared/types/product.types'
import { useProductFetch } from '../../../src/pages-sections/admin/products/useProductFetch'
import { objToFormData } from '../../../src/utils/formData'
import { useRouter } from 'next/router'
import { checkChangeThumbnail } from 'pages-sections/admin/products/productFormHelper'
import { productFormValidationSchema } from './productFormValidationSchema'

// =============================================================================
EditProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

export default function EditProduct({ query }) {
	// getting all dependencies for selects
	const fetch = useProductFetch()

	// product fetch
	const {
		data: product,
		isLoading,
		isError,
	} = useQuery(
		'product admin get',
		() => AdminProductsService.getProduct(query.id),
		{
			refetchOnWindowFocus: false,
			retry: 1,
			onError: (e: any) => toast.error(e.message, { autoClose: 5000 }),
		}
	)

	// product mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'product admin update',
		(data: FormData) => AdminProductsService.updateProduct(query.id, data),
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

	const { push } = useRouter()

	const handleFormSubmit = async (data: IProduct) => {
		await mutateAsync(
			objToFormData(checkChangeThumbnail(data, product.thumbnail))
		)
	}

	if (isLoading || fetch.isLoading || mutationLoading) {
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
