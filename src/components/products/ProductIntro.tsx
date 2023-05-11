/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, Grid, Typography } from '@mui/material'
import BazaarButton from 'src/components/BazaarButton'
import BazaarRating from 'src/components/BazaarRating'
import LazyImage from 'src/components/LazyImage'
import { H1, H2, H3, H4, H6 } from 'src/components/Typography'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import {
	IProduct,
	IProductPreview,
	IProductVariant,
} from 'src/shared/types/product.types'

import { FlexBox } from '../flex-box'

import Variables from './Variables'
import { localize } from 'src/utils/Translate/localize'
import Favorite from '@mui/icons-material/Favorite'
import { getCurrency } from 'src/utils/getCurrency'

type ProductIntroProps = {
	product: IProduct
}

const ProductIntro: FC<ProductIntroProps> = ({ product }) => {
	const { t } = useTranslation('common')
	const { brand, id, shop, name, variants, rating, sold_quantity, reviews } =
		product

	const router = useRouter()
	const routerId = router.query.id as string

	const [selectedImage, setSelectedImage] = useState<string>(
		variants[0].thumbnail
	)
	const [selectedVariant, setSelectedVariant] = useState<IProductVariant>(
		variants[0]
	)

	const wishlist: IProductPreview[] = useTypedSelector(
		(state) => state.wishStore.items
	)
	const [isInWishlist, setIsInWishlist] = useState<boolean>(false)

	const { addToCart, toggleWish } = useActions()
	const handleAddToCart = () => {
		addToCart({
			...product,
			variants: [
				{
					...selectedVariant,
					price: !!selectedVariant.discount
						? selectedVariant.discount_price
						: selectedVariant.price,
				},
			],
		})
	}

	const displayVariant = !!selectedVariant ? selectedVariant : variants[0]

	const toggleWishItem = () => {
		toggleWish({
			id: product.id,
			category: product.category,
			thumbnail: product.variants[0].thumbnail,
			name: product.name,
			description: product.description,
			price: product.variants[0].price,
			discount: product.variants[0].discount + '',
			shop: product.shop,
			discount_price: product.variants[0].discount_price,
			is_published: product.is_published,
			rating: product.rating,
			slug: product.slug,
			created_at: product.created_at,
			nodeRef: product.variants[0].nodeRef,
		})
	}

	useEffect(() => {
		setIsInWishlist(
			wishlist.find((item) => item?.id === id || item?.id === routerId) as any
		)
	}, [wishlist])

	return (
		<Box width="100%">
			<Grid container spacing={3} justifyContent="space-around">
				<Grid
					item
					md={6}
					xs={12}
					alignItems="center"
					justifyContent="center"
					display="flex"
				>
					<Card
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							position: 'relative',
							backgroundColor: 'white',
							// boxShadow: 'none',
						}}
					>
						<div
							style={{
								width: '460px',
								height: '600px',
							}}
						>
							<LazyImage
								alt={name}
								layout="fill"
								loading="eager"
								objectFit="cover"
								style={{
									// boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)',
									borderRadius: '0.5rem',
									transition: 'all 0.3s ease-in-out',
								}}
								src={displayVariant.thumbnail}
							/>
						</div>
					</Card>
				</Grid>

				<Grid item md={6} xs={12} alignItems="center" justifyContent="center">
					<Box
						sx={{
							height: '100%',
							position: 'relative',
							padding: '1rem',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						<H1 mb={1}>{name}</H1>
						<FlexBox
							alignItems="flex-start"
							mb={2}
							flexDirection="column"
							gap={0.5}
						>
							<Box>
								{t('soldBy')}:{' '}
								<b>
									<Link href={`/shops/${shop?.id}`}>
										<a>{shop?.name}</a>
									</Link>
								</b>
							</Box>
							<Box>
								{t('brand')}: <b>{' ' + brand?.name}</b>
							</Box>
							{!!reviews?.length && (
								<FlexBox>
									{t('rated')}:{' '}
									<BazaarRating
										color="warn"
										fontSize="1.25rem"
										value={Number(rating)}
										readOnly
									/>
									({rating})
								</FlexBox>
							)}
							<Box>
								{!!sold_quantity &&
									localize({
										ru: 'Продано',
										tr: 'Satıldı',
										en: 'Sold',
									}) +
										': ' +
										sold_quantity}
							</Box>
						</FlexBox>

						<Variables
							product={product}
							setVariant={setSelectedVariant}
							setImage={setSelectedImage}
							variant={selectedVariant}
						/>
						<Box mt={2}>
							{/* <H2 color="primary.main" mb={0.5} lineHeight="1">
								{Number(selectedVariant?.price || variants[0]?.price).toFixed(
									2
								)}
								c
							</H2> */}
							<FlexBox alignItems="center" mb={1}>
								{/* <Box>{t('status')}:</Box> */}
							</FlexBox>

							<FlexBox alignItems="center" gap={1} mt={0.5}>
								<H2 color="primary.main">
									{getCurrency(
										!!displayVariant?.discount
											? displayVariant?.discount_price
											: displayVariant?.price
									)}
								</H2>
								{!!selectedVariant?.discount && (
									<>
										<H2 color="grey.400" fontWeight={400}>
											<del>
												{getCurrency(
													!!displayVariant?.discount && displayVariant?.price
												)}
											</del>
										</H2>
									</>
								)}
								&#8212;
								<H4
									textTransform="capitalize"
									fontWeight={900}
									color={
										selectedVariant?.status === 'available'
											? 'success.900'
											: 'error.main'
									}
								>
									{selectedVariant?.status
										? selectedVariant?.status === 'available'
											? t('available')
											: t('unavailable')
										: t('unavailable')}
								</H4>
							</FlexBox>
						</Box>
						<br />
						<FlexBox
							gap={2}
							sx={{
								'@media (max-width: 600px)': {
									flexDirection: 'column',
								},
							}}
						>
							<BazaarButton
								color="secondary"
								disabled={
									!selectedVariant || selectedVariant?.status === 'unavailable'
								}
								variant="contained"
								onClick={handleAddToCart}
								sx={{
									p: '.7rem 1rem',
								}}
							>
								{localize({
									ru: 'В корзину',
									tr: 'Sepete ekle',
									en: 'Add to cart',
								})}
							</BazaarButton>
							<BazaarButton
								color="error"
								variant={isInWishlist ? 'contained' : 'outlined'}
								onClick={toggleWishItem}
								sx={{
									p: '.7rem 1rem',
									border: '1px solid #CA475F!important',
								}}
							>
								<Favorite fontSize="small" sx={{ mr: 1 }} />
								{isInWishlist
									? localize({
											ru: 'Удалить из избранных',
											tr: 'Favorilerden kaldır',
											en: 'Remove from favorites',
									  })
									: t('addToWishlist')}
							</BazaarButton>
						</FlexBox>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}

export default ProductIntro
