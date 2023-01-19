import ShoppingBag from '@mui/icons-material/ShoppingBag'
import UserDashboardHeader from 'components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import OrderList from 'pages-sections/orders/OrderList'
import { NextPageAuth } from 'shared/types/auth.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}
// =

const Orders: NextPageAuth = () => {
	return (
		<CustomerDashboardLayout>
			<UserDashboardHeader
				title="My Orders"
				icon={ShoppingBag}
				navigation={<CustomerDashboardNavigation />}
			/>
			<OrderList />
		</CustomerDashboardLayout>
	)
}

Orders.isOnlyUser = true

export default Orders
