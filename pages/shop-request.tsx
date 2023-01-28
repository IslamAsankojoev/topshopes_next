import { Alert, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { axiosClassic, instance } from 'api/interceptor'
import { ApplicationServices } from 'api/services/applications/applications.service'
import CreateForm from 'components/Form/CreateForm'
import { H1 } from 'components/Typography'
import UserDashboardHeader from 'components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { ShopCreateForm } from 'utils/constants/forms'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}
const ShopRequest: NextPageAuth = () => {
	const router = useRouter()

	const user = useTypedSelector((state) => state.userStore.user)

	const { data: applications, isLoading } = useQuery(
		'applications',
		() => ApplicationServices.getApplications(),
		{
			select: (data: any) => data?.results,
		}
	)

	const { mutateAsync } = useMutation(
		'create shop',
		(data) => ApplicationServices.createApplication(data),
		{
			onSuccess: () => {
				router.replace('/shop-request')
			},
		}
	)

	const handleCreateShop = async (data) => {
		await mutateAsync(data)
	}

	return (
		user && (
			<CustomerDashboardLayout>
				<UserDashboardHeader navigation={<CustomerDashboardNavigation />} />

				<Box mb={4}>
					<Grid container spacing={3}>
						<Grid item md={12} xs={12}>
							{applications?.length === 0 && (
								<>
									<H1 textAlign="center">Create shop</H1>

									<CreateForm
										handleFormSubmit={handleCreateShop}
										fields={ShopCreateForm}
										defaultData={{}}
										buttonText="Send request"
										buttonPosition="static"
										buttonSize="large"
									/>
								</>
							)}
						</Grid>
						<Grid
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: '200px',
								width: '100%',
							}}
						>
							{applications?.length > 0 && (
								<Box
									sx={{
										p: 2,
										border: '1px solid',
										borderColor: 'success.main',
										borderRadius: 1,
										color: 'dark',
										bgcolor: 'success.light',
									}}
								>
									You have already sent a request to create a shop. Please wait
									for our response.
								</Box>
							)}
						</Grid>
					</Grid>
				</Box>
			</CustomerDashboardLayout>
		)
	)
}

ShopRequest.isOnlyClient = true

export default ShopRequest
