import { Box } from '@mui/material'
import { PageCategoryService } from 'api/services-admin/pages-categories/pagesCategories.service'
import { PagesService } from 'api/services-admin/pages/pages.service'
import CreateForm from 'components/Form/CreateForm'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useDebounce from 'hooks/useDebounce'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IPages } from 'shared/types/pages.types'
import { pageEditForm } from 'utils/constants/forms'
import { formData } from 'utils/formData'

const UpdatePages: NextPageAuth = () => {
	const {
		push,
		query: { id },
	} = useRouter()

	const [categoryValue, setCategoryValue] = React.useState()
	const debounceValue = useDebounce(categoryValue)

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

	const { data: categories } = useQuery(
		`categoryPage admin get search=${debounceValue}`,
		() => PageCategoryService.getList({ page_size: 30, search: debounceValue })
	)

	const getValues = (values: Record<string, any>) => {
		setCategoryValue(values?.category_search)
	}

	const handleFormSubmit = async (_: any, values: IPages) => {
		const { image, ...other } = values
		const clearData = image
			? {
					...values,
					category: values.category?.id,
					content: JSON.stringify({ data: values.content }),
			  }
			: {
					...other,
					category: values.category?.id,
					content: JSON.stringify({ data: values.content }),
			  }
		await mutateAsync(formData(clearData))
	}

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New Page</H3>
			<CreateForm
				defaultData={{
					...page,
					content: page?.content?.data,
					category: { id: page?.category.id, name: page?.category.title },
				}}
				fields={[
					...pageEditForm,
					{
						name: 'category',
						label: 'Category',
						type: 'autocomplete',
						placeholder: 'Enter category',
						allNames: categories?.results?.map((c) => ({
							id: c?.id,
							label: c?.title,
						})),
						required: true,
						fullWidth: true,
					},
				]}
				handleFormSubmit={handleFormSubmit}
				getValues={getValues}
			/>
		</Box>
	)
}

UpdatePages.isOnlyUser = true

UpdatePages.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdatePages
