import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckIcon from '@mui/icons-material/Check'
import { Box, Button, Card, Grid } from '@mui/material'
import { PaymentServices } from 'src/api/services-admin/payments/payments.service'
import LazyImage from 'src/components/LazyImage'
import { H3, Paragraph } from 'src/components/Typography'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IPayment } from 'src/shared/types/order.types'

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
const Payment: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const router = useRouter()

	const { data: payout, refetch } = useQuery(
		['one payout', router.query.id],
		() => PaymentServices.getPayment(router.query.id as string),
		{
			enabled: !!router.query.id,
			select: (data: IPayment) => data,
		}
	)

	const { mutateAsync } = useMutation(
		'update payout',
		() =>
			PaymentServices.updatePayment(payout?.id, {
				...payout,
				is_verified: !payout?.is_verified,
			}),
		{
			onSuccess: () => {
				refetch()
			},
		}
	)

	const handleUpdate = async () => {
		await mutateAsync()
	}
	return (
		<Box py={4}>
			<H3 mb={2} textAlign="center">
				Payment detail
			</H3>

			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<FlexBox
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Grid item md={6} xs={12}>
						<Grid
							container
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Grid
								item
								xs={12}
								sm={6}
								sx={{
									p: 1,
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<Card
									sx={{
										px: 4,
										py: 4,
										minWidth: '430px!important',
									}}
								>
									<Grid mb={1.5} justifyContent="center" alignItems="center">
										<Box
											sx={{
												my: 3,
												justifyContent: 'center',
												display: 'flex',
											}}
										>
											<LazyImage
												src={payout?.confirm_photo}
												width={350}
												height={350}
												sx={{ borderRadius: 8 }}
											/>
										</Box>
										<FlexBetween>
											<b>Payed from:</b>
											<Paragraph fontSize="16px">
												{payout?.bank_account}
											</Paragraph>
										</FlexBetween>
										<FlexBetween>
											<b>Payment Type:</b>
											<Paragraph fontSize="16px">
												{payout?.payment_type}
											</Paragraph>
										</FlexBetween>

										<FlexBetween>
											<b>Phone number:</b>
											<Paragraph fontSize="16px">
												{payout?.phone_number}
											</Paragraph>
										</FlexBetween>
										<br />

										<FlexBetween>
											<b
												style={{
													fontSize: '20px',
												}}
											>
												Payed:
											</b>
											<Button
												color={payout?.is_verified ? 'success' : 'error'}
												variant="contained"
												onClick={handleUpdate}
												size="normal"
												startIcon={<CheckIcon />}
											>
												{payout?.is_verified ? 'Payed' : 'Not payed'}
											</Button>
										</FlexBetween>
									</Grid>
								</Card>
							</Grid>
						</Grid>
					</Grid>

					<Grid
						item
						xs={12}
						sx={{
							my: 4,
						}}
					>
						<Button
							variant="contained"
							color="error"
							onClick={() => {
								router.push('/admin/payments')
							}}
						>
							<ArrowBackIcon />
							{t('back')}
						</Button>
					</Grid>
				</FlexBox>
			</div>
		</Box>
	)
}

Payment.isOnlyAdmin = true

Payment.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default Payment
