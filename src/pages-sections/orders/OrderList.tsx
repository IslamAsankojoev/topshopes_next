import { Pagination } from '@mui/material'
import { OrdersService } from 'api/services/orders/orders.service'
import TableRow from 'components/TableRow'
import { H5 } from 'components/Typography'
import { FlexBox } from 'components/flex-box'
import { FC, Fragment } from 'react'
import { useQuery } from 'react-query'
import { IOrder, IOrderShort } from 'shared/types/order.types'
import { ResponseList } from 'shared/types/response.types'

import OrderRow from './OrderRow'

// ============================================================
type OrderListProps = {}
// ============================================================

const OrderList: FC<OrderListProps> = () => {
	const { isLoading, data: orders } = useQuery(
		'orders',
		() => OrdersService.getList(),
		{
			select: (data: ResponseList<IOrderShort>) => data.results,
		}
	)

	return (
		!isLoading && (
			<Fragment>
				<TableRow
					elevation={0}
					sx={{
						padding: '0px 18px',
						background: 'none',
						display: { xs: 'none', md: 'flex' },
					}}
				>
					<H5 color="grey.600" my={0} mx={0.75} textAlign="left">
						Order #
					</H5>

					<H5 color="grey.600" my={0} mx={0.75} textAlign="left">
						Status
					</H5>

					<H5 color="grey.600" my={0} mx={0.75} textAlign="left">
						Date purchased
					</H5>

					<H5 color="grey.600" my={0} mx={0.75} textAlign="left">
						Total
					</H5>
					<H5 flex="0 0 0 !important" color="grey.600" px={2.75} my={0} />
				</TableRow>

				{orders?.map((item) => (
					<OrderRow {...item} key={item.id} />
				))}

				<FlexBox justifyContent="center" mt={5}>
					<Pagination
						count={5}
						color="primary"
						variant="outlined"
						onChange={(data) => console.log(data)}
					/>
				</FlexBox>
			</Fragment>
		)
	)
}

const orderList = [
	{
		orderNo: '1050017AS',
		status: 'Pending',
		purchaseDate: new Date(),
		price: 350,
		href: '/orders/5452423',
	},
	{
		orderNo: '1050017AS',
		status: 'Processing',
		purchaseDate: new Date(),
		price: 500,
		href: '/orders/5452423',
	},
	{
		orderNo: '1050017AS',
		status: 'Delivered',
		purchaseDate: '2020/12/23',
		price: 700,
		href: '/orders/5452423',
	},
	{
		orderNo: '1050017AS',
		status: 'Delivered',
		purchaseDate: '2020/12/23',
		price: 700,
		href: '/orders/5452423',
	},
	{
		orderNo: '1050017AS',
		status: 'Cancelled',
		purchaseDate: '2020/12/15',
		price: 300,
		href: '/orders/5452423',
	},
]

export default OrderList
