import { Delete, Edit, VisibilitySharp } from '@mui/icons-material'
import { AttributesServiceAdmin } from 'src/api/services-admin/attributes/attributes.service'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC } from 'react'

import {
	CategoryWrapper,
	StatusWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'
import { darken } from '@mui/system'

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
			status={status}
			tabIndex={-1}
			role="checkbox"
			selected={isItemSelected}
			aria-checked={isItemSelected}
		>
			<StyledTableCell align="center" sx={{
				color: 'inherit',
			}}>
					<StatusWrapper status={status}>
						{short_name}
					</StatusWrapper>
			</StyledTableCell>

			<StyledTableCell align="center" sx={{
				color: 'inherit',
			}}>
				{t(status)}
			</StyledTableCell>

			<StyledTableCell
				align="center"
				sx={{
					color: 'inherit',
				}}
			>
				<StyledIconButton
					onClick={handleEdit}
					sx={{
						color: 'inherit',
					}}
				>
					<VisibilitySharp
						sx={{
							color: 'inherit',
						}}
					/>
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default ApplicationsRow
