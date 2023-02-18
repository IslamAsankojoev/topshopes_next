import { Button, Card } from '@mui/material'
import { H5 } from 'src/components/Typography'
import { FlexBetween } from 'src/components/flex-box'
import { useRouter } from 'next/router'
import { FC } from 'react'

import DataListTable from './table'

// table column list
const tableHeading = [
	{ id: 'product', label: 'Product', alignRight: false },
	{ id: 'stock', label: 'Stock', alignRight: false },
	{ id: 'amount', label: 'Amount', alignCenter: true },
]

// ======================================================
type StockOutProductsProps = { data: any[] }
// ======================================================

const StockOutProducts: FC<StockOutProductsProps> = ({ data }) => {
	const router = useRouter()
	return (
		<Card sx={{ height: '100%' }}>
			<FlexBetween px={3} py={2.5}>
				<H5>Stock Out Products</H5>

				<Button
					size="small"
					color="info"
					variant="outlined"
					onClick={() => {
						router.push('/admin/products')
					}}
				>
					All Products
				</Button>
			</FlexBetween>

			<DataListTable
				dataList={data}
				tableHeading={tableHeading}
				type="STOCK_OUT"
			/>
		</Card>
	)
}

export default StockOutProducts
