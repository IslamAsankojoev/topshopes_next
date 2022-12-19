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
import { formData } from '../../../src/utils/formData'
import { useRouter } from 'next/router'
import { checkChangeThumbnail } from 'pages-sections/admin/products/productFormHelper'
import { productFormValidationSchema } from './productFormValidationSchema'
import { NextPageAuth } from 'shared/types/auth.types'

const EditProduct: NextPageAuth = () => {
	// getting all dependencies for selects
	const fetch = useProductFetch()
	const {
		query: { id },
	} = useRouter()

	// product fetch
	const {
		data: product,
		isLoading,
		isError,
	} = useQuery(
		'product admin get',
		() => AdminProductsService.getProduct(id as string),
		{
			enabled: !!id,
			onError: (e: any) => toast.error(e.message, { autoClose: 5000 }),
		}
	)

	// product mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'product admin update',
		(data: FormData) => AdminProductsService.updateProduct(id as string, data),
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
		await mutateAsync(formData(checkChangeThumbnail(data)))
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
EditProduct.isOnlyUser = true

EditProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export const getServerSideProps = async ({ query }) => {
	return { props: { query } }
}

export default EditProduct
