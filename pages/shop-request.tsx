import { Alert, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { axiosClassic, instance } from 'api/interceptor'
import { ApplicationServices } from 'api/services/applications/applications.service'
import AlertDialog from 'components/AlertDialog/AlertDialog'
import CreateForm from 'components/Form/CreateForm'
import { H1 } from 'components/Typography'
import UserDashboardHeader from 'components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { ShopCreateForm } from 'utils/constants/forms'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'application',
				'admin',
			])),
		},
	}
}
const ShopRequest: NextPageAuth = () => {
	const { t: commonT } = useTranslation('common')
	const { t } = useTranslation('application')

	const [agree, setAgree] = useState(false)
	const [opened, setOpened] = useState(false)
	const [data, setData] = useState(null)

	const fields = ShopCreateForm.map((field) => {
		return {
			...field,
			label: t(field.label),
			placeholder: t(field.placeholder),
		}
	})

	const router = useRouter()

	const user = useTypedSelector((state) => state.userStore.user)

	const { data: applications } = useQuery(
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
				// router.reload()
			},
		}
	)

	const handleAgree = () => {
		setAgree(true)
	}

	const handleCreateShop = (dataN) => {
		setOpened(true)
		setData(dataN)
	}

	useEffect(() => {
		if (agree) {
			mutateAsync(data)
		}
	}, [agree])

	return (
		user && (
			<CustomerDashboardLayout>
				<UserDashboardHeader navigation={<CustomerDashboardNavigation />} />

				<Box mb={4} justifyContent="center" display="flex">
					<Grid
						container
						spacing={3}
						sx={{
							marginLeft: '0px',
							width: '100%',
							maxWidth: '600px',
						}}
					>
						<Grid item md={12} xs={12}>
							{applications?.length === 0 && (
								<>
									<H1 textAlign="center">{commonT('store')}</H1>

									<CreateForm
										handleFormSubmit={handleCreateShop}
										fields={fields}
										defaultData={{}}
										buttonText="Send request"
										buttonPosition="static"
										buttonSize="large"
									/>
									<AlertDialog
										title={'Are you sure?'}
										description="By clicking Agree you agree to the terms and conditions of the
					application. You will be notified by email once your application
					approved or rejected."
										opened={opened}
										handleConfirm={handleAgree}
										handleClose={() => setOpened(false)}
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
									{t('alreadyHave')}
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
