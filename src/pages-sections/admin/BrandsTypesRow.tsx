import { Delete, Edit } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import {
	CategoryWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'
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
		await BrandTypesService.delete(id)
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
			<StyledTableCell align="center">
				<CategoryWrapper>{BrandTypeName}</CategoryWrapper>
			</StyledTableCell>

			<StyledTableCell align="center">
				{/* <StyledIconButton onClick={handleEdit}>
					<Edit />
				</StyledIconButton> */}

				<StyledIconButton onClick={handleRemove}>
					<Delete color="error" />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default BrandsTypesRow
