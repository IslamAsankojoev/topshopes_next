import { Delete, Edit } from '@mui/icons-material'
import { AttributesServiceAdmin } from 'api/services-admin/attributes/attributes.service'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import {
	CategoryWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'

// ========================================================================
type MoneyTransferRowProps = {
	item: any
	selected: any[]
	refetch: () => void
}
// ========================================================================

// { id: 'variantDetails', label: 'variantDetails', align: 'left' },
// { id: 'amount', label: 'amount', align: 'left' },
// { id: 'shop', label: 'shop', align: 'left' },
// { id: 'tax', label: 'tax', align: 'left' },
// { id: 'thumbnail', label: 'thumbnail', align: 'center' },

const MoneyTransferRow: FC<MoneyTransferRowProps> = ({
	item,
	selected,
	refetch,
}) => {
	const { t } = useTranslation('common')
	const { push } = useRouter()
	const { order, amount, shop, tax, confirm_photo, id } = item

	return (
		<StyledTableRow tabIndex={-1} role="checkbox">
			<StyledTableCell align="center">
				<div style={{ display: 'grid', gap: '20px 0' }}>
					<span>ID: {order.product_variant}</span>
					<span>
						{t('qty')}: {order.product_variant}
					</span>
				</div>
			</StyledTableCell>

			<StyledTableCell align="center">{amount}</StyledTableCell>
			<StyledTableCell align="center">{shop.name}</StyledTableCell>
			<StyledTableCell align="center">{tax}</StyledTableCell>
			<StyledTableCell align="center">{confirm_photo}</StyledTableCell>
		</StyledTableRow>
	)
}

export default MoneyTransferRow
