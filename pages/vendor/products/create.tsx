import { Box } from '@mui/material'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { ProductForm } from 'pages-sections/admin'

import { useProductFetch } from 'pages-sections/admin/products/useProductFetch'
import Loading from 'components/Loading'
import React, { ReactElement, useEffect } from 'react'
import { ProductFetchTypes } from '../../../src/pages-sections/admin/products/useProductFetch'
import { toast } from 'react-toastify'
import { formData } from 'utils/formData'
import { useRouter } from 'next/router'
import { NextPageAuth } from 'shared/types/auth.types'
import ProductVariantList from 'pages-sections/admin/products/product-variants/productVariantList'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useActions } from 'hooks/useActions'
import { ImagesService } from 'api/services/images/images.service'
import { ProductVariantService } from 'api/services/product-variants/product-variants.service'
import { getErrorMessage } from 'utils/getErrorMessage'
import { ProductsService } from 'api/services/products/product.service'
import { productFormValidationSchemaVendor } from 'pages-sections/admin/products/productFormValidationSchema'
import { useQueries, useQuery } from 'react-query'
import { CategoriesService } from 'api/services/categories/category.service'
import { BrandsService } from 'api/services/brands/brand.service'
import { SizesService } from 'api/services/sizes/sizes.service'
import { ColorsService } from 'api/services/colors/colors.service'
import { ShopsService } from 'api/services-admin/shops/shops.service'

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

	const {
		'0': { data: categories, isLoading: categoriesLoading },
		'1': { data: brands, isLoading: brandsLoading },
		'2': { data: sizes, isLoading: sizesLoading },
		'3': { data: colors, isLoading: colorsLoading },
	} = useQueries([
		{
			queryKey: 'categories get',
			queryFn: CategoriesService.getList,
		},
		{
			queryKey: 'brands get',
			queryFn: BrandsService.getList,
		},
		{
			queryKey: 'sizes get',
			queryFn: SizesService.getList,
		},
		{
			queryKey: 'colors get',
			queryFn: ColorsService.getList,
		},
	])

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
			push('/vendor/products/')
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
				productFetch={{
					categories,
					brands,
					sizes,
					colors,
					isLoading:
						categoriesLoading || sizesLoading || brandsLoading || colorsLoading,
				}}
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
