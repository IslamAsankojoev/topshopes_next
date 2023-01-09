import { Grid, Pagination } from '@mui/material'
import { FlexBetween } from 'components/flex-box'
import ProductCard1 from 'components/product-cards/ProductCard1'
import { Span } from 'components/Typography'
import productDatabase from 'data/product-database'
import React, { Fragment } from 'react'
import { IProduct, IProductPreview } from 'shared/types/product.types'

// ========================================================
type ProductCard1ListProps = { products: IProductPreview[] }
// ========================================================

const ProductCard1List: React.FC<ProductCard1ListProps> = ({ products }) => {
	return (
		<Fragment>
			<Grid container spacing={3}>
				{products?.map((item, ind) => (
					<Grid item lg={4} sm={6} xs={6} key={ind}>
						<ProductCard1 product={item} />
					</Grid>
				))}
			</Grid>

			<FlexBetween flexWrap="wrap" mt={4}>
				<Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
				<Pagination count={10} variant="outlined" color="primary" />
			</FlexBetween>
		</Fragment>
	)
}

export default ProductCard1List
