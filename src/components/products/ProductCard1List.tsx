import { Grid, Pagination } from '@mui/material'
import { Span } from 'src/components/Typography'
import { FlexBetween } from 'src/components/flex-box'
import ProductCard1 from 'src/components/product-cards/ProductCard1'
import { FC, Fragment } from 'react'
import { IProductPreview } from 'src/shared/types/product.types'
import { useRouter } from 'next/router'

type ProductCard1ListProps = {
	products: IProductPreview[]
	count?: number
	handleChange?: (page: number) => void
	lg?: number
	sm?: number
	xs?: number
}

const ProductCard1List: FC<ProductCard1ListProps> = ({
	products = [],
	count,
	handleChange,
	lg,
	sm,
	xs,
}) => {
	const router = useRouter()

	return (
		<Fragment>
			<Grid container spacing={3}>
				{products?.map((item) => (
					<Grid item lg={lg || 4} sm={sm || 4} xs={xs || 6} key={item.id}>
						<ProductCard1 product={item} />
					</Grid>
				))}
			</Grid>

			<FlexBetween flexWrap="wrap" mt={4} justifyContent="center">
				{!!count && (
					<Pagination
						variant="text"
						shape="rounded"
						page={Number(router.query.page) || 1}
						count={Math.ceil(count / 18)}
						onChange={(e, page) => handleChange(page)}
					/>
				)}
			</FlexBetween>
		</Fragment>
	)
}

export default ProductCard1List
