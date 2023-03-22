import { Delete, Edit } from '@mui/icons-material'
import { Box } from '@mui/material'
import { ProductsService } from 'src/api/services/products/product.service'
import LazyImage from 'src/components/LazyImage'
import { Paragraph, Small } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { IProductPreview } from 'src/shared/types/product.types'
import VisibilityIcon from '@mui/icons-material/Visibility'

import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from '../StyledComponents'
import { darken } from '@mui/system'

// ========================================================================
type ProductRowProps = { product: IProductPreview; refetch: () => void }
// ========================================================================

const ProductRowV2: FC<ProductRowProps> = ({ product, refetch }) => {
	const { category, name, published, slug, thumbnail, price, id } = product

	// state
	const router = useRouter()

	//handlers
	const onDelete = async () => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				await ProductsService.delete(id)
				refetch()
			} catch (e: unknown) {
				toast.error('An error has occurred')
				console.log(e)
			}
		}
	}

	return (
		<StyledTableRow
			tabIndex={-1}
			role="checkbox"
			sx={{
				cursor: 'pointer',
				transition: 'all 0.2s ease-in-out',
				'&:hover': {
					backgroundColor: darken('#F3F5F9', 0.1),
				},
			}}
		>
			<StyledTableCell
				align="left"
				onClick={() => router.push(`${router.pathname}/${id}`)}
			>
				<FlexBox alignItems="center" gap={1.5}>
					<LazyImage
						src={thumbnail}
						width={50}
						height={50}
						sx={{ borderRadius: '8px' }}
					/>
					<Box>
						<Paragraph>{name}</Paragraph>
					</Box>
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell
				align="left"
				onClick={() => router.push(`${router.pathname}/${id}`)}
			>
				{category}
			</StyledTableCell>

			<StyledTableCell
				align="left"
				onClick={() => router.push(`${router.pathname}/${id}`)}
			>
				{price}c
			</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton onClick={() => router.push(`/product/${id}/`)}>
					<VisibilityIcon />
				</StyledIconButton>

				<StyledIconButton onClick={onDelete}>
					<Delete />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default ProductRowV2
