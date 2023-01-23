import styled from '@emotion/styled'
import { Close, DeleteOutline } from '@mui/icons-material'
import { Button, Card, Grid, IconButton, Typography } from '@mui/material'
import { CategoriesService } from 'api/services/categories/category.service'
import Card1 from 'components/Card1'
import LazyImage from 'components/LazyImage'
import { H6, Paragraph } from 'components/Typography'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Lodash from 'lodash'
import { useTranslation } from 'next-i18next'
import { ProductFetchTypes } from 'pages-sections/admin/products/useProductFetch'
import React from 'react'
import { useQuery } from 'react-query'
import { IProductVariant } from 'shared/types/product.types'
import { IProduct } from 'shared/types/product.types'

import ProductVariantForm from './ProductVariantForm'
import { adminCheckFetch, getImgUrl } from './productVariantHelper'

type Props = {
	refetch?: () => void
	product: IProduct | { variants: IProductVariant[] }[] | any
	create?: boolean
	isAdmin?: boolean
}

const ProductVariantList: React.FC<Props> = ({
	refetch,
	product,
	create,
	isAdmin,
}) => {
	const { t: adminT } = useTranslation('admin')
	const { t: commonT } = useTranslation('common')

	// actions
	const { removeVariant } = useActions()

	// states
	const { user } = useTypedSelector((state) => state.userStore)
	const { currentCategory } = useTypedSelector(
		(state) => state.productVariantsStore
	)

	// functions
	const variantCheck = (data) => (create ? data?.variant : data)
	const variantList = (data) => (create ? data : data?.variants)

	const getAllattributes = (
		variantAttributes: any,
		categoryAttributes: any
	) => {
		if (variantAttributes?.length === categoryAttributes?.length) {
			return variantAttributes
		}

		return categoryAttributes?.map((attribute) => {
			if (!variantAttributes?.length) {
				return attribute
			}
			for (let i of variantAttributes) {
				if (
					i?.attribute?.name === attribute?.name ||
					i?.attributeName === attribute?.name
				) {
					return i
				}
			}
			return attribute
		})
	}

	const deleteVariant = async (item: IProductVariant) => {
		if (create) {
			removeVariant(item.id)
			return
		}
		await adminCheckFetch(user.is_superuser).delete(item?.id)
		refetch && (await refetch())
	}

	// fetching
	const { data: category, refetch: categoryRefetch } = useQuery(
		'category get',
		() => CategoriesService.get(currentCategory),
		{
			enabled: !!currentCategory,
		}
	)

	React.useEffect(() => {
		if (currentCategory) categoryRefetch()
	}, [currentCategory])

	return (
		<Card1 sx={{ mb: 3, mt: 3 }}>
			<FlexBetween>
				<h2>{adminT('productVariants')}</h2>
				<ProductVariantForm
					attributes={category?.attributes}
					refetch={refetch}
					initialValues={{}}
					productId={product?.id}
					createPage={create}
					create={true}
					isAdmin={isAdmin}
				/>
			</FlexBetween>
			<Grid sx={{ bgcolor: 'white' }} container spacing={1.3}>
				{Lodash.sortBy(variantList(product), 'id')?.map(
					(variant: IProductVariant, ind: number) => (
						<Grid item md={3} sm={4} xs={12} key={ind + 'product variant'}>
							<VariantCard>
								<LazyImage
									width={150}
									height={200}
									objectFit={'contain'}
									objectPosition={'center'}
									src={getImgUrl(variantCheck(variant)?.thumbnail)}
									alt={'thumbnail'}
								/>

								<FlexBox
									justifyContent={'space-between'}
									sx={{
										padding: '1rem',
									}}
								>
									<div>
										<Paragraph fontSize={16} color="grey.500">
											{adminT('variantDetails')} - {variantCheck(variant)?.id}
										</Paragraph>
										<H6 mb={0.5} fontSize={14}>
											{commonT('price')}: {variantCheck(variant)?.price}
										</H6>
										<Paragraph fontSize={14} color="grey.700">
											{commonT('discount')}: {variantCheck(variant)?.discount}
										</Paragraph>
										<Paragraph fontSize={14} color="grey.700">
											{commonT('status')}: {variantCheck(variant)?.status}
										</Paragraph>
										<Paragraph fontSize={14} color="grey.700">
											{commonT('stock')}: {variantCheck(variant)?.stock}
										</Paragraph>
										<br />
										<Paragraph fontSize={16} color="grey.500">
											{adminT('attributes')}
										</Paragraph>
										{variantCheck(variant)?.attribute_values?.map(
											(attribute: any, ind: number) => (
												<Paragraph color="grey.700" key={ind + 'attribute'}>
													{attribute?.attribute?.name ||
														attribute?.attributeName}
													:{attribute?.value || attribute?.attributeValue}
												</Paragraph>
											)
										)}
									</div>
									<FlexBox alignItems={'center'}>
										<ProductVariantForm
											attributes={getAllattributes(
												variant.attribute_values,
												category?.attributes
											)}
											refetch={refetch}
											initialValues={variantCheck(variant)}
											createPage={create}
											variantId={variant?.id}
											images={variant?.images}
										/>
										{!isAdmin ? (
											<Button
												sx={{
													position: 'absolute',
													top: '10px',
													right: '10px',
													padding: '4px',
												}}
												variant="contained"
												size="small"
												color="error"
												onClick={(e) => deleteVariant(variant)}
											>
												<Close />
											</Button>
										) : null}
									</FlexBox>
								</FlexBox>
							</VariantCard>
						</Grid>
					)
				)}
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
