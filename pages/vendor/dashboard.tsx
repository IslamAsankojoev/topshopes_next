import { Box, Grid } from '@mui/material'
import { AdminProductsService } from 'api/services-admin/products/products.service'
import { OrdersService } from 'api/services/orders/orders.service'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Analytics from 'pages-sections/dashboard/Analytics'
import Card1 from 'pages-sections/dashboard/Card1'
import RecentPurchase from 'pages-sections/dashboard/RecentPurchase'
import Section3 from 'pages-sections/dashboard/Section3'
import StockOutProducts from 'pages-sections/dashboard/StockOutProducts'
import WishCard from 'pages-sections/dashboard/WishCard'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { IOrder } from 'shared/types/order.types'
import { IProduct } from 'shared/types/product.types'
import { ResponseList } from 'shared/types/response.types'
import api from 'utils/api/dashboard'

type DashboardProps = {
	cardList: any[]
	recentPurchase: any[]
	stockOutProducts: any[]
}

const VendorDashboard: NextPageAuth<DashboardProps> = (props) => {
	const { recentPurchase, stockOutProducts } = props

	const { data: orders, isLoading } = useQuery(
		`orders stats`,
		() => OrdersService.getList(),
		{
			select: (data: ResponseList<IOrder>) => {
				return {
					...data,
					results: data.results.map((order: any) => ({
						...order,
						created_at: new Date(order.created_at).getTime(),
					})),
				}
			},
		}
	)

	const { data: products, refetch } = useQuery(
		`products stats`,
		() => AdminProductsService.getList(),
		{
			select: (data: ResponseList<IProduct>) => data.results,
		}
	)

	return (
		<Box py={4}>
			<Grid container spacing={3}>
				{/* <Grid item md={6} xs={12}>
					<WishCard />
				</Grid> */}

				{/* <Grid container item md={6} xs={12} spacing={3}>
					{cardList?.map((item) => (
						<Grid item md={6} sm={6} xs={12} key={item.id}>
							<Card1
								title={item.title}
								color={item.color}
								amount1={item.amount1}
								amount2={item.amount2}
								percentage={item.percentage}
								status={item.status === 'down' ? 'down' : 'up'}
							/>
						</Grid>
					))}
				</Grid> */}
				{/* 
				<Grid item xs={12}>
					<Section3 />
				</Grid> */}

				{/* <Grid item xs={12}>
					<Analytics />
				</Grid> */}

				<Grid item md={7} xs={12}>
					<RecentPurchase data={orders?.results} />
				</Grid>

				<Grid item md={5} xs={12}>
					<StockOutProducts data={products} />
				</Grid>
			</Grid>
		</Box>
	)
}

VendorDashboard.isOnlySeller = true

VendorDashboard.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
// 	const cardList = await api.getAllCard()
// 	const recentPurchase = await api.recentPurchase()
// 	const stockOutProducts = await api.stockOutProducts()

// 	return {
// 		props: {
// 			cardList,
// 			recentPurchase,
// 			stockOutProducts,
// 			...(await serverSideTranslations(locale as string, [
// 				'common',
// 				'admin',
// 				'adminActions',
// 			])),
// 		},
// 	}
// }

export default VendorDashboard
