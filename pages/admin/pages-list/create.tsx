import { Box } from '@mui/material'
import { AdminPageCategoryService } from 'api/services-admin/pages-categories/pagesCategories.service'
import { AdminPagesService } from 'api/services-admin/pages/pages.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IPages } from 'shared/types/pages.types'
import { pageEditForm } from 'utils/constants/forms'
import React from 'react'
import { formData } from 'utils/formData'

const CreatePages: NextPageAuth = () => {
	const { push } = useRouter()

	// pages create
	const { isLoading, mutateAsync } = useMutation(
		'page admin create',
		(data: FormData) => AdminPagesService.create(data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/pages-list')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const { data: categories, isLoading: categoryLoading } = useQuery(
		'categoryPage admin get',
		AdminPageCategoryService.getList
	)

	const handleFormSubmit = async (data: FormData, values: IPages) => {
		await mutateAsync(
			formData({ ...values, content: { data: values.content } })
		)
	}

	if (isLoading || categoryLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New Page</H3>
			<CreateForm
				defaultData={{}}
				fields={[
					...pageEditForm,
					{
						name: 'category',
						label: 'Category',
						type: 'select',
						placeholder: 'Enter category',
						allNames: categories?.map((c) => {
							return { id: c?.id, name: c?.title }
						}),
						required: true,
						fullWidth: true,
					},
				]}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreatePages.isOnlyUser = true

CreatePages.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreatePages
