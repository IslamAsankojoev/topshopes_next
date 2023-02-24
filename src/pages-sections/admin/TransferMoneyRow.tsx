import { FC } from 'react'
import { IMoneyTransfer } from 'src/shared/types/money-transfer.types'
import { getCurrency } from 'src/utils/getCurrency'

import { StyledTableCell, StyledTableRow } from './StyledComponents'
import TransferDialogForm from './TransferDialogForm'

type MoneyTransferRowProps = {
	item: IMoneyTransfer
	selected: any[]
	refetch: () => void
}

const MoneyTransferRow: FC<MoneyTransferRowProps> = ({ item, refetch }) => {
	const { amount, shop, tax } = item

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
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
				{getCurrency(amount)}
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
				{getCurrency(tax)}
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default MoneyTransferRow
