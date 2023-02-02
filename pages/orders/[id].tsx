import styled from '@emotion/styled'
import {
	Cancel,
	Done,
	MarkunreadMailbox,
	Payment,
	ShoppingBag,
} from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Card,
	Divider,
	Grid,
	Typography,
	useTheme,
} from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import { OrdersService } from 'api/services/orders/orders.service'
import TableRow from 'components/TableRow'
import { FlexBetween, FlexBox } from 'components/flex-box'
import UserDashboardHeader from 'components/header/UserDashboardHeader'
import Delivery from 'components/icons/Delivery'
import PackageBox from 'components/icons/PackageBox'
import TruckFilled from 'components/icons/TruckFilled'
import CustomerDashboardLayout from 'components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations'
import { format } from 'date-fns'
import useWindowSize from 'hooks/useWindowSize'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { OrderDetail } from 'pages-sections/admin'
import ClientOrderDetail from 'pages-sections/admin/orders/ClientOrderDetail'
import React from 'react'
import { Fragment } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { IOrder, IOrderStatus } from 'shared/types/order.types'

const StyledFlexbox = muiStyled(FlexBetween)(({ theme }) => ({
	flexWrap: 'wrap',
	marginTop: '2rem',
	marginBottom: '2rem',
	'@media (max-width: 650px)': {
		flexDirection: 'column',
	},

	'& .line': {
		height: 4,
		minWidth: 50,
		flex: '1 1 0',
		'@media (max-width: 650px)': { flex: 'unset', height: 50, minWidth: 4 },
	},
}))

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}
// =

const OrderDetails: NextPageAuth = () => {
	const { t } = useTranslation('common')
	const router = useRouter()

	const { data: order } = useQuery(
		'get one order',
		() => OrdersService.get(router.query.id as string),
		{
			enabled: !!router?.query?.id,
			select: (data) => data as IOrder,
		}
	)

	const stepIconList = [
		Payment,
		PackageBox,
		TruckFilled,
		MarkunreadMailbox,
		Delivery,
	]

	const width = useWindowSize()
	const theme = useTheme()
	const breakpoint = 350

	return order ? (
		<CustomerDashboardLayout>
			<UserDashboardHeader
				icon={ShoppingBag}
				title={t('orderDetails')}
				navigation={<CustomerDashboardNavigation />}
			/>

			{/* <Card sx={{ p: '2rem 1.5rem', mb: '30px' }}>
				<StyledFlexbox>
					{stepIconList?.map((Icon, ind) => (
						<Fragment key={ind}>
							<Box position="relative">
								<Avatar
									sx={{
										width: 64,
										height: 64,
										bgcolor: ind <= statusIndex ? 'primary.main' : 'grey.300',
										color: ind <= statusIndex ? 'grey.white' : 'primary.main',
									}}
								>
									<Icon color="inherit" sx={{ fontSize: '32px' }} />
								</Avatar>

								{ind < statusIndex && (
									<Box position="absolute" right="0" top="0">
										<Avatar
											sx={{
												width: 22,
												height: 22,
												bgcolor: 'grey.200',
												color: 'success.main',
											}}
										>
											<Done color="inherit" sx={{ fontSize: '1rem' }} />
										</Avatar>
									</Box>
								)}
							</Box>
							{ind < stepIconList?.length - 1 && (
								<Box
									className="line"
									bgcolor={ind < statusIndex ? 'primary.main' : 'grey.300'}
								/>
							)}
						</Fragment>
					))}
				</StyledFlexbox>
			</Card> */}

			<ClientOrderDetail />
		</CustomerDashboardLayout>
	) : null
}

OrderDetails.isOnlyAuth = true

export default OrderDetails
