import { Delete, Edit } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { CategoriesService } from 'src/api/services-admin/categories/category.service'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { ICategory } from 'src/shared/types/product.types'

import {
	CategoryWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'

// ========================================================================
type CategoryRowProps = {
	item: ICategory
	selected: any[]
	refetch: () => void
}
// ========================================================================

const CategoryRow: FC<CategoryRowProps> = ({ item, selected, refetch }) => {
	const { reload, push } = useRouter()
	const { featured, icon, id, name, image, parent, slug } = item
	const isItemSelected = selected.indexOf(name) !== -1

	const handleRemove = async () => {
		if (!confirm('Are you sure you want to delete this category?')) return null
		await CategoriesService.delete(id)
		refetch()
	}

	const handleEdit = () => {
		push(`/admin/categories/${id}/`)
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
		>
			<StyledTableCell align="left" onClick={handleEdit}>
				{name}
			</StyledTableCell>

			<StyledTableCell align="left" onClick={handleEdit}>
				<CategoryWrapper>{name}</CategoryWrapper>
			</StyledTableCell>

			<StyledTableCell align="left" onClick={handleEdit}>
				{icon ? <Avatar src={icon} sx={{ borderRadius: '8px' }} /> : 'none'}
			</StyledTableCell>

			<StyledTableCell align="left" onClick={handleEdit}>
				<Avatar src={image} sx={{ borderRadius: '8px' }} />
			</StyledTableCell>

			{/* <StyledTableCell align="left">{level}</StyledTableCell> */}

			<StyledTableCell align="center">
				{/* <StyledIconButton onClick={handleEdit}>
					<Edit />
				</StyledIconButton> */}
				{/* 
				<StyledIconButton>
					<RemoveRedEye />
				</StyledIconButton> */}

				<StyledIconButton onClick={handleRemove}>
					<Delete />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default CategoryRow
