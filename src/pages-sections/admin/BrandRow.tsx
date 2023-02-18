import { Delete, Edit } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { BrandsService } from 'src/api/services-admin/brands/brand.service'
import { useRouter } from 'next/router'
import { FC } from 'react'

import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'

// ========================================================================
type BrandRowProps = {
	brand: any
	selected: any[]
	refetch: () => void
}
// ========================================================================

const BrandRow: FC<BrandRowProps> = ({ brand, selected, refetch }) => {
	const { push } = useRouter()
	const { name, featured, image, id } = brand
	const isItemSelected = selected.indexOf(name) !== -1

	const handleEdit = () => {
		push(`/admin/brands/${id}`)
	}

	const handleRemove = async () => {
		if (!confirm('Are you sure?')) return
		await BrandsService.delete(id)
		refetch()
	}

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			selected={isItemSelected}
			aria-checked={isItemSelected}
		>
			{/* <StyledTableCell align="center">{id}</StyledTableCell> */}

			<StyledTableCell align="center">{name}</StyledTableCell>

			<StyledTableCell align="center">
				<Avatar
					src={image}
					sx={{ width: 55, height: 'auto', margin: 'auto', borderRadius: 0 }}
				/>
			</StyledTableCell>

			<StyledTableCell align="center">
				{/* <StyledIconButton>
					<RemoveRedEye />
				</StyledIconButton> */}
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

export default BrandRow
