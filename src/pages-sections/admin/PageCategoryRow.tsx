import { Delete, Edit } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import {
	CategoryWrapper,
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from './StyledComponents'
import { PageCategoryService } from 'api/services-admin/pages-categories/pagesCategories.service'

// ========================================================================
type PageCategoryRowProps = {
	name: any
	selected: any[]
	refetch: () => void
}
// ========================================================================

const PageCategoryRow: FC<PageCategoryRowProps> = ({
	name,
	selected,
	refetch,
}) => {
	const { push } = useRouter()
	const { title, id } = name

	const isItemSelected = selected.indexOf(title) !== -1

	const handleEdit = () => {
		push(`/admin/pages-category/${id}`)
	}

	const handleRemove = async () => {
		if (!confirm('Are you sure you want to delete this category?')) return
		await PageCategoryService.delete(id)
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
				<CategoryWrapper>{title}</CategoryWrapper>
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

export default PageCategoryRow
