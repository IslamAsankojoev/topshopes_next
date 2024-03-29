import { Box, Grid } from '@mui/material'
import { AdminProductsService } from 'src/api/services-admin/products/products.service'
import { OrdersService } from 'src/api/services/orders/orders.service'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import RecentPurchase from 'src/pages-sections/dashboard/RecentPurchase'
import StockOutProducts from 'src/pages-sections/dashboard/StockOutProducts'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IOrder } from 'src/shared/types/order.types'
import { IProduct } from 'src/shared/types/product.types'
import { ResponseList } from 'src/shared/types/response.types'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'

type DashboardProps = {
	cardList: any[]
	recentPurchase: any[]
	stockOutProducts: any[]
}

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

const VendorDashboard: NextPageAuth<DashboardProps> = (props) => {
	const { t } = useTranslation('common')

	const { data: orders } = useQuery(
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

	const { data: products } = useQuery(
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

VendorDashboard.isOnlyAdmin = true

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
