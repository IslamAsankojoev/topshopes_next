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

const UpdatePages: NextPageAuth = () => {
	const {
		push,
		query: { id },
	} = useRouter()

	// page fetching
	const { data: page, isLoading } = useQuery(
		'page admin get',
		() => AdminPagesService.get(id as string),
		{
			enabled: !!id,
		}
	)

	// page update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'page admin update',
		(data: FormData | IPages) => AdminPagesService.update(id as string, data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/pages-list')
			},
		}
	)

	const { data: categories, isLoading: categoryLoading } = useQuery(
		'categoryPage admin get',
		AdminPageCategoryService.getList
	)

	const handleFormSubmit = async (data: FormData, values: IPages) => {
		console.log(values)
		const submitData = { ...values, content: { data: values.content } }
		await mutateAsync(formData(submitData))
	}

	if (isLoading || categoryLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New Page</H3>
			<CreateForm
				defaultData={{ ...page, content: page?.content?.data }}
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

UpdatePages.isOnlyUser = true

UpdatePages.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdatePages
