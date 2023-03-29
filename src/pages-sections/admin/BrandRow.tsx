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
import LazyImage from 'src/components/LazyImage'

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
			sx={{
				cursor: 'pointer',
				transition: 'all 0.2s ease-in-out',
				'&:hover': {
					backgroundColor: 'grey.200',
				},
			}}
			onClick={handleEdit}
		>
			{/* <StyledTableCell align="center">{id}</StyledTableCell> */}

			<StyledTableCell align="center">{name}</StyledTableCell>

			<StyledTableCell align="center">
				<img
					src={image}
					style={{
						width: 55,
						height: 35,
						objectFit: 'contain',
						margin: 'auto',
						borderRadius: 0,
					}}
				/>
			</StyledTableCell>

			<StyledTableCell align="center">
				{/* <StyledIconButton>
					<RemoveRedEye />
				</StyledIconButton> */}
				{/* <StyledIconButton onClick={handleEdit}>
					<Edit />
				</StyledIconButton> */}

				<StyledIconButton onClick={handleRemove}>
					<Delete />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default BrandRow
