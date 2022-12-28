import { DeleteOutline } from '@mui/icons-material'
import { Card, Grid, IconButton } from '@mui/material'
import Card1 from 'components/Card1'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { H6, Paragraph } from 'components/Typography'
import React from 'react'
import { IProductVariant } from 'shared/types/product-variant.types'
import ProductVariantForm from './ProductVariantForm'
import { ProductFetchTypes } from 'pages-sections/admin/products/useProductFetch'
import { IProduct } from 'shared/types/product.types'

type Props = {
	refetch?: () => void
	fetch: ProductFetchTypes
	product: IProduct | { variants: IProductVariant[] }[] | any
	create?: boolean
}

const ProductVariantList: React.FC<Props> = ({
	refetch,
	fetch,
	product,
	create,
}) => {
	const variantCheck = (data) => (create ? data.variants : data)
	const variantList = (data) => (create ? data : data.variants)

	return (
		<Card1 sx={{ mb: 3, mt: 3 }}>
			<FlexBetween>
				<h2>Product Variants</h2>
				<ProductVariantForm
					refetch={refetch}
					colors={fetch.colors}
					sizes={fetch.size}
					initialValues={{}}
					productId={product?.id}
					createPage={create}
					create={true}
				/>
			</FlexBetween>
			<Grid sx={{ bgcolor: 'white' }} container spacing={3}>
				{variantList(product)?.map((variant: IProductVariant, ind: number) => (
					<Grid item md={4} sm={6} xs={12} key={ind + 'product variant'}>
						<Card
							sx={{
								padding: 2,
								border: '1px solid',
								position: 'relative',
								backgroundColor: 'grey.100',
							}}
						>
							<FlexBox
								justifyContent="flex-end"
								sx={{ position: 'absolute', top: 5, right: 5 }}
							>
								<ProductVariantForm
									refetch={refetch}
									colors={fetch.colors}
									sizes={fetch.size}
									initialValues={variantCheck(variant)}
									createPage={create}
								/>
								<IconButton
									size="small"
									color="error"
									// onClick={(e) => deleteAddress(e, item.id)}
								>
									<DeleteOutline sx={{ fontSize: 20 }} />
								</IconButton>
							</FlexBox>

							<H6 mb={0.5}>price: {variantCheck(variant).price}</H6>
							<Paragraph color="grey.700">
								discount: {variantCheck(variant).discount}
							</Paragraph>
							<Paragraph color="grey.700">
								stock: {variantCheck(variant).stock}
							</Paragraph>
						</Card>
					</Grid>
				))}
			</Grid>
		</Card1>
	)
}

export default ProductVariantList
