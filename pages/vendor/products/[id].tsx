import { Box } from '@mui/material'
import { ProductsService } from 'src/api/services/products/product.service'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ProductForm } from 'src/pages-sections/admin'
import ProductVariantList from 'src/pages-sections/admin/products/product-variants/productVariantList'
import { productFormValidationSchemaVendor } from 'src/pages-sections/admin/products/productFormValidationSchema'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IProduct } from 'src/shared/types/product.types'
import { localize } from 'src/utils/Translate/localize'

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
	const { t } = useTranslation('adminActions')
	const {
		query: { id },
	} = useRouter()

	// product fetch
	const {
		data: product,
		isError,
		refetch,
	} = useQuery(['product get', id], () => ProductsService.get(id as string), {
		enabled: !!id,
		keepPreviousData: true,
		onError: (e: any) => toast.error(e.message, { autoClose: 5000 }),
	})

	// product mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'product update',
		(data: IProduct) => ProductsService.update(id as string, data),
		{
			onSuccess: async () => {
				toast.success(
					localize({
						ru: 'Обновлен',
						tr: 'Güncellendi',
						en: 'Updated',
					})
				)
				await refetch()
			},
			onError: (e: any) => {
				console.error(e.message)
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
			<H3 mb={2}>{t('editProduct')}</H3>
			{product ? (
				<>
					<ProductForm
						initialValues={product}
						handleFormSubmit={handleFormSubmit}
						update={true}
						refetch={refetch}
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
EditProduct.isOnlySeller = true

EditProduct.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default EditProduct
