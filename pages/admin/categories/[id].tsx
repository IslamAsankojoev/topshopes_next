import { Box } from '@mui/material'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQuery } from 'react-query'

import { ICategory } from 'shared/types/product.types'

import { categoryEditForm } from 'utils/constants/forms'

const CreateCategory = ({ id }) => {
	const { push } = useRouter()

	const { data, isLoading, refetch } = useQuery(
		'get one category',
		() => CategoriesService.getCategory(id as string),
		{
			enabled: !!id,
		}
	)

	const handleFormSubmit = async (data) => {
		await CategoriesService.updateCategory(id as string, data)
		push('/admin/categories')
	}

	return !isLoading ? (
		<Box py={4}>
			<H3 mb={2}>Add New Category</H3>
			<CreateForm
				defaultData={data}
				fields={categoryEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	) : null
}

CreateCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateCategory

export const getServerSideProps = async (context) => {
	const { id } = context.params

	return {
		props: {
			id,
		},
	}
}
