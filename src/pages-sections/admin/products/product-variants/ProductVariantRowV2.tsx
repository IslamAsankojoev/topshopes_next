import { Delete, Edit } from '@mui/icons-material'
import { Box, Card, Typography } from '@mui/material'
import { ProductsService } from 'src/api/services/products/product.service'
import LazyImage from 'src/components/LazyImage'
import { Paragraph, Small } from 'src/components/Typography'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import { toast } from 'react-toastify'
import {
	IProductPreview,
	IProductVariant,
} from 'src/shared/types/product.types'
import TocIcon from '@mui/icons-material/Toc'
import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from '../../StyledComponents'
import { getCurrency } from 'src/utils/getCurrency'
import { dark, primary } from 'src/theme/themeColors'
import { getImgUrl } from './productVariantHelper'

// ========================================================================
type ProductRowProps = {
	variant: any
	refetch: () => void
	dialogForm: ReactNode
}
// ========================================================================

const ProductRow: FC<ProductRowProps> = ({ variant, refetch, dialogForm }) => {
	const { attribute_values, id, images, variant: Variant } = variant

	return (
		<StyledTableRow tabIndex={-1} role="checkbox">
			<StyledTableCell align="left">
				<FlexBox alignItems="center" gap={1.5}>
					<LazyImage
						src={getImgUrl(Variant?.thumbnail)}
						width={50}
						height={50}
						sx={{ borderRadius: '8px' }}
					/>
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell align="left">
				{getCurrency(Variant?.price)}
			</StyledTableCell>

			<StyledTableCell align="left">{Variant?.discount}%</StyledTableCell>

			<StyledTableCell align="left">{Variant?.status}</StyledTableCell>

			<StyledTableCell align="left">{Variant?.stock}</StyledTableCell>

			<StyledTableCell
				sx={{
					p: 2,
				}}
			>
				{attribute_values?.map((attribute, index) => {
					return (
						<Box
							className="attribute_item"
							sx={{
								'&:last-child': {
									borderRightWidth: '0px',
								},
								display: 'inline-flex',
								flexDirection: 'column',
								padding: '0px 10px',
								border: '0px solid #000',
								borderColor: 'secondary.300',
								borderRightWidth: '2px',
							}}
							key={index}
						>
							<Typography
								sx={{
									color: 'secondary.300',
									fontWeight: 'bold',
									fontSize: '10px',
								}}
							>
								{attribute?.attribute?.name ||
									attribute?.attributeName ||
									attribute?.name}
							</Typography>
							{attribute?.value || attribute?.attributeValue}
						</Box>
					)
				})}
			</StyledTableCell>

			<StyledTableCell align="center">{dialogForm}</StyledTableCell>
		</StyledTableRow>
	)
}

export default ProductRow
