import { Box } from '@mui/material'
import { UsersService } from 'api/services/users/users.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3 } from 'components/Typography'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { userEditForm } from 'utils/constants/forms'

const CreateCategory: NextPageAuth = () => {
	const {
		push,
		query: { id },
	} = useRouter()

	const { isLoading, data: user } = useQuery(
		'get one user',
		() => UsersService.getUser(id as string),
		{
			enabled: !!id,
		}
	)

	// category create
	const { mutateAsync } = useMutation(
		'admin create user',
		(data) => UsersService.updateUser(id as string, data),
		{
			onSuccess: () => {
				toast.success('User updated successfully')
				push('/admin/customers')
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const handleFormSubmit = async (data) => {
		await mutateAsync(data)
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Update User</H3>
			<CreateForm
				defaultData={user}
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
