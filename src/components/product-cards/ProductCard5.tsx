import { Box } from '@mui/material'
import HoverBox from 'components/HoverBox'
import LazyImage from 'components/LazyImage'
import { H4 } from 'components/Typography'
import React from 'react'

// ==========================================================
type ProductCard5Props = {
	name: string
	thumbnail: string
}
// ==========================================================

const ProductCard5: React.FC<ProductCard5Props> = ({ thumbnail, name }) => {
	return (
		<Box>
			<HoverBox borderRadius="5px" mb={1}>
				<LazyImage
					alt={name}
					width={260}
					src={thumbnail}
					height={175}
					objectFit="cover"
					layout="responsive"
				/>
			</HoverBox>
			<H4 fontSize={14}>{name}</H4>
		</Box>
	)
}

export default ProductCard5
