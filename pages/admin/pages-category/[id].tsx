import { Box } from '@mui/material'
import { PageCategoryService } from 'api/services-admin/pages-categories/pagesCategories.service'
import CreateForm from 'components/Form/CreateForm'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IPagesCategory } from 'shared/types/pages-category.types'
import { pageCategoryEditForm } from 'utils/constants/forms'

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
		() => PageCategoryService.get(id as string),
		{
			enabled: !!id,
		}
	)

	// PageCategory mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'pageCategory admin update',
		(data: FormData) => PageCategoryService.update(id as string, data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/pages-category')
			},
			onError: (e: any) => {
				toast.error(e.message)
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

UpdatePageCategory.isOnlyUser = true

UpdatePageCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdatePageCategory
