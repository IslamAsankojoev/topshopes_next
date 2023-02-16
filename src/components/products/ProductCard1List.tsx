import { Grid, Pagination } from '@mui/material'
import { Span } from 'components/Typography'
import { FlexBetween } from 'components/flex-box'
import ProductCard1 from 'components/product-cards/ProductCard1'
import productDatabase from 'data/product-database'
import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'
import { IProduct, IProductPreview } from 'shared/types/product.types'

// ========================================================
type ProductCard1ListProps = { products: IProductPreview[]; count?: number }
// ========================================================

const ProductCard1List: FC<ProductCard1ListProps> = ({
	products,
	count,
}) => {
	const router = useRouter()

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
				<Pagination
					page={+router?.query?.page || 1}
					count={Math.ceil(count / 20)}
					onChange={(_, newValue) =>
						router.push({
							pathname: router.pathname,
							query: { ...router.query, page: newValue },
						})
					}
					variant="outlined"
					color="primary"
				/>
			</FlexBetween>
		</Fragment>
	)
}

export default ProductCard1List
