import { Box } from '@mui/material'
import { AdminPageCategoryService } from 'api/services-admin/pages-categories/pagesCategories.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IPagesCategory } from 'shared/types/pages-category.types'
import { pageCategoryEditForm } from 'utils/constants/forms'

const CreatePageCategory: NextPageAuth = () => {
	const {
		push,
		query: { id },
	} = useRouter()

	// PageCategory mutation
	const { isLoading: mutationLoading, mutateAsync } = useMutation(
		'pageCategory admin update',
		(data: IPagesCategory) => AdminPageCategoryService.create(data),
		{
			onSuccess: () => {
				toast.success('success')
				push('/admin/pages-category')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (data: IPagesCategory) => {
		await mutateAsync(data)
	}

	if (mutationLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>create page category</H3>
			<CreateForm
				defaultData={{}}
				fields={pageCategoryEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreatePageCategory.isOnlyUser = true

CreatePageCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreatePageCategory
