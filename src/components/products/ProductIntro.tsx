/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, Grid } from '@mui/material'
import BazaarButton from 'src/components/BazaarButton'
import BazaarRating from 'src/components/BazaarRating'
import LazyImage from 'src/components/LazyImage'
import { H1, H2, H6 } from 'src/components/Typography'
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
	const { brand, id, shop, name, variants, rating } = product

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
		addToCart({ ...product, variants: [selectedVariant] })
	}

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
							backgroundColor: 'transparent',
							boxShadow: 'none',
						}}
					>
						<div
							style={{
								width: '500px',
								height: '500px',
							}}
						>
							<LazyImage
								alt={name}
								layout="fill"
								loading="eager"
								objectFit="contain"
								src={selectedImage || variants[0]?.thumbnail}
							/>
						</div>
					</Card>
				</Grid>

				<Grid item md={6} xs={12} alignItems="center">
					<Box
						sx={{
							position: 'relative',
							padding: '1rem',
						}}
					>
						<H1 mb={2}>{name}</H1>
						<FlexBox alignItems="center" mb={2}>
							<Box>{t('brand')}:</Box>
							<H6 ml={1}>{brand?.name}</H6>
						</FlexBox>

						<FlexBox alignItems="center" mb={2}>
							<Box lineHeight="1">{t('rated')}:</Box>
							<Box mx={1} lineHeight="1">
								<BazaarRating
									color="warn"
									fontSize="1.25rem"
									value={Number(rating)}
									readOnly
								/>
							</Box>
							<H6 lineHeight="1">({rating})</H6>
						</FlexBox>
						<FlexBox alignItems="center" mb={2}>
							<Box>{t('soldBy')}:</Box>
							<Link href={`/shops/${shop?.id}`}>
								<a>
									<H6 ml={1}>{shop?.name}</H6>
								</a>
							</Link>
						</FlexBox>

						<Box mb={3}>
							{/* <H2 color="primary.main" mb={0.5} lineHeight="1">
								{Number(selectedVariant?.price || variants[0]?.price).toFixed(
									2
								)}
								c
							</H2> */}

							<FlexBox alignItems="center" gap={1} mt={0.5}>
								<H2 color="primary.main">
									{getCurrency(
										!!selectedVariant?.discount
											? selectedVariant?.discount_price
											: selectedVariant?.price
									)}
								</H2>

								{!!selectedVariant?.discount && (
									<H2 color="grey.600" fontWeight={600}>
										<del>
											{getCurrency(
												!!selectedVariant?.discount && selectedVariant?.price
											)}
										</del>
									</H2>
								)}
							</FlexBox>
						</Box>
						<FlexBox alignItems="center" mb={2}>
							<Box>{t('status')}:</Box>
							<H6
								ml={1}
								textTransform="capitalize"
								color={
									selectedVariant?.status === 'available' ? 'green' : 'red'
								}
							>
								{selectedVariant?.status
									? selectedVariant?.status === 'available'
										? t('available')
										: t('unavailable')
									: t('unavailable')}
							</H6>
						</FlexBox>
						<Variables
							product={product}
							setVariant={setSelectedVariant}
							setImage={setSelectedImage}
							variant={selectedVariant}
						/>
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
								{t('addCart')}
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
											kg: 'Удалить из избранных',
											kz: 'Удалить из избранных',
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
