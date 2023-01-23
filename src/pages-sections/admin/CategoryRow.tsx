import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import BazaarSwitch from 'components/BazaarSwitch'
import { getCategoriesUrl } from 'config/api.config'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { ICategory } from 'shared/types/product.types'

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
		if (!confirm('Are you sure you want to delete this category?')) return
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
		>
			<StyledTableCell align="left">{name}</StyledTableCell>

			<StyledTableCell align="left">
				<CategoryWrapper>{name}</CategoryWrapper>
			</StyledTableCell>

			<StyledTableCell align="left">
				{icon ? <Avatar src={icon} sx={{ borderRadius: '8px' }} /> : 'none'}
			</StyledTableCell>

			<StyledTableCell align="left">
				<Avatar src={image} sx={{ borderRadius: '8px' }} />
			</StyledTableCell>

			{/* <StyledTableCell align="left">{level}</StyledTableCell> */}

			<StyledTableCell align="center">
				<StyledIconButton onClick={handleEdit}>
					<Edit />
				</StyledIconButton>
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
