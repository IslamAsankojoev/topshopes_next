import {
	Box,
	IconButton,
	TableCell,
	TableRow,
	lighten,
	styled,
	darken,
	emphasize,
} from '@mui/material'
import { IOrderStatus } from 'src/shared/types/order.types'
import { IProductVariantStatus } from 'src/shared/types/product.types'
import { IShopRequestStatus } from 'src/shared/types/shop.types'

// styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: 14,
	paddingTop: 2,
	fontWeight: 600,
	paddingBottom: 2,
	color: theme.palette.grey[900],
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
}))

const CategoryWrapper = styled(Box)(({ theme }) => ({
	fontSize: 13,
	padding: '2px 6px',
	// borderRadius: '16px',
	display: 'inline-block',
	color: theme.palette.grey[900],
	backgroundColor: theme.palette.grey[200],
}))

type ShuffleStatusesType =
	| IOrderStatus
	| IShopRequestStatus
	| IProductVariantStatus
	| 'error'
	| 'success'
	| 'warning'
	| 'info'
	| 'default'
type StatusWrapperProps = {
	status: ShuffleStatusesType
}

const StyledTableRow = styled(TableRow)<{ status?: any }>(
	({ theme, status }: { theme: any; status: ShuffleStatusesType }) => {
		let color = theme.palette.secondary.main
		let backgroundColor = theme.palette.secondary[100]

		switch (status) {
			case 'error':
				color = '#fff'
				backgroundColor = '#f44336'
				break
			case 'success':
				color = '#fff'
				backgroundColor = '#4caf50'
				break
			case 'payment_error':
				color = '#fff'
				backgroundColor = '#f44336'
				break
			case 'pending':
				color = '#fff'
				backgroundColor = '#ff9800'
				break
			case 'paid':
				color = '#fff'
				backgroundColor = '#4caf50'
				break
			case 'ready':
				color = '#fff'
				backgroundColor = '#2196f3'
				break
			case 'shop_decline':
				color = '#fff'
				backgroundColor = '#9c27b0'
				break
			case 'delivering':
				color = '#333'
				backgroundColor = '#ffeb3b'
				break
			case 'delivered':
				color = '#fff'
				backgroundColor = '#212121'
				break
			case 'canceled':
				color = '#fff'
				backgroundColor = '#9e9e9e'
				break
			case 'completed':
				color = '#fff'
				backgroundColor = '#388e3c'
				break
			case 'moderation':
				color = '#fff'
				backgroundColor = '#9e9e9e'
				break
			case 'approved':
				color = '#fff'
				backgroundColor = '#388e3c'
				break
			case 'rejected':
				color = '#fff'
				backgroundColor = '#f44336'
				break
			default:
				color = '#333'
				backgroundColor = '#F6F8FA'
				break
		}

		return {
			':last-child .MuiTableCell-root': { border: 0 },
			'&.Mui-selected': {
				backgroundColor: backgroundColor,
				':hover': { backgroundColor: backgroundColor },
			},
			backgroundColor: backgroundColor,
			color: color,
		}
	}
)

const StyledIconButton = styled(IconButton)(({ theme }) => ({
	color: theme.palette.grey[600],
	'& .MuiSvgIcon-root': { fontSize: 19 },
	':hover': { color: theme.palette.info.main },
}))

const StatusWrapper = styled(Box)<StatusWrapperProps>(({ theme, status }) => {
	let color = theme.palette.secondary.main
	let backgroundColor = theme.palette.secondary[100]

	switch (status) {
		case 'payment_error':
			color = '#fff'
			backgroundColor = '#f44336'
			break
		case 'pending':
			color = '#fff'
			backgroundColor = '#ff9800'
			break
		case 'paid':
			color = '#fff'
			backgroundColor = '#4caf50'
			break
		case 'ready':
			color = '#fff'
			backgroundColor = '#2196f3'
			break
		case 'shop_decline':
			color = '#fff'
			backgroundColor = '#9c27b0'
			break
		case 'delivering':
			color = '#333'
			backgroundColor = '#ffeb3b'
			break
		case 'delivered':
			color = '#fff'
			backgroundColor = '#212121'
			break
		case 'canceled':
			color = '#fff'
			backgroundColor = '#9e9e9e'
			break
		case 'completed':
			color = '#fff'
			backgroundColor = '#388e3c'
			break
		case 'moderation':
			color = '#fff'
			backgroundColor = '#9e9e9e'
			break
		case 'approved':
			color = '#fff'
			backgroundColor = '#388e3c'
			break
		case 'rejected':
			color = '#fff'
			backgroundColor = '#f44336'
			break
		case 'available':
			color = '#fff'
			backgroundColor = '#388e3c'
			break
		case 'unavailable':
			color = '#fff'
			backgroundColor = '#9e9e9e'
			break
		default:
			color = '#333'
			backgroundColor = '#F6F8FA'
			break
	}

	return {
		border: `1px solid ${lighten(color, 0.65)}`,
		color: color,
		fontSize: 12,
		fontWeight: 600,
		backgroundColor: darken(backgroundColor, 0.1),
		borderRadius: '4px',
		padding: '4px 12px',
		display: 'block',
		textAlign: 'center',
		transition: 'all 0.3s ease',
		'&:hover': {
			backgroundColor: darken(backgroundColor, 0.3),
		},
	}
})

// eslint-disable-next-line import/no-anonymous-default-export
export {
	CategoryWrapper,
	StyledIconButton,
	StyledTableRow,
	StyledTableCell,
	StatusWrapper,
}
