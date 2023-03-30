import East from '@mui/icons-material/East'
import { Box, Chip, IconButton, Typography } from '@mui/material'
import TableRow from 'src/components/TableRow'
import { H5 } from 'src/components/Typography'
import { format } from 'date-fns'
import Link from 'next/link'
import { StatusWrapper } from 'src/pages-sections/admin'
import { FC } from 'react'
import { IOrderShort } from 'src/shared/types/order.types'
import { statusTranslation } from 'src/utils/Translate/common'
import { localize } from 'src/utils/Translate/localize'
import { getCurrency } from 'src/utils/getCurrency'
import { FlexBox } from 'src/components/flex-box'

const OrderRow: FC<IOrderShort> = ({ created_at, id, status, total_price }) => {
	return (
		<Link href={`/orders/${id}`}>
			<a>
				<TableRow
					sx={{
						my: '1rem',
						padding: '6px 18px',
						transition: 'all 0.2s ease-in-out',
						'&:hover': {
							backgroundColor: 'grey.200',
						},
					}}
				>
					<H5 m={0.75} textAlign="left">
						{id.slice(0, 8)}
					</H5>
					<FlexBox m={0.75}>
						<StatusWrapper status={status}>
							{localize(statusTranslation[status])}
						</StatusWrapper>
					</FlexBox>
					<FlexBox className="pre" m={0.75} textAlign="left">
						{format(new Date(created_at), ' dd.MM.yyyy')}
					</FlexBox>

					<FlexBox m={0.75} textAlign="left">
						{getCurrency(total_price)}
					</FlexBox>

					{/* <FlexBox
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
					</FlexBox> */}
				</TableRow>
			</a>
		</Link>
	)
}

export default OrderRow
