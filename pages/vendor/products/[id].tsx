import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { ProductForm } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { useMutation, useQueries, useQuery } from 'react-query'
import { AdminProductsService } from '../../../src/api/services-admin/products/products.service'
import Loading from '../../../src/components/Loading'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import { IProduct } from '../../../src/shared/types/product.types'
import { useProductFetch } from '../../../src/pages-sections/admin/products/useProductFetch'
import { formData } from '../../../src/utils/formData'
import { useRouter } from 'next/router'
import { checkChangeThumbnail } from 'pages-sections/admin/products/productFormHelper'
import { productFormValidationSchema } from './validationSchema'
import { NextPageAuth } from 'shared/types/auth.types'
import { ProductsService } from 'api/services/products/product.service'
import { CategoriesService } from 'api/services/categories/category.service'
import { ColorsService } from 'api/services/colors/colors.service'
import { SizesService } from 'api/services/sizes/sizes.service'
import { BrandsService } from 'api/services/brands/brand.service'

const EditProduct: NextPageAuth = () => {
	// getting all dependencies for selects

	const {
		'0': Categories,
		'1': Colors,
		'2': Sizes,
		'3': Brands,
	} = useQueries([
		{
			queryKey: 'product categories fetch',
			queryFn: CategoriesService.getList,
		},
		{
			queryKey: 'product colors fetch',
			queryFn: ColorsService.getList,
		},
		{
			queryKey: 'product sizes fetch',
			queryFn: SizesService.getList,
		},
		{
			queryKey: 'product brands fetch',
			queryFn: BrandsService.getList,
		},
	])

	const {
		query: { id },
	} = useRouter()

	// product fetch
	const {
		data: product,
		isLoading,
		isError,
	} = useQuery('product admin get', () => ProductsService.get(id as string), {
		enabled: !!id,
		onError: (e: any) => toast.error(e.message, { autoClose: 5000 }),
	})

	// product mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'product admin update',
		(data: FormData) => ProductsService.update(id as string, data),
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

	if (
		isLoading ||
		Categories.isLoading ||
		Colors.isLoading ||
		Sizes.isLoading ||
		Brands.isLoading ||
		mutationLoading
	) {
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
					}}
					validationSchema={productFormValidationSchema}
					handleFormSubmit={handleFormSubmit}
					productFetch={{
						categories: Categories.data,
						colors: Colors.data,
						size: Sizes.data,
						brands: Brands.data,
						isLoading:
							Categories.isLoading ||
							Colors.isLoading ||
							Sizes.isLoading ||
							Brands.isLoading,
					}}
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
