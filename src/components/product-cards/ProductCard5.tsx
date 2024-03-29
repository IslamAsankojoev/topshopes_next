import { Box } from '@mui/material'
import HoverBox from 'src/components/HoverBox'
import LazyImage from 'src/components/LazyImage'
import { H4 } from 'src/components/Typography'
import { FC } from 'react'


// ==========================================================
type ProductCard5Props = {
	name: string
	thumbnail: string
}
// ==========================================================

const ProductCard5: FC<ProductCard5Props> = ({ thumbnail, name }) => {
	return (
		<Box>
			<HoverBox borderRadius="5px" mb={1}>
				<LazyImage
					alt={name}
					width={260}
					src={thumbnail}
					height={175}
					objectFit="contain"
					layout="responsive"
				/>
			</HoverBox>
			<H4 fontSize={14}>{name}</H4>
		</Box>
	)
}

export default ProductCard5
