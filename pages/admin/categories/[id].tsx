import { Box } from '@mui/material'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { ICategory } from 'shared/types/product.types'

import { categoryEditForm } from 'utils/constants/forms'

const CreateCategory = ({ id }) => {
	const { push } = useRouter()

	// category fetch
	const { data: category, isLoading } = useQuery('category admin get', () =>
		CategoriesService.getCategory(id)
	)

	// category update
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'category admin create',
		(data: ICategory) => CategoriesService.updateCategory(id, data),
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

	const handleFormSubmit = async (data: ICategory) => {
		await mutateAsync(data)
	}

	if (isLoading || mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Edit Category</H3>
			<CreateForm
				defaultData={category}
				fields={categoryEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreateCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export const getServerSideProps = async (context) => {
	const { id } = context.params

	return {
		props: {
			id,
		},
	}
}

export default CreateCategory
