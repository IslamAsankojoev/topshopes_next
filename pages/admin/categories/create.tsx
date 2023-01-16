import { Box } from '@mui/material'
import { AttributesServiceAdmin } from 'api/services-admin/attributes/attributes.service'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import CreateForm from 'components/Form/CreateForm'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useDebounce from 'hooks/useDebounce'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { ICategory } from 'shared/types/product.types'
import { categoryEditForm } from 'utils/constants/forms'
import { formData } from 'utils/formData'

const CreateCategory: NextPageAuth = () => {
	const { push } = useRouter()

	//states
	const [attributeSearch, setAttributeSearch] = React.useState('')
	const debounceValue = useDebounce(attributeSearch)

	// category create
	const { isLoading, mutateAsync } = useMutation(
		'category admin create',
		(data: FormData) => CategoriesService.create(data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/categories')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const { data: attributes } = useQuery(
		`attributes get search=${debounceValue}`,
		() => AttributesServiceAdmin.getList({ search: debounceValue }),
		{ select: (data) => data?.results }
	)

	const handleFormSubmit = async (_: any, data: ICategory) => {
		const clearData = {}
		for (let key in data) {
			if (data[key]) {
				clearData[key] = data[key]
			}
		}

		await mutateAsync(
			formData({
				...clearData,
				attributes: data?.attributes?.map((attr) => attr.id),
			})
		)
	}

	const getValues = (values) => {
		setAttributeSearch(values.attributes_search)
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New Category</H3>
			<CreateForm
				defaultData={{}}
				fields={[
					...categoryEditForm,
					{
						name: 'attributes',
						label: 'attributes',
						type: 'autocomplete-multiple',
						placeholder: 'Enter attributes',
						allNames: attributes,
						required: true,
					},
				]}
				handleFormSubmit={handleFormSubmit}
				getValues={getValues}
			/>
		</Box>
	)
}

CreateCategory.isOnlyUser = true

CreateCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateCategory
