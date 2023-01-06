import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { ProductForm } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import Loading from 'components/Loading'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import { useProductFetch } from 'pages-sections/admin/products/useProductFetch'
import { useRouter } from 'next/router'
import { NextPageAuth } from 'shared/types/auth.types'
import { IProduct } from 'shared/types/product.types'
import ProductVariantList from 'pages-sections/admin/products/product-variants/productVariantList'
import { ProductsService } from 'api/services/products/product.service'
import { productFormValidationSchemaVendor } from 'pages-sections/admin/products/productFormValidationSchema'

const EditProduct: NextPageAuth = () => {
	const fetch = useProductFetch(false)

	const {
		query: { id },
	} = useRouter()

	// product fetch
	const {
		data: product,
		isLoading,
		isError,
		refetch,
	} = useQuery('product get', () => ProductsService.get(id as string), {
		enabled: !!id,
		onError: (e: any) => toast.error(e.message, { autoClose: 5000 }),
	})

	// product mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'product update',
		(data: IProduct) => ProductsService.update(id as string, data),
		{
			onSuccess: async () => {
				toast.success('success')
				await refetch()
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const { push } = useRouter()

	const handleFormSubmit = async (data: IProduct, redirect: boolean) => {
		await mutateAsync(data)
		if (!redirect) push('/vendor/products/')
	}

	if (isLoading || fetch.isLoading || mutationLoading) {
		return <Loading />
	}

	return !isError && fetch ? (
		<Box py={4}>
			<H3 mb={2}>Edit Product</H3>
			{product ? (
				<>
					<ProductForm
						initialValues={{
							...product,
							brand: product?.brand?.id,
							category: product?.category.id,
						}}
						validationSchema={productFormValidationSchemaVendor}
						handleFormSubmit={handleFormSubmit}
						productFetch={fetch}
						update={true}
					/>

					<ProductVariantList
						refetch={refetch}
						product={product}
						fetch={fetch}
						isAdmin={false}
					/>
				</>
			) : null}
		</Box>
	) : null
}
EditProduct.isOnlyUser = true

EditProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default EditProduct
