import { Delete, RemoveRedEye } from '@mui/icons-material'
import currency from 'currency.js'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { IOrder } from 'shared/types/order.types'

import {
	StatusWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from '../StyledComponents'

// ========================================================================
type OrderRowProps = { order: IOrder }
// ========================================================================

const OrderRow: FC<OrderRowProps> = ({ order }) => {
	const {
		delivered_at,
		discount,
		id,
		is_delivered,
		items,
		shipping_address,
		status,
		tax,
		total_price,
	} = order

	const router = useRouter()

	return id ? (
		<StyledTableRow tabIndex={-1} role="checkbox">
			<StyledTableCell align="left">{id.slice(0, 8)}</StyledTableCell>
			<StyledTableCell align="left">{items?.length}</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{delivered_at}
			</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{shipping_address}
			</StyledTableCell>

			<StyledTableCell align="left">
				{currency(total_price, { separator: ',', precision: 0 }).format()}
			</StyledTableCell>

			<StyledTableCell align="left">
				<StatusWrapper status={status}>{status}</StatusWrapper>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton onClick={() => router.push(`/admin/orders/${id}`)}>
					<RemoveRedEye />
				</StyledIconButton>

				<StyledIconButton>
					<Delete />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	) : null
}

export default OrderRow
