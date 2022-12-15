import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { BrandsService } from 'api/services-admin/brands/brand.service'
import BazaarSwitch from 'components/BazaarSwitch'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
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

	// state
	const [featuredCategory, setFeaturedCategory] = useState(featured)

	const handleSwitch = async () => {
		await BrandsService.updateBrand(id, { featured: !featuredCategory })
		setFeaturedCategory((state) => !state)
	}
	const handleEdit = () => {
		push(`/admin/brands/${id}`)
	}

	const handleRemove = async () => {
		if (!confirm('Are you sure you want to delete this brand?')) return
		await BrandsService.deleteBrand(id)
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
				<BazaarSwitch
					color="info"
					checked={featuredCategory}
					onChange={handleSwitch}
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
