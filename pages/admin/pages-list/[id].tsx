import { Box } from '@mui/material'
import { PageCategoryService } from 'src/api/services-admin/pages-categories/pagesCategories.service'
import { PagesService } from 'src/api/services-admin/pages/pages.service'
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
import { IPages } from 'src/shared/types/pages.types'
import { pageEditForm } from 'src/utils/constants/forms'
import { formData } from 'src/utils/formData'

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
const UpdatePages: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const {
		push,
		query: { id },
	} = useRouter()

	// page fetching
	const { data: page, isLoading } = useQuery(
		'page admin get',
		() => PagesService.get(id as string),
		{
			enabled: !!id,
		}
	)

	// page update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'page admin update',
		(data: FormData | IPages) => PagesService.update(id as string, data),
		{
			onSuccess: () => {
				toast.success('Page updated')
				push('/admin/pages-list')
			},
		}
	)

	const { data: categories } = useQuery(`categoryPage admin get`, () =>
		PageCategoryService.getList({ page_size: 100 })
	)

	const handleFormSubmit = async (_: any, values: IPages) => {
		const { image, ...other } = values
		const clearData = image
			? { ...values, content: JSON.stringify({ data: values.content }) }
			: { ...other, content: JSON.stringify({ data: values.content }) }
		await mutateAsync(formData(clearData))
	}

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>{t('editPage')}</H3>
			<CreateForm
				maxFormWidth="1000"
				defaultData={{
					...page,
					content: page?.content?.data,
				}}
				fields={[
					...pageEditForm,
					{
						name: 'category',
						label: 'Category',
						type: 'select',
						placeholder: 'Enter category',
						allNames: categories?.results?.map((c) => ({
							id: c?.id,
							name: c?.title,
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

UpdatePages.isOnlyAdmin = true

UpdatePages.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdatePages
