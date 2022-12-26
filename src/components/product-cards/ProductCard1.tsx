/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Favorite, Remove, RemoveRedEye } from '@mui/icons-material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import { Box, Button, Chip, IconButton, styled } from '@mui/material'
import BazaarCard from 'components/BazaarCard'
import BazaarRating from 'components/BazaarRating'
import LazyImage from 'components/LazyImage'
import ProductViewDialog from 'components/products/ProductViewDialog'
import { H3, Span } from 'components/Typography'
import { CartItem, useAppContext } from 'contexts/AppContext'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import Link from 'next/link'
import { CSSProperties, FC, Fragment, useCallback, useState } from 'react'
import { FlexBox } from '../flex-box'
import { IProduct } from 'shared/types/product.types'
import { ICartItem } from 'store/cart/cart.interface'

const StyledBazaarCard = styled(BazaarCard)(() => ({
	height: '100%',
	margin: 'auto',
	display: 'flex',
	overflow: 'hidden',
	borderRadius: '8px',
	position: 'relative',
	flexDirection: 'column',
	justifyContent: 'space-between',
	transition: 'all 250ms ease-in-out',
	':hover': { '& .hover-box': { opacity: 1 } },
}))

const ImageWrapper = styled(Box)(({ theme }) => ({
	textAlign: 'center',
	position: 'relative',
	display: 'inline-block',
	[theme.breakpoints.down('sm')]: { display: 'block' },
}))

const StyledChip = styled(Chip)(() => ({
	zIndex: 1,
	top: '10px',
	left: '10px',
	paddingLeft: 3,
	paddingRight: 3,
	fontWeight: 600,
	fontSize: '10px',
	position: 'absolute',
}))

const HoverIconWrapper = styled(Box)(({ theme }) => ({
	zIndex: 2,
	top: '7px',
	opacity: 0,
	right: '15px',
	display: 'flex',
	cursor: 'pointer',
	position: 'absolute',
	flexDirection: 'column',
	transition: 'all 0.3s ease-in-out',
}))

const ContentWrapper = styled(Box)(() => ({
	padding: '1rem',
	'& .title, & .categories': {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	},
}))

// ========================================================
type ProductCard1Props = {
	product: IProduct
	hideRating?: boolean
	hoverEffect?: boolean
	style?: CSSProperties
	showProductSize?: boolean
}
// ========================================================

const ProductCard1: FC<ProductCard1Props> = (props) => {
	const {
		id,
		title,
		price,
		rating,
		thumbnail: imgUrl,
		discount,
	} = props.product

	const [openModal, setOpenModal] = useState(false)
	const wishListItems = useTypedSelector((state) => state.wishStore.items)
	const cartItems = useTypedSelector((state) => state.cartStore.cart)
	const { toggleWish, addToCart, removeFromCart } = useActions()
	const inWishList = wishListItems.some((item) => item.id === id)

	const cartItem = cartItems.find((item) => item.id === id)

	const toggleIsFavorite = () => {
		toggleWish({ id, title, price, imgUrl, rating, discount })
	}

	const toggleDialog = useCallback(() => setOpenModal((open) => !open), [])

	// const handleCartAmountChange = useCallback(
	// 	(product) => () =>
	// 		dispatch({ type: 'CHANGE_CART_AMOUNT', payload: product }),
	// 	[]
	// )

	// const handleAddToCart = useCallback(
	// 	(product) => () => dispatch({ type: 'ADD_TO_CART', payload: product }),
	// 	[]
	// )

	// const handleRemoveFromCart = useCallback(
	// 	(product) => () => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
	// 	[]
	// )

	const handleAddToCart = useCallback(
		(product: ICartItem) => () => addToCart(product),
		[]
	)

	const handleRemoveFromCart = useCallback(
		(product: ICartItem) => () => removeFromCart(product),
		[]
	)

	return (
		<StyledBazaarCard hoverEffect={props.hoverEffect}>
			<ImageWrapper>
				{!!discount && (
					<StyledChip color="primary" size="small" label={`${discount}% off`} />
				)}

				<HoverIconWrapper className="hover-box">
					<IconButton onClick={toggleDialog}>
						<RemoveRedEye color="disabled" fontSize="small" />
					</IconButton>
					<IconButton onClick={toggleIsFavorite}>
						{inWishList ? (
							<Favorite color="primary" fontSize="small" />
						) : (
							<FavoriteBorder fontSize="small" color="disabled" />
						)}
					</IconButton>
				</HoverIconWrapper>

				<Link href={`/product/${id}`}>
					<a>
						<LazyImage
							loader={() => imgUrl}
							src={imgUrl}
							width={0}
							height={0}
							layout="responsive"
							alt={title}
						/>
					</a>
				</Link>
			</ImageWrapper>

			<ProductViewDialog
				openDialog={openModal}
				handleCloseDialog={toggleDialog}
				product={{ title, price, id, imgGroup: [imgUrl, imgUrl] }}
			/>

			<ContentWrapper>
				<FlexBox>
					<Box flex="1 1 0" minWidth="0px" mr={1}>
						<Link href={`/product/${id}`}>
							<a>
								<H3
									mb={1}
									title={title}
									fontSize="14px"
									fontWeight="600"
									className="title"
									color="text.secondary"
								>
									{title}
								</H3>
							</a>
						</Link>

						{!props.hideRating ? (
							<BazaarRating value={rating || 0} color="warn" readOnly />
						) : null}

						{props.showProductSize ? (
							<Span color="grey.600" mb={1} display="block">
								300ml
							</Span>
						) : null}

						<FlexBox alignItems="center" gap={1} mt={0.5}>
							<Box fontWeight="600" color="primary.main">
								${(+price - (+price * discount) / 100).toFixed(2)}
							</Box>

							{!!discount && (
								<Box color="grey.600" fontWeight="600">
									<del>{Number(price)?.toFixed(2)}</del>
								</Box>
							)}
						</FlexBox>
					</Box>

					<FlexBox
						width="30px"
						alignItems="center"
						className="add-cart"
						flexDirection="column-reverse"
						justifyContent={!!cartItem?.qty ? 'space-between' : 'flex-start'}
					>
						<Button
							color="primary"
							variant="outlined"
							sx={{ padding: '3px' }}
							onClick={handleAddToCart({
								id,
								title,
								price,
								imgUrl,
							})}
						>
							<Add fontSize="small" />
						</Button>

						{!!cartItem?.qty && (
							<Fragment>
								<Box color="text.primary" fontWeight="600">
									{cartItem?.qty}
								</Box>

								<Button
									color="primary"
									variant="outlined"
									sx={{ padding: '3px' }}
									onClick={handleRemoveFromCart({
										id,
										title,
										price,
										imgUrl,
									})}
								>
									<Remove fontSize="small" />
								</Button>
							</Fragment>
						)}
					</FlexBox>
				</FlexBox>
			</ContentWrapper>
		</StyledBazaarCard>
	)
}

export default ProductCard1
