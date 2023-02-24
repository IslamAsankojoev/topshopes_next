import { Box } from '@mui/material'
import BazaarRating from 'src/components/BazaarRating'
import HoverBox from 'src/components/HoverBox'
import LazyImage from 'src/components/LazyImage'
import { H4, Small } from 'src/components/Typography'
import { FlexRowCenter } from 'src/components/flex-box'
import { CSSProperties, FC } from 'react'
import { IProductPreview } from 'src/shared/types/product.types'
import { getCurrency } from 'src/utils/getCurrency'


const ProductCard4: FC<IProductPreview> = ({
	thumbnail,
	rating,
	name,
	price,
	discount_price,
	shop
}) => {
	return (
		<Box>
			<HoverBox mb={2} mx="auto" borderRadius="8px">
				<LazyImage
					src={thumbnail}
					width={0}
					height={0}
					layout="responsive"
					alt={name}
					mx="auto"
				/>
			</HoverBox>

			<FlexRowCenter mb={0.5}>
				<BazaarRating value={rating} color="warn" readOnly />
				<Small fontWeight={600} pl={0.5}>
					({shop.name})
				</Small>
			</FlexRowCenter>

			<H4 fontSize={14} textAlign="center" mb={0.5} title={name} ellipsis>
				{name}
			</H4>
			<H4 fontSize={14} textAlign="center" color="primary.main">
				{getCurrency(discount_price || price)}
			</H4>
		</Box>
	)
}

export default ProductCard4
