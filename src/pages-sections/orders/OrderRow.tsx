import East from '@mui/icons-material/East'
import { Box, Chip, IconButton, Typography } from '@mui/material'
import TableRow from 'components/TableRow'
import { H5 } from 'components/Typography'
import { format } from 'date-fns'
import Link from 'next/link'
import { StatusWrapper } from 'pages-sections/admin'
import { FC } from 'react'
import { IOrderShort, IOrderStatus } from 'shared/types/order.types'
import { statusTranslation } from 'utils/Translate/common'
import { dynamicLocalization } from 'utils/Translate/dynamicLocalization'

const OrderRow: FC<IOrderShort> = ({
	created_at,
	id,
	status,
	total_price,
	children,
}) => {
	const getColor = (status: IOrderStatus) => {
		switch (status) {
			case 'pending':
				return 'secondary'

			case 'delivering':
				return 'secondary'

			case 'delivered':
				return 'success'

			case 'canceled':
				return 'error'

			default:
				return ''
		}
	}

	return (
		<Link href={`/orders/${id}`}>
			<a>
				<TableRow sx={{ my: '1rem', padding: '6px 18px' }}>
					<H5 m={0.75} textAlign="left">
						{id.slice(0, 8)}
					</H5>
					<Box m={0.75}>
						<StatusWrapper status={status}>{status}</StatusWrapper>
					</Box>
					<Typography className="pre" m={0.75} textAlign="left">
						{format(new Date(created_at), ' dd.MM.yyyy')}
					</Typography>

					<Typography m={0.75} textAlign="left">
						{total_price}c
					</Typography>

					<Typography
						color="grey.600"
						textAlign="center"
						sx={{
							flex: '0 0 0 !important',
							display: { xs: 'none', md: 'block' },
						}}
					>
						<IconButton>
							<East
								fontSize="small"
								color="inherit"
								sx={{
									transform: ({ direction }) =>
										`rotate(${direction === 'rtl' ? '180deg' : '0deg'})`,
								}}
							/>
						</IconButton>
					</Typography>
				</TableRow>
			</a>
		</Link>
	)
}

export default OrderRow
