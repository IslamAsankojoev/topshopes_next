import { Delete, Edit } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import {
	CategoryWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'
import { SizesService } from '../../api/services/sizes/sizes.service'

// ========================================================================
type SizeRowProps = {
	name: any
	selected: any[]
	refetch: () => void
}
// ========================================================================

const sizeRow: FC<SizeRowProps> = ({ name, selected, refetch }) => {
	const { push } = useRouter()
	const { name: sizeName, id } = name

	const isItemSelected = selected.indexOf(sizeName) !== -1

	const handleEdit = () => {
		push(`/admin/sizes/${id}`)
	}

	const handleRemove = async () => {
		if (!confirm('Are you sure you want to delete this size?')) return
		await SizesService.delete(id)
		refetch()
	}

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			selected={isItemSelected}
			aria-checked={isItemSelected}
		>
			<StyledTableCell align="center">
				<CategoryWrapper>{sizeName}</CategoryWrapper>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton onClick={handleEdit}>
					<Edit />
				</StyledIconButton>

				<StyledIconButton onClick={handleRemove}>
					<Delete color="error" />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default sizeRow
