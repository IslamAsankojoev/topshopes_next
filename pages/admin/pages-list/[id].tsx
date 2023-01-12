import { Box } from '@mui/material'
import { PageCategoryService } from 'api/services-admin/pages-categories/pagesCategories.service'
import { PagesService } from 'api/services-admin/pages/pages.service'
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

	const { data: categories, isLoading: categoryLoading } = useQuery(
		'categoryPage admin get',
		PageCategoryService.getList
	)

	const handleFormSubmit = async (_: any, values: IPages) => {
		const clearData = {}

		for (let key in values) {
			if (!!values[key]) {
				clearData[key] = values[key]
			}
		}

		await mutateAsync(
			formData({
				...clearData,
				content: JSON.stringify({ data: values.content }),
			})
		)
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
