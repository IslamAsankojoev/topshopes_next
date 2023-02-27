import { ReportAdmin } from 'pages/admin/money-transfer'
import { FC } from 'react'
import { IMoneyTransfer } from 'src/shared/types/money-transfer.types'
import { getCurrency } from 'src/utils/getCurrency'

import { StyledTableCell, StyledTableRow } from './StyledComponents'
import TransferDialogForm from './TransferDialogForm'

type MoneyTransferRowProps = {
	item: ReportAdmin
	selected: any[]
	refetch: () => void
}

const MoneyTransferRow: FC<MoneyTransferRowProps> = ({ item, refetch }) => {
	const { id, name, total_amount, total_tax } = item

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
		>
			<StyledTableCell
				align="left"
				sx={{
					color: 'primary.main',
				}}
			>
				{name}
			</StyledTableCell>
			<StyledTableCell
				align="left"
				sx={{
					color: 'inherit',
					p: 2,
				}}
			>
				{getCurrency(total_amount)}
			</StyledTableCell>
			
			<StyledTableCell
				align="left"
				sx={{
					color: 'inherit',
				}}
			>
				{getCurrency(total_tax)}
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default MoneyTransferRow
