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
	const {
		brand,
		category,
		id,
		published,
		rating,
		reviews,
		shop,
		slug,
		title,
		unit,
		variants,
	} = product

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

	const { addToCart, removeFromCart } = useActions()

	// const handleImageClick = (ind: number) => () => {
	// 	setSelectedImage(ind)
	// }

	// const openImageViewer = useCallback((index) => {
	//   setCurrentImage(index);
	//   setIsViewerOpen(true);
	// }, []);

	// const closeImageViewer = () => {
	//   setCurrentImage(0);
	//   setIsViewerOpen(false);
	// };

	// const handleCartAmountChange = useCallback(
	// 	(amount) => () => {
	// 		dispatch({
	// 			type: 'CHANGE_CART_AMOUNT',
	// 			payload: {
	// 				price,
	// 				qty: amount,
	// 				name: title,
	// 				imgUrl: imgGroup[0],
	// 				id: id || routerId,
	// 			},
	// 		})
	// 	},
	// 	[]
	// )

	const handleAddToCart = useCallback(() => {
		// addToCart({})
	}, [])

	const handleRemoveFromCart = useCallback(() => {
		// removeFromCart({})
	}, [])

	return (
		<Box width="100%">
			<Grid container spacing={3} justifyContent="space-around">
				<Grid item md={6} xs={12} alignItems="center">
					<FlexBox justifyContent="center" mb={6}>
						<LazyImage
							width={300}
							alt={title}
							height={300}
							loading="eager"
							objectFit="contain"
							src={selectedImage}
							// onClick={() => openImageViewer(imgGroup.indexOf(imgGroup[selectedImage]))}
						/>
						{/* {isViewerOpen && (
              <ImageViewer
                src={imgGroup}
                onClose={closeImageViewer}
                currentIndex={currentImage}
                backgroundStyle={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  zIndex: 1501,
                }}
              />
            )} */}
					</FlexBox>

					{/* <FlexBox overflow="auto">
						{imgGroup?.map((url, ind) => (
							<FlexRowCenter
								key={ind}
								width={64}
								height={64}
								minWidth={64}
								bgcolor="white"
								border="1px solid"
								borderRadius="10px"
								ml={ind === 0 ? 'auto' : 0}
								style={{ cursor: 'pointer' }}
								onClick={handleImageClick(ind)}
								mr={ind === imgGroup?.length - 1 ? 'auto' : '10px'}
								borderColor={
									selectedImage === ind ? 'primary.main' : 'grey.400'
								}
							>
								<BazaarAvatar src={url} variant="square" height={40} />
							</FlexRowCenter>
						))}
					</FlexBox> */}
				</Grid>

				<Grid item md={6} xs={12} alignItems="center">
					<H1 mb={2}>{title}</H1>

					<FlexBox alignItems="center" mb={2}>
						<Box>Brand:</Box>
						<H6 ml={1}>Xiaomi</H6>
					</FlexBox>

					<FlexBox alignItems="center" mb={2}>
						<Box lineHeight="1">Rated:</Box>
						<Box mx={1} lineHeight="1">
							<BazaarRating
								color="warn"
								fontSize="1.25rem"
								value={4}
								readOnly
							/>
						</Box>
						<H6 lineHeight="1">(50)</H6>
					</FlexBox>

					<Box mb={3}>
						<H2 color="primary.main" mb={0.5} lineHeight="1">
							{Number(selectedVariant?.price || variants[0]?.price).toFixed(2)}
						</H2>
					</Box>

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
							!selectedVariant ||
							selectedVariant.status === 'unavailable' ||
							selectedVariant.status === 'coming_soon'
						}
						variant="contained"
						onClick={handleAddToCart}
						sx={{ mb: 4.5, px: '1.75rem', height: 40, color: 'white' }}
					>
						Add to Cart
					</BazaarButton>
					{/* ) : (
						<FlexBox alignItems="center" mb={4.5}>
							<BazaarButton
								size="small"
								sx={{ p: 1 }}
								color="primary"
								variant="outlined"
								onClick={handleRemoveFromCart}
							>
								<Remove fontSize="small" />
							</BazaarButton>

							<H3 fontWeight="600" mx={2.5}>
								{cartItem?.qty.toString().padStart(2, '0')}
							</H3>

							<BazaarButton
								size="small"
								sx={{ p: 1 }}
								color="primary"
								variant="outlined"
								onClick={handleAddToCart}
							>
								<Add fontSize="small" />
							</BazaarButton>
						</FlexBox>
					)} */}

					<FlexBox alignItems="center" mb={2}>
						<Box>Sold By:</Box>
						<Link href="/shops/fdfdsa">
							<a>
								<H6 ml={1}>Mobile Store</H6>
							</a>
						</Link>
					</FlexBox>
				</Grid>
			</Grid>
		</Box>
	)
}

export default ProductIntro
