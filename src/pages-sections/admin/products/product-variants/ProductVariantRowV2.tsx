import { Delete, Edit } from '@mui/icons-material'
import { Box, Card, Typography } from '@mui/material'
import { ProductsService } from 'src/api/services/products/product.service'
import LazyImage from 'src/components/LazyImage'
import { Paragraph, Small } from 'src/components/Typography'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useState } from 'react'
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
import { getImgUrl, variantCheck } from './productVariantHelper'

// ========================================================================
type ProductRowProps = {
	product: any
	refetch: () => void
	dialogForm: ReactNode
}
// ========================================================================

const ProductRow: FC<ProductRowProps> = ({ product, refetch, dialogForm }) => {
	const [variant, setVariant] = useState<IProductVariant>(null)

	useEffect(() => {
		setVariant(product?.variant)
	}, [product])

	return (
		<StyledTableRow tabIndex={-1} role="checkbox">
			<StyledTableCell align="left">
				<FlexBox alignItems="center" gap={1.5}>
					<LazyImage
						src={getImgUrl(variant?.thumbnail)}
						width={50}
						height={50}
						sx={{ borderRadius: '8px' }}
					/>
				</FlexBox>
			</StyledTableCell>

			<StyledTableCell align="left">
				{getCurrency(variant?.price)}
			</StyledTableCell>

			<StyledTableCell align="left">{variant?.discount}%</StyledTableCell>

			<StyledTableCell align="left">{variant?.status}</StyledTableCell>

			<StyledTableCell align="left">{variant?.stock}</StyledTableCell>

			<StyledTableCell
				sx={{
					p: 2,
				}}
			>
				{variant?.attribute_values?.map((attribute, index) => {
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
								{/* @ts-ignore */}
								{attribute?.name}
							</Typography>
							{/* @ts-ignore */}
							{attribute?.value}
						</Box>
					)
				})}
			</StyledTableCell>

			<StyledTableCell align="center">{dialogForm}</StyledTableCell>
		</StyledTableRow>
	)
}

export default ProductRow
