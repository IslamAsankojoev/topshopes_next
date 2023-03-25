import { RemoveRedEye } from '@mui/icons-material'
import { FormControl, MenuItem, Select } from '@mui/material'
import { OrdersService } from 'src/api/services-admin/orders/order.service'
import { ShopsService } from 'src/api/services/shop/shop.service'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { IOrder, IOrderStatus } from 'src/shared/types/order.types'
import { statusTranslation } from 'src/utils/Translate/common'
import { dynamicLocalization } from 'src/utils/Translate/dynamicLocalization'

import {
	StatusWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from '../StyledComponents'
import { getCurrency } from 'src/utils/getCurrency'

// ========================================================================
type OrderRowProps = { order: IOrder; isAdmin?: boolean; refetch: () => void }
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
		label: dynamicLocalization(statusTranslation.delivering),
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
	status: { name: IOrderStatus; label: string },
	isAdmin: boolean
) => {
	return isAdmin
		? false
		: status.name === 'payment_error' ||
				status.name === 'pending' ||
				status.name === 'paid'
}

const OrderRow: FC<OrderRowProps> = ({ order, isAdmin, refetch }) => {
	const [orderStatus, setOrderStatus] = useState<IOrderStatus>(order.status)

	const {
		address,
		id,
		total_price,
		created_at,
		quantity,
		tax,
		status: stats,
		product_variant,
	} = order

	const patchOrder = isAdmin
		? OrdersService.update
		: ShopsService.updateShopOrder

	const { mutateAsync: mutateStatus } = useMutation(
		'order status update',
		(status: IOrderStatus) => patchOrder(order.id, { status }),
		{
			onSuccess: (data: any) => {
				refetch()
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
		<StyledTableRow tabIndex={-1} role="checkbox" status={stats}>
			<StyledTableCell
				align="left"
				sx={{
					color: 'inherit!important',
				}}
			>
				{id.slice(0, 8)}
			</StyledTableCell>
			<StyledTableCell
				align="left"
				sx={{
					color: 'inherit',
				}}
			>
				{quantity}
			</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400, color: 'inherit' }}>
				{new Date(created_at).toLocaleString()}
			</StyledTableCell>

			<StyledTableCell align="left" sx={{ fontWeight: 400, color: 'inherit' }}>
				{address?.city}
			</StyledTableCell>

			<StyledTableCell
				align="left"
				sx={{
					color: 'inherit',
				}}
			>
				{getCurrency(total_price)}
			</StyledTableCell>

			<StyledTableCell
				align="left"
				sx={{
					color: 'inherit',
				}}
			>
				{isAdmin
					? getCurrency(
							Number(total_price) -
								Number(product_variant.overall_price) * quantity
					  )
					: getCurrency(Number(product_variant.overall_price) * quantity)}
			</StyledTableCell>

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
								key={status.name}
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

			<StyledTableCell
				align="center"
				sx={{
					color: 'inherit',
				}}
			>
				<StyledIconButton
					sx={{
						color: 'inherit',
					}}
					onClick={() =>
						router.push(
							isAdmin ? `/admin/orders/${id}` : `/vendor/orders/${id}`
						)
					}
				>
					<RemoveRedEye
						sx={{
							color: 'inherit',
						}}
					/>
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	) : null
}

export default OrderRow
