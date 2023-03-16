import { Box } from '@mui/material'
import { UsersService } from 'src/api/services-admin/users/users.service'
import CreateForm from 'src/components/Form/CreateForm'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { userEditForm } from 'src/utils/constants/forms'

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'adminActions',
			])),
		},
	}
}
const CreateCategory: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const {
		push,
		query: { id },
	} = useRouter()

	const { isLoading, data: user } = useQuery(
		['get one user', id],
		() => UsersService.get(id as string),
		{
			enabled: !!id,
		}
	)

	// category create
	const { mutateAsync } = useMutation(
		'admin create user',
		(data: FormData) => UsersService.update(id as string, data),
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

	const handleFormSubmit = async (data: FormData) => {
		await mutateAsync(data)
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>{t('editUser')}</H3>
			<CreateForm
				defaultData={user}
				fields={userEditForm}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}

CreateCategory.isOnlyAdmin = true

CreateCategory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CreateCategory
