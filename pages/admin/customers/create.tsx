import { Box } from '@mui/material'
import { UsersService } from 'api/services-admin/users/users.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { userEditForm } from 'utils/constants/forms'

const CreateCategory: NextPageAuth = () => {
	const { push } = useRouter()

	// category create
	const { isLoading, mutateAsync } = useMutation(
		'category admin create',
		(data: FormData) => UsersService.create(data),
		{
			onSuccess: () => {
				toast.success('User created successfully')
				push('/admin/customers')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (data: FormData) => {
		await mutateAsync(data)
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Add New User</H3>
			<CreateForm
				defaultData={{}}
				fields={userEditForm}
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
