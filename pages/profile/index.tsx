import Person from '@mui/icons-material/Person'
import { Avatar, Box, Button, Card, Grid, Typography } from '@mui/material'
import { FlexBetween, FlexBox } from 'components/flex-box'
import UserDashboardHeader from 'components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations'
import TableRow from 'components/TableRow'
import { H3, H5, Small } from 'components/Typography'
import { format } from 'date-fns'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'

const Profile: NextPageAuth = () => {
	const user = useTypedSelector((state) => state.userStore.user)

	return (
		user && (
			<CustomerDashboardLayout>
				<UserDashboardHeader
					icon={Person}
					title="My Profile"
					navigation={<CustomerDashboardNavigation />}
					button={
						<Link href="/profile/edit" passHref>
							<Button color="primary" sx={{ px: 4, bgcolor: 'primary.light' }}>
								Edit Profile
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
								<Avatar src={user.avatar} sx={{ height: 64, width: 64 }} />

								<Box ml={1.5} flex="1 1 0">
									<FlexBetween flexWrap="wrap">
										<div>
											<H5 my="0px">
												{user.first_name} {user.last_name}
											</H5>
											{/* <FlexBox alignItems="center">
                      <Typography color="grey.600">Balance:</Typography>
                      <Typography ml={0.5} color="primary.main">
                        $500
                      </Typography>
                    </FlexBox> */}
										</div>

										<Typography color="grey.600" letterSpacing="0.2em">
											MORTAL
										</Typography>
									</FlexBetween>
								</Box>
							</Card>
						</Grid>

						{/* <Grid item md={6} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
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
							First Name
						</Small>
						<span>{user.first_name}</span>
					</FlexBox>

					<FlexBox flexDirection="column" p={1}>
						<Small color="grey.600" mb={0.5} textAlign="left">
							Last Name
						</Small>
						<span>{user.last_name || 'None'}</span>
					</FlexBox>

					<FlexBox flexDirection="column" p={1}>
						<Small color="grey.600" mb={0.5} textAlign="left">
							Email
						</Small>
						<span>{user.email}</span>
					</FlexBox>

					<FlexBox flexDirection="column" p={1}>
						<Small color="grey.600" mb={0.5} textAlign="left">
							Phone
						</Small>
						<span>{user.phone}</span>
					</FlexBox>

					<FlexBox flexDirection="column" p={1}>
						<Small color="grey.600" mb={0.5}>
							Birth date
						</Small>
						<span className="pre">{format(new Date(), 'dd MMM, yyyy')}</span>
					</FlexBox>
				</TableRow>
			</CustomerDashboardLayout>
		)
	)
}

const infoList = [
	{ title: '16', subtitle: 'All Orders' },
	{ title: '02', subtitle: 'Awaiting Payments' },
	{ title: '00', subtitle: 'Awaiting Shipment' },
	{ title: '01', subtitle: 'Awaiting Delivery' },
]

Profile.isOnlyUser = true

export default Profile
