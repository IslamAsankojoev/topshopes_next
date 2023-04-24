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

import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from '../StyledComponents'

// ========================================================================
type ProductRowProps = { product: IProductPreview; refetch: () => void }
// ========================================================================

const ProductRow: FC<ProductRowProps> = ({ product, refetch }) => {
	const { category, name, is_published, slug, thumbnail, price, id } = product

	// state
	const router = useRouter()

	//handlers
	const onDelete = async () => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				await ProductsService.delete(id)
				refetch()
			} catch (e: unknown) {
				console.error(e)
			}
		}
	}

	return (
		<StyledTableRow tabIndex={-1} role="checkbox">
			<StyledTableCell align="left">
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

			<StyledTableCell align="left">{category}</StyledTableCell>

			{/* <StyledTableCell align="left">
				<Avatar
					src={brand?.image}
					sx={{ width: 55, height: 'auto', borderRadius: 0 }}
				/>
			</StyledTableCell> */}

			<StyledTableCell align="left">{price}c</StyledTableCell>

			<StyledTableCell align="center">
				<StyledIconButton
					onClick={() => router.push(`${router.pathname}/${id}`)}
				>
					<Edit />
				</StyledIconButton>

				<StyledIconButton onClick={onDelete}>
					<Delete color="error" />
				</StyledIconButton>
			</StyledTableCell>
		</StyledTableRow>
	)
}

export default ProductRow
