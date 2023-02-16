import { Delete, Edit } from '@mui/icons-material'
import { ColorsService } from 'api/services/colors/colors.service'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'

// ========================================================================
type ColorRowProps = {
	color: any
	selected: any[]
	refetch: () => void
}
// ========================================================================

const ColorRow: FC<ColorRowProps> = ({ color, selected, refetch }) => {
	const { push } = useRouter()
	const { name, color: colorCode, id } = color
	const isItemSelected = selected.indexOf(name) !== -1

	const handleEdit = () => {
		push(`/admin/colors/${id}`)
	}

	const { mutateAsync } = useMutation(
		'color admin delete',
		() => ColorsService.delete(id as string),
		{
			onSuccess: () => {
				refetch()
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const handleRemove = async () => {
		if (!confirm('Are you sure you want to delete this color?')) return
		await mutateAsync()
	}

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			selected={isItemSelected}
			aria-checked={isItemSelected}
		>
			<StyledTableCell align="center">{name}</StyledTableCell>

			<StyledTableCell align="center">
				<div
					style={{
						margin: '0 auto',
						backgroundColor: colorCode,
						width: 55,
						height: 55,
						borderRadius: '10px',
					}}
				/>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton onClick={handleEdit}>
					<Edit />
				</StyledIconButton>

				<StyledIconButton onClick={handleRemove}>
					<Delete />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default ColorRow
