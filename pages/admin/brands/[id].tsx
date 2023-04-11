import { Box } from '@mui/material'
import { BrandsService } from 'src/api/services-admin/brands/brand.service'
import CreateForm from 'src/components/Form/CreateForm'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { brandEditForm } from 'src/utils/constants/forms'
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

const BrandUpdate: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')

	const {
		push,
		query: { id },
	} = useRouter()

	// brand fetch
	const { data: brand, isLoading } = useQuery(
		['brand admin get', id],
		() => BrandsService.get(id as string),
		{ enabled: !!id }
	)

	// brand update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'brand admin update',
		(data: FormData) => BrandsService.update(id as string, data),
		{
			onSuccess: () => {
				toast.success(
					localize({
						ru: 'Обновлен',
						tr: 'Güncellendi',
						en: 'Updated',
					})
				)
				push('/admin/brands')
			},
			onError: (e: any) => {
				console.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (data: FormData) => {
		await mutateAsync(data)
	}

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>{t('editBrand')}</H3>
			<CreateForm
				defaultData={brand}
				fields={brandEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

BrandUpdate.isOnlyAdmin = true

BrandUpdate.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default BrandUpdate
