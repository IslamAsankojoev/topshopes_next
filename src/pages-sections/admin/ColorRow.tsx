import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { BrandsService } from 'api/services-admin/brands/brand.service'
import { ColorsService } from 'api/services/colors/colors.service'
import BazaarSwitch from 'components/BazaarSwitch'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
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

const BrandRow: FC<ColorRowProps> = ({ color, selected, refetch }) => {
	const { push } = useRouter()
	const { name, color: colorCode, id } = color
	const isItemSelected = selected.indexOf(name) !== -1

	const handleEdit = () => {
		push(`/admin/colors/${id}`)
	}

	const handleRemove = async () => {
		if (!confirm('Are you sure you want to delete this color?')) return
		await ColorsService.deleteColor(id)
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
				<div
					style={{
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

export default BrandRow
