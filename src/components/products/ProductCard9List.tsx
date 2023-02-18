import { Pagination } from '@mui/material'
import { FlexBetween } from 'src/components/flex-box'
import ProductCard9 from 'src/components/product-cards/ProductCard9'
import productDatabase from 'src/data/product-database'
import { FC } from 'react'

import { IProduct, IProductPreview } from 'src/shared/types/product.types'
import { Span } from '../Typography'

// ==========================================================
type ProductCard9ListProps = {}
// ==========================================================

const ProductCard9List: FC<{ products: IProductPreview[] }> = ({
	products,
}) => {
	return (
		<div>
			{products?.map((item, ind) => (
				<ProductCard9 key={ind} product={item} />
			))}

			<FlexBetween flexWrap="wrap" mt={4}>
				<Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
				<Pagination count={10} variant="outlined" color="primary" />
			</FlexBetween>
		</div>
	)
}

export default ProductCard9List
