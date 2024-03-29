import Person from '@mui/icons-material/Person'
import { Avatar, Box, Button, Card, Grid, Typography } from '@mui/material'
import TableRow from 'src/components/TableRow'
import { H5, Small } from 'src/components/Typography'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import UserDashboardHeader from 'src/components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'src/components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'src/components/layouts/customer-dashboard/Navigations'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { NextPageAuth } from 'src/shared/types/auth.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}
const Profile: NextPageAuth = () => {
	const { t } = useTranslation('common')
	const user = useTypedSelector((state) => state.userStore.user)

	return (
		user && (
			<CustomerDashboardLayout>
				<UserDashboardHeader
					icon={Person}
					title={t('myProfile')}
					navigation={<CustomerDashboardNavigation />}
					button={
						<Link href="/profile/edit" passHref>
							<Button color="primary" sx={{ px: 4, bgcolor: 'primary.light' }}>
								{t('editProfile')}
							</Button>
						</Link>
					}
				/>

				<Box mb={4}>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<Card
								sx={{
									display: 'flex',
									p: '14px 32px',
									height: '100%',
									alignItems: 'center',
								}}
							>
								<Avatar
									src={user.avatar || '/assets/images/avatars/001-man.svg'}
									sx={{ height: 64, width: 64 }}
								/>

								<Box ml={1.5} flex="1 1 0">
									<FlexBetween flexWrap="wrap">
										<div>
											<H5 my="0px">{user.first_name || user.email}</H5>
											<FlexBox alignItems="center">
												<Typography color="grey.600">Welcome to</Typography>
												<Typography ml={0.5} color="primary.main">
													Topshopes
												</Typography>
											</FlexBox>
										</div>
									</FlexBetween>
								</Box>
							</Card>
						</Grid>

						{/* <Grid item md={6} xs={12}>
            <Grid container spacing={4}>
              {infoList?.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      p: '1rem 1.25rem',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}>
                    <H3 color="primary.main" my={0} fontWeight={600}>
                      {item.title}
                    </H3>

                    <Small color="grey.600" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid> */}
					</Grid>
				</Box>

				<TableRow sx={{ p: '0.75rem 1.5rem' }}>
					<FlexBox flexDirection="column" p={1}>
						<Small color="grey.600" mb={0.5} textAlign="left">
							{t('firstName')}
						</Small>
						<span>{user.first_name || 'Your first name'}</span>
					</FlexBox>

					<FlexBox flexDirection="column" p={1}>
						<Small color="grey.600" mb={0.5} textAlign="left">
							{t('lastName')}
						</Small>
						<span>{user.last_name || 'Your last name'}</span>
					</FlexBox>

					<FlexBox flexDirection="column" p={1}>
						<Small color="grey.600" mb={0.5} textAlign="left">
							Email
						</Small>
						<span>{user.email}</span>
					</FlexBox>

					<FlexBox flexDirection="column" p={1}>
						<Small color="grey.600" mb={0.5} textAlign="left">
							{t('phone')}
						</Small>
						<span>{user.phone}</span>
					</FlexBox>
				</TableRow>
			</CustomerDashboardLayout>
		)
	)
}

Profile.isOnlyAuth = true

export default Profile
