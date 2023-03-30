import { Button, Card } from '@mui/material'
import { H5 } from 'src/components/Typography'
import { FlexBetween } from 'src/components/flex-box'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { IOrder } from 'src/shared/types/order.types'

import DataListTable from './table'
import { localize } from 'src/utils/Translate/localize'

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
				<H5>
					{localize({
						ru: 'Последние заказы',
						tr: 'Son siparişler',
						en: 'Recent Orders',
						kg: 'Соңку заказдар',
						kz: 'Соңғы тапсырмалар',
					})}
				</H5>

				<Button
					size="small"
					color="info"
					variant="outlined"
					onClick={() => {
						router.push('/admin/orders')
					}}
				>
					{localize({
						ru: 'Все заказы',
						tr: 'Tüm siparişler',
						en: 'All Orders',
						kg: 'Бардык заказдар',
						kz: 'Барлық тапсырмалар',
					})}
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
