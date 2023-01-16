import { Box } from '@mui/material'
import { PageCategoryService } from 'api/services-admin/pages-categories/pagesCategories.service'
import { PagesService } from 'api/services-admin/pages/pages.service'
import CreateForm from 'components/Form/CreateForm'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useDebounce from 'hooks/useDebounce'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IPages } from 'shared/types/pages.types'
import { pageEditForm } from 'utils/constants/forms'
import { formData } from 'utils/formData'

const CreatePages: NextPageAuth = () => {
	const { push } = useRouter()
	const [categoriesSearch, setCategoriesSearch] = React.useState()
	const debounceValue = useDebounce(categoriesSearch)

	// pages create
	const { isLoading, mutateAsync } = useMutation(
		'page admin create',
		(data: FormData) => PagesService.create(data),
		{
			onSuccess: () => {
				toast.success('Page created')
				push('/admin/pages-list')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const { data: categories } = useQuery(
		`categoryPage admin get search=${debounceValue}`,
		() => PageCategoryService.getList({ search: debounceValue, page_size: 30 })
	)

	const getValues = (values: Record<string, any>) => {
		setCategoriesSearch(values?.category)
	}

	const handleFormSubmit = async (_: any, values: IPages) => {
		await mutateAsync(
			formData({
				...values,
				category: values.category?.id,
				content: JSON.stringify({ data: values.content }),
			})
		)
	}

	// if (isLoading || categoryLoading) {
	// 	return <Loading />
	// }

	// const { image, ...other } = values
	// const clearData = image
	// 	? { ...values, content: JSON.stringify({ data: values.content }) }
	// 	: { ...values, content: JSON.stringify({ data: values.content }) }
	// await mutateAsync(formData())

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
						type: 'autocomplete',
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
				getValues={getValues}
			/>
		</Box>
	)
}

CreatePages.isOnlyUser = true

CreatePages.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreatePages
