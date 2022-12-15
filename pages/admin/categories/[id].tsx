import { Box } from '@mui/material'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { ICategory } from 'shared/types/product.types'

import { categoryEditForm } from 'utils/constants/forms'

const CreateCategory = ({ id }) => {
	const { push } = useRouter()
	const [category, setCategory] = useState<ICategory>(null)

	const handleFormSubmit = async (data) => {
		await CategoriesService.updateCategory(id as string, data)
		push('/admin/categories')
	}

	useEffect(() => {
		const getCategory = async () => {
			const data = await CategoriesService.getCategory(id as string)
			setCategory(data)
		}
		getCategory()
	}, [])

	return category ? (
		<Box py={4}>
			<H3 mb={2}>Edit Category</H3>
			<CreateForm
				defaultData={category}
				fields={categoryEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	) : null
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
