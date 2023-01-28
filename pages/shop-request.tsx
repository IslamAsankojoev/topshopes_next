import Person from '@mui/icons-material/Person'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { RequestServices } from 'api/services/requests/requests.service'
import CreateForm from 'components/Form/CreateForm'
import { H1, H2 } from 'components/Typography'
import UserDashboardHeader from 'components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMutation } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { ShopCreateForm } from 'utils/constants/forms'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}
const Profile: NextPageAuth = () => {
	const user = useTypedSelector((state) => state.userStore.user)

	const { mutateAsync } = useMutation(
		'create shop',
		(data) => RequestServices.shop_request(data),
		{
			onSuccess: () => {
				console.log('Request sended successfully')
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
							<H1 textAlign="center">Create shop</H1>

							<CreateForm
								handleFormSubmit={handleCreateShop}
								fields={ShopCreateForm}
								defaultData={{ owner: user.email }}
								buttonText="Send request"
								buttonPosition="static"
								buttonSize="large"
							/>
						</Grid>
					</Grid>
				</Box>
			</CustomerDashboardLayout>
		)
	)
}

Profile.isOnlyUser = true

export default Profile
