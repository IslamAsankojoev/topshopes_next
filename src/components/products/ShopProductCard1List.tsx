import { Grid, Pagination } from '@mui/material'
import { Span } from 'src/components/Typography'
import { FlexBetween } from 'src/components/flex-box'
import ProductCard1 from 'src/components/product-cards/ProductCard1'
import { FC, Fragment } from 'react'
import { IProductPreview } from 'src/shared/types/product.types'

type ShopProductCard1ListProps = {
	products: IProductPreview[]
	count?: number
	handleChange?: (page: number) => void
}

const ShopProductCard1List: FC<ShopProductCard1ListProps> = ({
	products = [],
	count,
	handleChange,
}) => {
	const publishedProducts = products.filter(
		(item: IProductPreview) => item.is_published === true
	)

	return (
		<Fragment>
			<Grid container spacing={3}>
				{publishedProducts?.map((item) => (
					<Grid item lg={3} sm={4} xs={6} key={item.id}>
						<ProductCard1 product={item} />
					</Grid>
				))}
			</Grid>

			<FlexBetween flexWrap="wrap" mt={4}>
				<Span color="grey.600"></Span>
				{!!count && (
					<Pagination
						variant="outlined"
						shape="rounded"
						count={Math.ceil(publishedProducts.length / 21)}
						onChange={(e, page) => handleChange(page)}
					/>
				)}
			</FlexBetween>
		</Fragment>
	)
}

export default ShopProductCard1List
