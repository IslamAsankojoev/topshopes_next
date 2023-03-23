import { Done } from '@mui/icons-material'
import { Table, TableContainer, styled } from '@mui/material'
import Box from '@mui/material/Box'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Scrollbar from 'src/components/Scrollbar'
import { FlexBox } from 'src/components/flex-box'
import Reload from 'src/components/icons/Reload'
import useMuiTable from 'src/hooks/useMuiTable'
import { StatusWrapper } from 'src/pages-sections/admin/StyledComponents'
import { FC } from 'react'
import { IOrder } from 'src/shared/types/order.types'
import { IProduct } from 'src/shared/types/product.types'

import TableHeader from './TableHeader'
import { dynamicLocalization } from 'src/utils/Translate/dynamicLocalization'
import { statusTranslation } from 'src/utils/Translate/common'

// styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: 13,
	paddingTop: 16,
	fontWeight: 600,
	paddingBottom: 16,
	color: theme.palette.grey[600],
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
	':first-of-type': { paddingLeft: 24 },
}))

// const StatusWrapper = styled(FlexBox)<{ payment: any }>(
// 	({ theme, payment }) => ({
// 		borderRadius: '8px',
// 		padding: '3px 12px',
// 		display: 'inline-flex',
// 		color: payment ? theme.palette.error.main : theme.palette.success.main,
// 		backgroundColor: payment
// 			? theme.palette.error[100]
// 			: theme.palette.success[100],
// 	})
// )

const StyledTableRow = styled(TableRow)(() => ({
	':last-child .MuiTableCell-root': { border: 0 },
}))

// =============================================================================
type ListItemProps = {
	id: string
	amount: string
	payment: string
	product: string
}

type ListTableProps = {
	dataList: any[]
	tableHeading: any[]
	type: 'STOCK_OUT' | 'RECENT_PURCHASE'
}
// =============================================================================

const DataListTable: FC<ListTableProps> = ({
	dataList,
	tableHeading,
	type,
}) => {
	const { order, orderBy, filteredList, handleRequestSort } = useMuiTable({
		listData: dataList,
	})

	const recentPurchase = type === 'RECENT_PURCHASE'

	return (
		<Scrollbar>
			<TableContainer sx={{ minWidth: recentPurchase ? 600 : 0 }}>
				<Table>
					<TableHeader
						order={order}
						orderBy={orderBy}
						heading={tableHeading}
						onRequestSort={handleRequestSort}
					/>
					{/* recent purchase table body */}
					{recentPurchase && (
						<TableBody>
							{filteredList?.map((order: IOrder, index) => {
								const { id, product, status, total_price } = order

								return (
									<StyledTableRow key={index}>
										<StyledTableCell align="left">
											{id.slice(0, 8)}
										</StyledTableCell>
										<StyledTableCell align="left">
											{product.name}
										</StyledTableCell>

										<StyledTableCell align="left">
											<StatusWrapper status={status}>
												{dynamicLocalization(statusTranslation[status])}
											</StatusWrapper>
										</StyledTableCell>

										<StyledTableCell align="center">
											{total_price}c
										</StyledTableCell>
									</StyledTableRow>
								)
							})}
						</TableBody>
					)}

					{/* stock out table body */}
					{type === 'STOCK_OUT' && (
						<TableBody>
							{filteredList?.map((product: IProduct, index) => {
								const { name, variants } = product

								return (
									<StyledTableRow key={index}>
										<StyledTableCell align="left">{name}</StyledTableCell>
										<StyledTableCell
											align="center"
											sx={{ color: 'error.main' }}
										>
											{variants[0].stock}
										</StyledTableCell>

										<StyledTableCell align="center">
											{variants[0].price}c
										</StyledTableCell>
									</StyledTableRow>
								)
							})}
						</TableBody>
					)}
				</Table>
			</TableContainer>
		</Scrollbar>
	)
}

export default DataListTable
