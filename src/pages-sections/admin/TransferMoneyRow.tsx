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
	const { amount, shop, tax } = item

	return (
		<StyledTableRow tabIndex={-1} role="checkbox">
			<StyledTableCell align="left">
				<TransferDialogForm transferMoney={item} refetch={refetch} />
			</StyledTableCell>
			<StyledTableCell align="left">{amount}</StyledTableCell>
			<StyledTableCell align="left">{shop.name}</StyledTableCell>
			<StyledTableCell align="left">{tax}c</StyledTableCell>
		</StyledTableRow>
	)
}

export default MoneyTransferRow
