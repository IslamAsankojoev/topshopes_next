import { Delete } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'
import { api_admin } from 'src/api/index.service'

// ========================================================================
type AttributesRowProps = {
	name: any
	selected: any[]
	refetch: () => void
}
// ========================================================================

const AttributesRow: FC<AttributesRowProps> = ({ name, selected, refetch }) => {
	const { push } = useRouter()
	const { name: attributeName, id } = name

	const isItemSelected = selected.indexOf(attributeName) !== -1

	const handleEdit = async () => {
		await push(`/admin/attributes/${id}`)
	}

	const handleRemove = async () => {
		if (!confirm('Are you sure you want to delete this attribute?')) return
		await api_admin.attributes.AttributesServiceAdmin.delete(id)
		refetch()
	}

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			selected={isItemSelected}
			aria-checked={isItemSelected}
			sx={{
				cursor: 'pointer',
				transition: 'all 0.2s ease-in-out',
				'&:hover': {
					backgroundColor: 'grey.200',
				},
			}}
			onClick={handleEdit}
		>
			<StyledTableCell align="center">{attributeName}</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton onClick={handleRemove}>
					<Delete color="error" />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default AttributesRow
