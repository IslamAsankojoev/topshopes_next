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
type OrderRowProps = { order: IOrder; isAdmin?: boolean }
// ========================================================================

export const statuses: {
	name: IOrderStatus
	label: string
}[] = [
	{
		name: 'payment_error',
		label: dynamicLocalization(statusTranslation.paymentError),
	},
	{
		name: 'pending',
		label: dynamicLocalization(statusTranslation.pending),
	},
	{
		name: 'paid',
		label: dynamicLocalization(statusTranslation.paid),
	},
	{
		name: 'ready',
		label: dynamicLocalization(statusTranslation.ready),
	},
	{
		name: 'shop_decline',
		label: dynamicLocalization(statusTranslation.shop_decline),
	},
	{
		name: 'delivering',
		label: dynamicLocalization(statusTranslation.delivered),
	},
	{
		name: 'delivered',
		label: dynamicLocalization(statusTranslation.delivered),
	},
	{
		name: 'canceled',
		label: dynamicLocalization(statusTranslation.canceled),
	},
	{
		name: 'completed',
		label: dynamicLocalization(statusTranslation.completed),
	},
]

export const statusDisabled = (
	status: { name: string; label: string },
	isAdmin: boolean
) => {
	return isAdmin
		? false
		: status.name == 'ready' || status.name == 'shop_decline'
		? false
		: true
}

const OrderRow: FC<OrderRowProps> = ({ order, isAdmin }) => {
	const [orderStatus, setOrderStatus] = React.useState<IOrderStatus>(
		order.status
	)

	const { address, id, total_price, created_at, quantity } = order

	const patchOrder = isAdmin
		? OrdersService.update
		: ShopsService.updateShopOrder

	const { mutateAsync: mutateStatus } = useMutation(
		'order status update',
		(status: IOrderStatus) => patchOrder(order.id, { status }),
		{
			onSuccess: (data: any) => {
				toast.success('Order status updated')
				setOrderStatus(data?.status)
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
							<MenuItem
								disabled={statusDisabled(status, isAdmin)}
								value={status.name}
							>
								<StatusWrapper status={status.name}>
									{status.label}
								</StatusWrapper>
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton
					onClick={() =>
						router.push(
							isAdmin ? `/admin/orders/${id}` : `/vendor/orders/${id}`
						)
					}
				>
					<RemoveRedEye />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	) : null
}

export default OrderRow
