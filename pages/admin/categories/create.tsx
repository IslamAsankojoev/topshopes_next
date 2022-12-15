import { Box } from '@mui/material'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { ICategory } from 'shared/types/product.types'

import { categoryEditForm } from 'utils/constants/forms'

const CreateCategory = () => {
	const { push } = useRouter()

	const handleFormSubmit = async (data) => {
		await CategoriesService.createCategory(data)
		push('/admin/categories')
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New Category</H3>
			<CreateForm

				defaultData={{}}
				fields={categoryEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreateCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateCategory
