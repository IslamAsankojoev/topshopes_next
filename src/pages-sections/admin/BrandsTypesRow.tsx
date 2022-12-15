import { Delete, Edit } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import {
	CategoryWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'
import { SizesService } from '../../api/services/sizes/sizes.service'
import { BrandTypesService } from '../../api/services-admin/brand-types/brandTypes.service'

// ========================================================================
type BrandsTypesRowProps = {
	name: any
	selected: any[]
	refetch: () => void
}
// ========================================================================

const BrandsTypesRow: FC<BrandsTypesRowProps> = ({
	name,
	selected,
	refetch,
}) => {
	const { push } = useRouter()
	const { name: BrandTypeName, id } = name

	const isItemSelected = selected.indexOf(BrandTypeName) !== -1

	const handleEdit = async () => {
		await push(`/admin/brands-types/${id}`)
	}

	const handleRemove = async () => {
		if (!confirm('Are you sure you want to delete this Brands Types?')) return
		await BrandTypesService.deleteBrandTypes(id)
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
				<CategoryWrapper>{BrandTypeName}</CategoryWrapper>
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

export default BrandsTypesRow
