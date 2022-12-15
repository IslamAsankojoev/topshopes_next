import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import BazaarSwitch from 'components/BazaarSwitch'
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
	const { reload } = useRouter()
	const { featured, icon, id, name, image, parent, slug } = item
	const isItemSelected = selected.indexOf(name) !== -1

	// state
	const [featuredCategory, setFeaturedCategory] = useState(featured)

	const featuredCategoryHandler = async () => {
		await CategoriesService.updateCategory(id, { featured: !featuredCategory })
		setFeaturedCategory((state) => !state)
	}

	const handleRemove = async () => {
		await CategoriesService.deleteCategory(id)
		refetch()
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
				<Avatar src={icon} sx={{ borderRadius: '8px' }} />
			</StyledTableCell>

			<StyledTableCell align="left">
				<Avatar src={image} sx={{ borderRadius: '8px' }} />
			</StyledTableCell>

			{/* <StyledTableCell align="left">{level}</StyledTableCell> */}

			<StyledTableCell align="left">
				<BazaarSwitch
					color="info"
					checked={featuredCategory}
					onChange={featuredCategoryHandler}
				/>
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton>
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
