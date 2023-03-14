import { Grid, Pagination } from '@mui/material'
import { Span } from 'src/components/Typography'
import { FlexBetween } from 'src/components/flex-box'
import ProductCard1 from 'src/components/product-cards/ProductCard1'
import productDatabase from 'src/data/product-database'
import { useRouter } from 'next/router'
import { FC, Fragment, useEffect } from 'react'
import { IProductPreview } from 'src/shared/types/product.types'

type ProductCard1ListProps = {
	products: IProductPreview[]
	count?: number
	handleChange?: (page: number) => void
}

const ProductCard1List: FC<ProductCard1ListProps> = ({
	products = [],
	count,
	handleChange,
}) => {
	return (
		<Fragment>
			<Grid container spacing={3}>
				{products?.map((item) => (
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
						count={Math.ceil(count / 21)}
						onChange={(e, page) => handleChange(page)}
					/>
				)}
			</FlexBetween>
		</Fragment>
	)
}

export default ProductCard1List
