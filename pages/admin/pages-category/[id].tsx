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
import { pageCategoryEditForm } from 'src/utils/constants/forms'
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
const UpdatePageCategory: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const {
		push,
		query: { id },
	} = useRouter()

	// PageCategory fetch
	const { data: size, isLoading } = useQuery(
		'pageCategory admin get',
		() => api_admin.pageCategories.PageCategoryService.get(id as string),
		{
			enabled: !!id,
		}
	)

	// PageCategory mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		['pageCategory admin update', id],
		(data: FormData) =>
			api_admin.pageCategories.PageCategoryService.update(id as string, data),
		{
			onSuccess: () => {
				toast.success(
					localize({
						ru: 'Обновлен',
						tr: 'Güncellendi',
						en: 'Updated',
					})
				)
				push('/admin/pages-category')
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
			<H3 mb={2}>{t('editPageCategory')}</H3>
			<CreateForm
				defaultData={size}
				fields={pageCategoryEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

UpdatePageCategory.isOnlyAdmin = true

UpdatePageCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdatePageCategory
