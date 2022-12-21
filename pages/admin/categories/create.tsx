import { Box } from '@mui/material'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { ICategory } from 'shared/types/product.types'
import { categoryEditForm } from 'utils/constants/forms'

const CreateCategory: NextPageAuth = () => {
	const { push } = useRouter()

	// category create
	const { isLoading, mutateAsync } = useMutation(
		'category admin create',
		(data: ICategory) => CategoriesService.create(data),
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

	if (isLoading) {
		return <Loading />
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

CreateCategory.isOnlyUser = true

CreateCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateCategory
