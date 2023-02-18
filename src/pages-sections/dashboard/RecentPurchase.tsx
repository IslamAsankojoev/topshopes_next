import { Button, Card } from '@mui/material'
import { H5 } from 'src/components/Typography'
import { FlexBetween } from 'src/components/flex-box'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IOrder } from 'src/shared/types/order.types'

import DataListTable from './table'

// table column list
const tableHeading = [
	{ id: 'orderId', label: 'Order ID', alignRight: false },
	{ id: 'product', label: 'Product', alignRight: false },
	{ id: 'payment', label: 'Payment', alignRight: false },
	{ id: 'amount', label: 'Amount', alignCenter: true },
]

// ===================================================
type RecentPurchaseProps = { data: IOrder[] }
// ===================================================

const RecentPurchase: FC<RecentPurchaseProps> = ({ data }) => {
	const router = useRouter()

	return (
		<Card>
			<FlexBetween px={3} py={2.5}>
				<H5>Recent Purchases</H5>

				<Button
					size="small"
					color="info"
					variant="outlined"
					onClick={() => {
						router.push('/admin/orders')
					}}
				>
					All Orders
				</Button>
			</FlexBetween>

			<DataListTable
				dataList={data}
				tableHeading={tableHeading}
				type="RECENT_PURCHASE"
			/>
		</Card>
	)
}

export default RecentPurchase
