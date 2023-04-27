import { MarkunreadMailbox, Payment, ShoppingBag } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import UserDashboardHeader from 'src/components/header/UserDashboardHeader'
import Delivery from 'src/components/icons/Delivery'
import PackageBox from 'src/components/icons/PackageBox'
import TruckFilled from 'src/components/icons/TruckFilled'
import CustomerDashboardLayout from 'src/components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'src/components/layouts/customer-dashboard/Navigations'
import useWindowSize from 'src/hooks/useWindowSize'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import ClientOrderDetail from 'src/pages-sections/admin/orders/ClientOrderDetail'

import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IOrder } from 'src/shared/types/order.types'
import { api } from 'src/api/index.service'

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
		() => api.orders.OrdersService.get(router.query.id as string),
		{
			enabled: !!router?.query?.id,
			select: (data) => data as IOrder,
		}
	)

	// const stepIconList = [
	// 	Payment,
	// 	PackageBox,
	// 	TruckFilled,
	// 	MarkunreadMailbox,
	// 	Delivery,
	// ]

	// const width = useWindowSize()
	// const theme = useTheme()
	// const breakpoint = 350

	return order ? (
		<CustomerDashboardLayout>
			<UserDashboardHeader
				icon={ShoppingBag}
				title={t('orderDetails')}
				navigation={<CustomerDashboardNavigation />}
			/>
			<ClientOrderDetail />
		</CustomerDashboardLayout>
	) : null
}

OrderDetails.isOnlyAuth = true

export default OrderDetails
