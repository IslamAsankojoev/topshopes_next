import { Grid, Pagination } from '@mui/material'
import { Span } from 'src/components/Typography'
import { FlexBetween } from 'src/components/flex-box'
import ProductCard1 from 'src/components/product-cards/ProductCard1'
import productDatabase from 'src/data/product-database'
import { useRouter } from 'next/router'
import { FC, Fragment, useEffect } from 'react'
import { IProductPreview } from 'src/shared/types/product.types'

// ========================================================
type ProductCard1ListProps = { products: IProductPreview[]; count?: number, handleChange?: (page: number) => void }
// ========================================================

const ProductCard1List: FC<ProductCard1ListProps> = ({
	products,
	count,
	handleChange
}) => {

	useEffect(() => {
		console.log('count', count)
	}, [count])

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
				<Span color="grey.600"></Span>
				<Pagination variant="outlined" shape="rounded" count={Math.ceil(count/21)} onChange={(e, page)=> handleChange(page)} />
			</FlexBetween>
		</Fragment>
	)
}

export default ProductCard1List
