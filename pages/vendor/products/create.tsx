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
import { useMutation, useQueries } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { ProductsService } from 'api/services/products/product.service'
import { CategoriesService } from 'api/services/categories/category.service'
import { ColorsService } from 'api/services/colors/colors.service'
import { SizesService } from 'api/services/sizes/sizes.service'
import { BrandsService } from 'api/services/brands/brand.service'

const initialValues = {
	title: '',
	categories: [],
	colors: [],
	discount: 0,
	price: '0',
	published: false,
	rating: '',
	sizes: [],
	brand: '',
	thumbnail: '',
	unit: '',
}

const CreateProduct: NextPageAuth = () => {
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

	const { push } = useRouter()

	// create product
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'product admin create',
		(data: FormData) => ProductsService.create(data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/vendor/products/')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (data) => {
		// console.log(data)
		const { shop, ...rest } = data
		await mutateAsync(formData(rest))
	}

	if (
		Categories.isLoading ||
		Colors.isLoading ||
		Sizes.isLoading ||
		Brands.isLoading ||
		mutationLoading
	) {
		return <Loading />
	}

	return fetch ? (
		<Box py={4}>
			<H3 mb={2}>Add New Product</H3>

			<ProductForm
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
				initialValues={initialValues}
				validationSchema={productFormValidationSchema}
				handleFormSubmit={handleFormSubmit}
				update={false}
				includeShop={false}
			/>
		</Box>
	) : null
}

CreateProduct.isOnlyUser = true

CreateProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateProduct
