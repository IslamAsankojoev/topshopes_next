import { Delete, RemoveRedEye } from '@mui/icons-material'
import { FormControl, MenuItem, Select } from '@mui/material'
import { OrdersService } from 'api/services/orders/orders.service'
import { ShopsService } from 'api/services/shop/shop.service'
import currency from 'currency.js'
import lodash from 'lodash'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { IOrder, IOrderStatus } from 'shared/types/order.types'
import { statusTranslation } from 'utils/Translate/common'
import { dynamicLocalization } from 'utils/Translate/dynamicLocalization'

import {
	StatusWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from '../StyledComponents'

// ========================================================================
type OrderRowProps = { order: IOrder }
// ========================================================================

export const statuses: {
	name: IOrderStatus
	label: string
}[] = [
	{
		name: 'payment_error',
		label: 'Payment error',
	},
	{
		name: 'pending',
		label: 'Pending',
	},
	{
		name: 'paid',
		label: 'Paid',
	},
	{
		name: 'ready',
		label: 'Ready',
	},
	{
		name: 'shop_decline',
		label: 'Shop decline',
	},
	{
		name: 'delivering',
		label: 'Delivering',
	},
	{
		name: 'delivered',
		label: 'Delivered',
	},
	{
		name: 'canceled',
		label: 'Canceled',
	},
	{
		name: 'completed',
		label: 'Completed',
	},
]

const OrderRow: FC<OrderRowProps> = ({ order }) => {
	const [orderStatus, setOrderStatus] = React.useState<IOrderStatus>(
		order.status
	)

	const {
		address,
		delivered_at,
		id,
		shipping_address,
		status,
		tax,
		total_price,
		created_at,
		quantity,
	} = order

	const { mutateAsync: mutateStatus } = useMutation(
		'order status update',
		(stat: IOrderStatus) =>
			ShopsService.updateShopOrder(order.id, { status: stat }),
		{
			onSuccess: (data) => {
				toast.success('Order status updated')
				setOrderStatus(data.status)
			},
		}
	)

	const changeStatus = (selected) => {
		mutateStatus(selected)
	}

	const router = useRouter()

	return id ? (
		<StyledTableRow tabIndex={-1} role="checkbox">
			<StyledTableCell align="left">{id.slice(0, 8)}</StyledTableCell>
			<StyledTableCell align="left">{quantity}</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{new Date(created_at).toLocaleString()}
			</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400 }}>
				{address?.city}
			</StyledTableCell>

			<StyledTableCell align="left">{total_price}c</StyledTableCell>

			<StyledTableCell align="left">
				<FormControl fullWidth variant="outlined">
					<Select
						className="order-status-admin"
						sx={{
							'& .MuiSelect-select': {
								padding: '0px',
								fontSize: '1rem',
								fontWeight: 400,
								color: 'text.primary',
								backgroundColor: 'background.paper',
								border: '0px solid!important',
								borderColor: 'divider',
								'& fieldset': {
									display: 'none!important',
								},
							},
						}}
						SelectDisplayProps={{
							style: {
								padding: '0px',
								fontSize: '1rem',
								fontWeight: 400,
								color: 'text.primary',
								backgroundColor: 'background.paper',
								border: '0px solid!important',
								borderColor: 'divider',
								outline: 'none',
							},
						}}
						disableUnderline={true}
						value={orderStatus}
						label=""
						onChange={(e) => {
							changeStatus(e.target.value)
						}}
					>
						{statuses.map((status) => (
							<MenuItem value={status.name}>
								<StatusWrapper status={status.name}>
									{status.label}
								</StatusWrapper>
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton onClick={() => router.push(`/vendor/orders/${id}`)}>
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
