import { Box } from '@mui/material'
import { AttributesServiceAdmin } from 'api/services-admin/attributes/attributes.service'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'

import { ICategory } from 'shared/types/product.types'

import { categoryEditForm } from 'utils/constants/forms'
import { formData } from 'utils/formData'

const CreateCategory: NextPageAuth = () => {
	const {
		push,
		query: { id },
	} = useRouter()

	// category fetch
	const { data: category, isLoading } = useQuery(
		'category admin get',
		() => CategoriesService.get(id as string),
		{
			enabled: !!id,
		}
	)

	const { data: attributes } = useQuery(
		'attributes get',
		AttributesServiceAdmin.getList
	)

	// category update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'category admin create',
		(data: FormData) => CategoriesService.update(id as string, data),
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

	const handleFormSubmit = async (_: any, data: ICategory) => {
		const clearData = {}
		for (let key in data) {
			if (data[key]) {
				clearData[key] = data[key]
			}
		}

		await mutateAsync(formData(clearData))
	}

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Edit Category</H3>
			<CreateForm
				defaultData={category}
				fields={[
					...categoryEditForm,
					{
						name: 'attributes',
						label: 'attributes',
						type: 'multiple-select',
						placeholder: 'Enter attributes',
						allNames: attributes,
						required: true,
					},
				]}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}
CreateCategory.isOnlyUser = true

CreateCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateCategory
