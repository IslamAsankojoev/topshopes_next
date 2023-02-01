import { Delete, Edit, VisibilitySharp } from '@mui/icons-material'
import { AttributesServiceAdmin } from 'api/services-admin/attributes/attributes.service'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import {
	CategoryWrapper,
	StatusWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'

// ========================================================================
type AttributesRowProps = {
	name: any
	selected: any[]
	refetch: () => void
}
// ========================================================================

const ApplicationsRow: FC<AttributesRowProps> = ({ name, selected }) => {
	const { t } = useTranslation('application')
	const { push } = useRouter()
	const { user, short_name, status, id } = name

	const isItemSelected = selected.indexOf(user) !== -1

	const handleEdit = async () => {
		await push(`/admin/applications/${id}`)
	}

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			selected={isItemSelected}
			aria-checked={isItemSelected}
		>
			<StyledTableCell align="center">
				<CategoryWrapper>{short_name}</CategoryWrapper>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StatusWrapper status={status}>{t(status)}</StatusWrapper>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton onClick={handleEdit}>
					<VisibilitySharp />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default ApplicationsRow
