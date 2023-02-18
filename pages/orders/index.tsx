import ShoppingBag from '@mui/icons-material/ShoppingBag'
import UserDashboardHeader from 'src/components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'src/components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'src/components/layouts/customer-dashboard/Navigations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import OrderList from 'src/pages-sections/orders/OrderList'
import { NextPageAuth } from 'src/shared/types/auth.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const Orders: NextPageAuth = () => {
	const { t } = useTranslation('common')

	return (
		<CustomerDashboardLayout>
			<UserDashboardHeader
				title={t('myOrders')}
				icon={ShoppingBag}
				navigation={<CustomerDashboardNavigation />}
			/>
			<OrderList />
		</CustomerDashboardLayout>
	)
}

Orders.isOnlyAuth = true

export default Orders
