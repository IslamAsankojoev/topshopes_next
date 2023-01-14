import { Box } from '@mui/material'
import { ProductsService } from 'api/services/products/product.service'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { useRouter } from 'next/router'
import { ProductForm } from 'pages-sections/admin'
import ProductVariantList from 'pages-sections/admin/products/product-variants/productVariantList'
import { productFormValidationSchemaVendor } from 'pages-sections/admin/products/productFormValidationSchema'
import React, { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IProduct } from 'shared/types/product.types'

const EditProduct: NextPageAuth = () => {
	const {
		query: { id },
	} = useRouter()

	// product fetch
	const {
		data: product,
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
				toast.success('updated')
				await refetch()
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const { push, replace, asPath } = useRouter()

	const handleFormSubmit = async (data: IProduct, redirect: boolean) => {
		await mutateAsync(data)
		if (!redirect) push('/vendor/products/')
		replace(asPath, asPath, { shallow: true })
	}

	return !isError && fetch ? (
		<Box py={4}>
			<H3 mb={2}>Edit Product</H3>
			{product ? (
				<>
					<ProductForm
						initialValues={product}
						validationSchema={productFormValidationSchemaVendor}
						handleFormSubmit={handleFormSubmit}
						update={true}
					/>

					<ProductVariantList
						refetch={refetch}
						product={product}
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
