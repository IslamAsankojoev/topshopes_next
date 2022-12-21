import { Delete, Edit } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { PagesService } from 'api/services-admin/pages/pages.service'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { IPages } from 'shared/types/pages.types'

import {
	CategoryWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'

// ========================================================================
type CategoryRowProps = {
	item: IPages
	selected: any[]
	refetch: () => void
}
// ========================================================================

const PagesRow: FC<CategoryRowProps> = ({ item, selected, refetch }) => {
	const { push } = useRouter()
	const { title, date_updated, image, id } = item

	const isItemSelected = selected.indexOf(title) !== -1

	const handleRemove = async () => {
		if (!confirm('Are you sure you want to delete this page?')) return
		await PagesService.delete(id)
		refetch()
	}

	const handleEdit = () => {
		push(`/admin/pages-list/${id}`)
	}

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			selected={isItemSelected}
			aria-checked={isItemSelected}
		>
			<StyledTableCell align="left">
				<CategoryWrapper>{title}</CategoryWrapper>
			</StyledTableCell>

			<StyledTableCell align="left">
				{image ? <Avatar src={image} sx={{ borderRadius: '8px' }} /> : 'none'}
			</StyledTableCell>

			<StyledTableCell align="left">{date_updated}</StyledTableCell>

			<StyledTableCell align="left">
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

export default PagesRow
