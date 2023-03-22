import styled from '@emotion/styled'
import { Close } from '@mui/icons-material'
import { Button, Card, Grid } from '@mui/material'
import { CategoriesService } from 'src/api/services/categories/category.service'
import Card1 from 'src/components/Card1'
import LazyImage from 'src/components/LazyImage'
import { H6, Paragraph } from 'src/components/Typography'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import Lodash from 'lodash'
import { useTranslation } from 'next-i18next'
import { FC, Fragment, useEffect } from 'react'
import { useQuery } from 'react-query'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { IProductVariant } from 'src/shared/types/product.types'
import { IProduct } from 'src/shared/types/product.types'

import ProductVariantForm from './ProductVariantForm'
import { adminCheckFetch, getImgUrl } from './productVariantHelper'

type Props = {
	refetch?: () => void
	product: IProduct | { variants: IProductVariant[] }[] | any
	create?: boolean
	isAdmin?: boolean
}

const ProductVariantList: FC<Props> = ({
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

	return (
		<Card1 sx={{ mb: 3, mt: 3 }}>
			<FlexBetween>
				<h2>{adminT('productVariants')}</h2>
				<ProductVariantForm
					refetch={refetch}
					initialValues={{}}
					productId={product?.id}
					createPage={create}
					create={true}
					isAdmin={isAdmin}
				/>
			</FlexBetween>
			<Grid
				sx={{
					bgcolor: 'white',
				}}
				container
				spacing={1.3}
			>
				<TransitionGroup component={null}>
					{Lodash.sortBy(variantList(product), 'id')?.map(
						(variant: IProductVariant, ind: number) => (
							<CSSTransition
								key={variant.id + 'product variant'}
								timeout={200}
								classNames="item"
								unmountOnExit
								sx={{
									'&.item-enter': {
										opacity: 0,
										transform: 'scaleX(.5)',
									},
									'&.item-enter-active': {
										opacity: 1,
										transform: 'scaleX(1)',
										transition: 'all 200ms ease-in-out',
									},
									'&.item-exit': {
										opacity: 1,
										transform: 'scaleX(1)',
									},
									'&.item-exit-active': {
										opacity: 0,
										transform: 'scaleX(.5)',
										transition: 'all 200ms ease-in-out',
									},
								}}
								nodeRef={variant.nodeRef}
							>
								<Grid item md={3} sm={4} xs={12} ref={variant.nodeRef}>
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
													{adminT('variantDetails')} -{' '}
													{variantCheck(variant)?.id}
												</Paragraph>
												<H6 mb={0.5} fontSize={14}>
													{commonT('price')}: {variantCheck(variant)?.price}
												</H6>
												<Paragraph fontSize={14} color="grey.700">
													{commonT('discount')}:{' '}
													{variantCheck(variant)?.discount}
												</Paragraph>
												<Paragraph fontSize={14} color="grey.700">
													{commonT('status')}: {variantCheck(variant)?.status}
												</Paragraph>
												<Paragraph fontSize={14} color="grey.700">
													{commonT('stock')}: {variantCheck(variant)?.stock}
												</Paragraph>
												<br />
												{variant?.attribute_values?.length && (
													<Paragraph fontSize={16} color="grey.500">
														{adminT('attributes')}
													</Paragraph>
												)}
												{variant?.attribute_values?.map((attribute: any) => (
													<Paragraph
														color="grey.700"
														key={attribute.id + 'attribute'}
													>
														{attribute?.attribute?.name ||
															attribute?.attributeName ||
															attribute?.name}
														:{attribute?.value || attribute?.attributeValue}
													</Paragraph>
												))}
												<span>
													{/* {variantCheck(variant)?.attribute_values?} */}
												</span>
											</div>
											<FlexBox alignItems={'center'}>
												<ProductVariantForm
													refetch={refetch}
													initialValues={variantCheck(variant)}
													createPage={create}
													variantId={variant?.id}
													images={variant?.images}
													actionButtons={
														<Fragment>
															{!isAdmin ? (
																<Button
																	variant="contained"
																	size="small"
																	color="error"
																	onClick={(e) => deleteVariant(variant)}
																>
																	<Close />
																</Button>
															) : null}
														</Fragment>
													}
												/>
											</FlexBox>
										</FlexBox>
									</VariantCard>
								</Grid>
							</CSSTransition>
						)
					)}
				</TransitionGroup>
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
