import { Box, IconButton, TableCell, TableRow, styled } from '@mui/material'
import { IOrderStatus } from 'shared/types/order.types'

// styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: 14,
	paddingTop: 10,
	fontWeight: 600,
	paddingBottom: 10,
	color: theme.palette.grey[900],
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
}))

const CategoryWrapper = styled(Box)(({ theme }) => ({
	fontSize: 13,
	padding: '3px 12px',
	borderRadius: '16px',
	display: 'inline-block',
	color: theme.palette.grey[900],
	backgroundColor: theme.palette.grey[200],
}))

const StyledTableRow = styled(TableRow)(() => ({
	':last-child .MuiTableCell-root': { border: 0 },
	'&.Mui-selected': {
		backgroundColor: 'transparent',
		':hover': { backgroundColor: 'transparent' },
	},
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
	color: theme.palette.grey[600],
	'& .MuiSvgIcon-root': { fontSize: 19 },
	':hover': { color: theme.palette.info.main },
}))
type StatusType = {} & IOrderStatus

const StatusWrapper = styled(Box)<{ status: StatusType }>(
	({ theme, status }) => {
		let color = theme.palette.secondary.main
		let backgroundColor = theme.palette.secondary[100]

		switch (status) {
			case 'pending':
				color = theme.palette.secondary.main
				backgroundColor = theme.palette.secondary[100]
				break

			case 'delivering':
				color = theme.palette.secondary.main
				backgroundColor = theme.palette.secondary[100]
				break

			case 'delivered':
				color = theme.palette.success.main
				backgroundColor = theme.palette.success[100]
				break

			case 'canceled':
				color = theme.palette.error.main
				backgroundColor = theme.palette.error[100]
				break

			default:
				color = theme.palette.grey[900]
				backgroundColor = theme.palette.grey[200]
				break
		}

		return {
			color,
			fontSize: 12,
			fontWeight: 600,
			backgroundColor,
			borderRadius: '8px',
			padding: '3px 12px',
			display: 'inline-flex',
		}
	}
)

// eslint-disable-next-line import/no-anonymous-default-export
export {
	CategoryWrapper,
	StyledIconButton,
	StyledTableRow,
	StyledTableCell,
	StatusWrapper,
}
