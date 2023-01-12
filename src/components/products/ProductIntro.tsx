/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Remove } from '@mui/icons-material'
import { Box, Grid } from '@mui/material'
import BazaarAvatar from 'components/BazaarAvatar'
import BazaarButton from 'components/BazaarButton'
import BazaarRating from 'components/BazaarRating'
import LazyImage from 'components/LazyImage'
import { H1, H2, H3, H6 } from 'components/Typography'
import { CartItem, useAppContext } from 'contexts/AppContext'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { IProduct, IProductVariant } from 'shared/types/product.types'
import { ICartItem } from 'store/cart/cart.interface'

// import ImageViewer from "react-simple-image-viewer";
import { FlexBox, FlexRowCenter } from '../flex-box'

import Variables from './Variables'

// ================================================================
type ProductIntroProps = {
	product: IProduct
}
// ================================================================

const ProductIntro: React.FC<ProductIntroProps> = ({ product }) => {
	const { brand, id, shop, name, variants, rating } = product

	const router = useRouter()
	const routerId = router.query.id as string

	const [selectedImage, setSelectedImage] = useState(variants[0].thumbnail)
	const [selectedVariant, setSelectedVariant] = useState<IProductVariant>(
		variants[0]
	)

	// const [isViewerOpen, setIsViewerOpen] = useState(false)
	// const [currentImage, setCurrentImage] = useState(0)

	const cartList: ICartItem[] = useTypedSelector(
		(state) => state.cartStore.cart
	)
	const cartItem = cartList.find(
		(item) => item.id === id || item.id === routerId
	)

	const { addToCart } = useActions()

	const handleAddToCart = () => {
		addToCart({ ...product, variants: [selectedVariant] })
	}

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
					<FlexBox
						justifyContent="center"
						alignItems="center"
						mb={6}
						sx={{
							position: 'relative',
						}}
					>
						<div
							style={{
								width: '300px',
								height: '300px',
							}}
						>
							<LazyImage
								alt={name}
								layout="fill"
								loading="eager"
								objectFit="contain"
								src={selectedImage || variants[0].thumbnail}
							/>
						</div>
					</FlexBox>
				</Grid>

				<Grid item md={6} xs={12} alignItems="center">
					<H1 mb={2}>{name}</H1>

					<FlexBox alignItems="center" mb={2}>
						<Box>Brand:</Box>
						<H6 ml={1}>{brand.name}</H6>
					</FlexBox>

					<FlexBox alignItems="center" mb={2}>
						<Box lineHeight="1">Rated:</Box>
						<Box mx={1} lineHeight="1">
							<BazaarRating
								color="warn"
								fontSize="1.25rem"
								value={rating}
								readOnly
							/>
						</Box>
						<H6 lineHeight="1">(50)</H6>
					</FlexBox>

					<Box mb={3}>
						<H2 color="primary.main" mb={0.5} lineHeight="1">
							{Number(
								selectedVariant?.overall_price || variants[0]?.overall_price
							).toFixed(2)}
						</H2>
					</Box>

					<FlexBox alignItems="center" mb={2}>
						<Box>Status:</Box>
						<H6
							ml={1}
							textTransform="capitalize"
							color={selectedVariant?.status === 'available' ? 'green' : 'red'}
						>
							{selectedVariant?.status || 'unavailable'}
						</H6>
					</FlexBox>

					<Variables
						product={product}
						setVariant={setSelectedVariant}
						setImage={setSelectedImage}
						variant={selectedVariant}
					/>

					{/* {!cartItem?.qty ? ( */}
					<BazaarButton
						color="primary"
						disabled={
							!selectedVariant || selectedVariant.status === 'unavailable'
						}
						variant="contained"
						onClick={handleAddToCart}
						sx={{ mb: 4.5, px: '1.75rem', height: 40, color: 'white' }}
					>
						Add to Cart
					</BazaarButton>

					<FlexBox alignItems="center" mb={2}>
						<Box>Sold By:</Box>
						<Link href={`/shops/${shop.slug}`}>
							<a>
								<H6 ml={1}>{shop.name}</H6>
							</a>
						</Link>
					</FlexBox>
				</Grid>
			</Grid>
		</Box>
	)
}

export default ProductIntro
