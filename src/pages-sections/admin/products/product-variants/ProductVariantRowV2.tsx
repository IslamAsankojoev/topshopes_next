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

// ========================================================================
type ProductRowProps = {
	variant: IProductVariant
	refetch: () => void
	dialogForm: ReactNode
}
// ========================================================================

const ProductRow: FC<ProductRowProps> = ({ variant, refetch, dialogForm }) => {
	const {
		attribute_values,
		discount,
		discount_price,
		id,
		images,
		overall_price,
		price,
		product,
		status,
		stock,
		thumbnail,
	} = variant

	const router = useRouter()

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
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell align="left">{getCurrency(price)}</StyledTableCell>

			<StyledTableCell align="left">{discount}%</StyledTableCell>

			<StyledTableCell align="left">{status}</StyledTableCell>

			<StyledTableCell align="left">{stock}</StyledTableCell>

			<StyledTableCell
				sx={{
					p: 2,
				}}
			>
				{attribute_values.map((attribute_value, index) => {
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
								{attribute_value.attribute.name}
							</Typography>
							{attribute_value.value}
						</Box>
					)
				})}
			</StyledTableCell>

			<StyledTableCell align="center">{dialogForm}</StyledTableCell>
		</StyledTableRow>
	)
}

export default ProductRow
