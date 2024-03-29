import { Box } from '@mui/material'
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
import { brandTypeEditForm } from 'src/utils/constants/forms'
import { localize } from 'src/utils/Translate/localize'
import { api_admin } from 'src/api/index.service'

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

const CreateBrandType: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')

	const {
		push,
		query: { id },
	} = useRouter()

	// brand type fetch
	const { data: brandType, isLoading } = useQuery(
		'get brandType one',
		() => api_admin.brandTypes.BrandTypesService.get(id as string),
		{
			enabled: !!id,
		}
	)

	// brand type update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'brandTypes admin update',
		(data: FormData) =>
			api_admin.brandTypes.BrandTypesService.update(id as string, data),
		{
			onSuccess: () => {
				toast.success(
					localize({
						ru: 'Обновлен',
						tr: 'Güncellendi',
						en: 'Updated',
					})
				)
				push('/admin/brands-types')
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
			<H3 mb={2}>{t('editBrandType')}</H3>
			<CreateForm
				defaultData={brandType}
				fields={brandTypeEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreateBrandType.isOnlyAdmin = true

CreateBrandType.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateBrandType
