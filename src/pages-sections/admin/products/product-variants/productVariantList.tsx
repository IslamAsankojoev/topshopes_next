import { DeleteOutline } from '@mui/icons-material'
import { Card, Grid, IconButton } from '@mui/material'
import Card1 from 'components/Card1'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { H6, Paragraph } from 'components/Typography'
import React from 'react'
import { IProductVariant } from 'shared/types/product.types'
import ProductVariantForm from './ProductVariantForm'
import { ProductFetchTypes } from 'pages-sections/admin/products/useProductFetch'
import { IProduct } from 'shared/types/product.types'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useActions } from 'hooks/useActions'
import styled from '@emotion/styled'
import {
	adminCheckFetch,
	getImgUrl,
	getVariantInfo,
} from './productVariantHelper'

type Props = {
	refetch?: () => void
	fetch: ProductFetchTypes
	product: IProduct | { variants: IProductVariant[] }[] | any
	create?: boolean
	isAdmin?: boolean
}

const ProductVariantList: React.FC<Props> = ({
	refetch,
	fetch,
	product,
	create,
	isAdmin,
}) => {
	// actions
	const { removeVariant } = useActions()

	// states
	const { user } = useTypedSelector((state) => state.userStore)

	// functions
	const variantCheck = (data) => (create ? data?.variant : data)
	const variantList = (data) => (create ? data : data?.variants)

	const deleteVariant = async (item: IProductVariant) => {
		if (create) {
			removeVariant(item.id)
			return
		}
		await adminCheckFetch(user.is_superuser).delete(item?.id)
		refetch && (await refetch())
	}

	return (
		<Card1 sx={{ mb: 3, mt: 3 }}>
			<FlexBetween>
				<h2>Product Variants</h2>
				<ProductVariantForm
					refetch={refetch}
					colors={fetch.colors}
					sizes={fetch.sizes}
					initialValues={{}}
					productId={product?.id}
					createPage={create}
					create={true}
					isAdmin={isAdmin}
				/>
			</FlexBetween>
			<Grid sx={{ bgcolor: 'white' }} container spacing={3}>
				{variantList(product)?.map((variant: IProductVariant, ind: number) => (
					<Grid item md={4} sm={6} xs={12} key={ind + 'product variant'}>
						<VariantCard>
							<img
								src={getImgUrl(variantCheck(variant)?.thumbnail)}
								alt={'thumbnail'}
							/>

							<FlexBox justifyContent={'space-between'}>
								<div>
									<H6 mb={0.5}>price: {variantCheck(variant)?.price}</H6>
									<Paragraph color="grey.700">
										size:{' '}
										{getVariantInfo(variantCheck(variant)?.size, fetch?.sizes)}
									</Paragraph>
									<Paragraph color="grey.700">
										color:{' '}
										{getVariantInfo(variantCheck(variant)?.color, fetch.colors)}
									</Paragraph>
									<Paragraph color="grey.700">
										discount: {variantCheck(variant)?.discount}
									</Paragraph>
									<Paragraph color="grey.700">
										status: {variantCheck(variant)?.status}
									</Paragraph>
									<Paragraph color="grey.700">
										stock: {variantCheck(variant)?.stock}
									</Paragraph>
								</div>
								<FlexBox alignItems={'center'}>
									<ProductVariantForm
										refetch={refetch}
										colors={fetch.colors}
										sizes={fetch.sizes}
										initialValues={variantCheck(variant)}
										createPage={create}
										variantId={variant?.id}
										images={variant?.images}
									/>
									<IconButton
										size="small"
										color="error"
										onClick={(e) => deleteVariant(variant)}
									>
										{!isAdmin ? <DeleteOutline sx={{ fontSize: 20 }} /> : null}
									</IconButton>
								</FlexBox>
							</FlexBox>
						</VariantCard>
					</Grid>
				))}
			</Grid>
		</Card1>
	)
}

const VariantCard = styled(Card)`
	display: grid !important;
	grid-gap: 20px 0 !important;
	padding: 20px 10px !important;
	box-shadow: 0px 1px 3px rgb(3 0 71 / 30%) !important;
	border: none !important;
	position: relative !important;

	img {
		margin: 0 auto;
		max-width: 300px;
		height: 250px;
		width: 100%;
		object-fit: cover;
	}
`

export default ProductVariantList
