import { Box } from '@mui/material'
import { PageCategoryService } from 'src/api/services-admin/pages-categories/pagesCategories.service'
import { PagesService } from 'src/api/services-admin/pages/pages.service'
import CreateForm from 'src/components/Form/CreateForm'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IPages } from 'src/shared/types/pages.types'
import { pageEditForm } from 'src/utils/constants/forms'
import { formData } from 'src/utils/formData'

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
const CreatePages: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()

	// pages create
	const { isLoading, mutateAsync } = useMutation(
		'page admin create',
		(data: FormData) => PagesService.create(data),
		{
			onSuccess: () => {
				push('/admin/pages-list')
			},
			onError: (e: any) => {
				console.error(e.message)
			},
		}
	)

	const { data: categories } = useQuery(`categoryPage admin get`, () =>
		PageCategoryService.getList({ page_size: 100 })
	)

	const handleFormSubmit = async (_: any, values: IPages) => {
		await mutateAsync(
			formData({
				...values,
				content: JSON.stringify({ data: values.content }),
			})
		)
	}

	return (
		<Box py={4}>
			<H3 mb={2}>{t('addNewPage')}</H3>
			{isLoading ? <Loading /> : null}
			<CreateForm
				maxFormWidth="100%"
				defaultData={{}}
				fields={[
					...pageEditForm,
					{
						name: 'category',
						label: 'Category',
						type: 'select',
						placeholder: 'Enter category',
						allNames: categories?.results?.map((category) => ({
							id: category?.id,
							name: category?.title,
						})),
						required: true,
						fullWidth: true,
					},
				]}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreatePages.isOnlyAdmin = true

CreatePages.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreatePages
