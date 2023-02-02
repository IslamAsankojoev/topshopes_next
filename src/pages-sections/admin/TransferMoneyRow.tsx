import React, { FC } from 'react'
import { IMoneyTransfer } from 'shared/types/money-transfer.types'

import { StyledTableCell, StyledTableRow } from './StyledComponents'
import TransferDialogForm from './TransferDialogForm'

// ========================================================================
type MoneyTransferRowProps = {
	item: IMoneyTransfer
	selected: any[]
	refetch: () => void
}
// ========================================================================

const MoneyTransferRow: FC<MoneyTransferRowProps> = ({ item, refetch }) => {
	const { amount, shop, tax, confirm_photo } = item

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			status={confirm_photo ? 'success' : 'error'}
		>
			<StyledTableCell align="left">
				<TransferDialogForm transferMoney={item} refetch={refetch} />
			</StyledTableCell>
			<StyledTableCell
				align="left"
				sx={{
					color: 'inherit',
				}}
			>
				{amount}
			</StyledTableCell>
			<StyledTableCell
				align="left"
				sx={{
					color: 'inherit',
				}}
			>
				{shop.name}
			</StyledTableCell>
			<StyledTableCell
				align="left"
				sx={{
					color: 'inherit',
				}}
			>
				{tax}c
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default MoneyTransferRow
