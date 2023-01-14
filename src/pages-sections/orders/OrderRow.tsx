import East from '@mui/icons-material/East'
import { Box, Chip, IconButton, Typography } from '@mui/material'
import TableRow from 'components/TableRow'
import { H5 } from 'components/Typography'
import { format } from 'date-fns'
import Link from 'next/link'
import { FC } from 'react'
import { IOrderShort, IOrderStatus } from 'shared/types/order.types'

// =================================================
// type OrderRowProps = {
//   item: {
//     orderNo: any;
//     href: string;
//     price: number;
//     status: string;
//     purchaseDate: string | Date;
//   };
// };
// =================================================

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
						<Chip
							size="small"
							label={status}
							sx={{
								p: '0.25rem 0.5rem',
								fontSize: 12,
								color: !!getColor(status)
									? `${getColor(status)}.900`
									: 'inherit',
								backgroundColor: !!getColor(status)
									? `${getColor(status)}.100`
									: 'none',
							}}
						/>
					</Box>
					<Typography className="pre" m={0.75} textAlign="left">
						{format(new Date(created_at), 'MMM dd, yyyy')}
					</Typography>

					<Typography m={0.75} textAlign="left">
						${total_price}
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
