import { Delete, Edit } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { CategoriesService } from 'src/api/services-admin/categories/category.service'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { ICategory } from 'src/shared/types/product.types'

import {
	CategoryWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'
import { width } from '@mui/system'

// ========================================================================
type CategoryRowProps = {
	item: ICategory
	selected: any[]
	refetch: () => void
}
// ========================================================================

const CategoryRow: FC<CategoryRowProps> = ({ item, selected, refetch }) => {
	const { reload, push } = useRouter()
	const { featured, icon, id, name, image, parent, slug, tax, attributes } =
		item
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
				<CategoryWrapper>{name}</CategoryWrapper>
			</StyledTableCell>

			{/* <StyledTableCell align="left" onClick={handleEdit}>
				<CategoryWrapper>{name}</CategoryWrapper>
			</StyledTableCell> */}

			<StyledTableCell align="center" onClick={handleEdit}>
				{tax}%
			</StyledTableCell>

			<StyledTableCell align="center" onClick={handleEdit}>
				<Avatar
					src={image}
					sx={{ borderRadius: '4px', width: '80px', margin: '0 auto' }}
				/>
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
					<Delete color="error" />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default CategoryRow
