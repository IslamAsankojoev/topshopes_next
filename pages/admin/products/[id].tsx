import { Box } from '@mui/material'
import { AdminProductsService } from 'src/api/services-admin/products/products.service'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ProductForm } from 'src/pages-sections/admin'
import ProductVariantList from 'src/pages-sections/admin/products/product-variants/productVariantList'
import { productFormValidationSchema } from 'src/pages-sections/admin/products/productFormValidationSchema'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IProduct } from 'src/shared/types/product.types'

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'adminActions',
			])),
		},
	}
}
const EditProduct: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t: commonT } = useTranslation('common')
	const { t } = useTranslation('adminActions')

	const {
		query: { id },
	} = useRouter()

	// product fetch
	const {
		data: product,
		isError,
		refetch,
	} = useQuery(
		'product admin get',
		() => AdminProductsService.get(id as string),
		{
			enabled: !!id,
			onError: (e: any) => toast.error(e.message, { autoClose: 5000 }),
		}
	)

	// product mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'product admin update',
		(data: IProduct) => AdminProductsService.update(id as string, data),
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

	const { push, replace, asPath } = useRouter()

	const handleFormSubmit = async (data: IProduct, redirect: boolean) => {
		await mutateAsync(data)
		if (!redirect) push('/admin/products/')
		replace(asPath, asPath, { shallow: true })
	}

	if (mutationLoading) {
		return <Loading />
	}

	return !isError && fetch ? (
		<Box py={4}>
			<H3 mb={2}>{t('editProduct')}</H3>
			{product ? (
				<>
					<ProductForm
						initialValues={product}
						validationSchema={productFormValidationSchema}
						handleFormSubmit={handleFormSubmit}
						update={true}
						includeShop
						refetch={refetch}
					/>

					<ProductVariantList
						refetch={refetch}
						product={product}
						isAdmin={true}
					/>
				</>
			) : null}
		</Box>
	) : null
}
EditProduct.isOnlyAdmin = true

EditProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default EditProduct
