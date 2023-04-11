import { Box } from '@mui/material'
import { PageCategoryService } from 'src/api/services-admin/pages-categories/pagesCategories.service'
import CreateForm from 'src/components/Form/CreateForm'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { pageCategoryEditForm } from 'src/utils/constants/forms'
import { localize } from 'src/utils/Translate/localize'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
const CreatePageCategory: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const {
		push,
		query: { id },
	} = useRouter()

	// PageCategory mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'pageCategory admin create',
		(data: FormData) => PageCategoryService.create(data),
		{
			onSuccess: () => {
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

	if (mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>{t('addNewPageCategory')}</H3>
			<CreateForm
				defaultData={{}}
				fields={pageCategoryEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreatePageCategory.isOnlyAdmin = true

CreatePageCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreatePageCategory
