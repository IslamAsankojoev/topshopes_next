/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Close, Favorite, Remove, RemoveRedEye } from '@mui/icons-material'
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
import {
	CSSProperties,
	FC,
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { FlexBox } from '../flex-box'
import { IProduct, IProductVariant } from 'shared/types/product.types'
import { ICartItem } from 'store/cart/cart.interface'
import Variables from 'components/products/Variables'
import BazaarButton from 'components/BazaarButton'

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
	color: 'white',
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
		name,
		brand,
		category,
		rating,
		reviews,
		shop,
		slug,
		unit,
		variants,
		published,
	} = props.product

	const CurrentCard = useRef(null)
	const [openModal, setOpenModal] = useState(false)
	const wishListItems = useTypedSelector((state) => state.wishStore?.items)
	const cartItems = useTypedSelector((state) => state.cartStore.cart)
	const { toggleWish, addToCart, removeFromCart } = useActions()
	const inWishList = wishListItems.find((item) => item.id === id)

	const cartItem = cartItems.find((item) => item.id === id)
	// const [selectedImage, setSelectedImage] = useState<string>(
	// 	props.product?.thumbnail
	// )
	// const [selectedVariant, setSelectedVariant] = useState<IProductVariant>(
	// 	variants[0]
	// )
	const [openVariants, setOpenVariants] = useState<boolean>(false)

	const toggleIsFavorite = () => {
		toggleWish({ id, title: name, variants, rating })
	}

	const toggleDialog = useCallback(() => setOpenModal((open) => !open), [])

	const handleAddToCart = useCallback(() => addToCart(props.product), [])

	const handleRemoveFromCart = useCallback(
		() => removeFromCart(props.product),
		[]
	)

	return (
		<StyledBazaarCard ref={CurrentCard} hoverEffect={props.hoverEffect}>
			<ImageWrapper>
				{/* {!!variants[0]?.discount && (
					<StyledChip
						color="primary"
						size="small"
						label={`${variants[0]?.discount}% off`}
					/>
				)} */}

				<Link href={`/product/${slug}`}>
					<a>
						<LazyImage
							// loader={() => selectedImage}
							// src={selectedImage}
							loader={() =>
								'https://static.wikia.nocookie.net/bleach/images/8/8d/572Kenpachi_profile.png/revision/latest?cb=20210417222326&path-prefix=en'
							}
							src={
								'https://static.wikia.nocookie.net/bleach/images/8/8d/572Kenpachi_profile.png/revision/latest?cb=20210417222326&path-prefix=en'
							}
							width={0}
							height={0}
							layout="responsive"
							alt={name}
						/>
					</a>
				</Link>
			</ImageWrapper>

			{/* <ProductViewDialog
				openDialog={openModal}
				handleCloseDialog={toggleDialog}
				product={{
					title: name,
					price: selectedVariant?.price,
					id,
					imgGroup: [variants[0]?.thumbnail, variants[0]?.images],
					variants,
				}}
				variant={selectedVariant}
				setVariant={setSelectedVariant}
				setImage={setSelectedImage}
				image={selectedImage}
			/> */}

			<ContentWrapper>
				<FlexBox>
					<Box flex="1 1 0" minWidth="0px" mr={1}>
						<Link href={`/product/${slug}`}>
							<a>
								<span
									style={{
										fontSize: '1.1rem',
										fontWeight: 600,
										color: '#000',
										display: 'block',
									}}
								>
									{name}
								</span>
							</a>
						</Link>

						<Link href={`/shops/${shop.slug}`}>
							<a>
								<span
									style={{
										fontSize: '0.8rem',
										fontWeight: 400,
										color: 'grey',
										display: 'block',
									}}
								>
									{shop.name}
								</span>
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
							{/* <Box fontWeight="600" color="primary.main">
								{Number(
									+selectedVariant?.price || +variants[0]?.price
								)?.toFixed()}
							</Box>

							{!!selectedVariant?.discount && (
								<Box color="grey.600" fontWeight="600">
									<del>
										{Number(
											selectedVariant?.price || variants[0]?.price
										)?.toFixed(2)}
									</del>
								</Box>
							)} */}
						</FlexBox>
					</Box>

					<FlexBox
						width="30px"
						alignItems="center"
						className="add-cart"
						flexDirection="column-reverse"
						justifyContent={!!cartItem?.qty ? 'space-between' : 'flex-start'}
					>
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
					</FlexBox>
				</FlexBox>
				{
					<Box
						sx={{
							// padding: '10px',
							position: 'absolute',
							bottom: '0',
							left: '0',
							width: '100%',
							// height: '50%',
							backgroundColor: 'rgba(255,255,255,1)',
							zIndex: '10',
							display: 'flex',
							opacity: openVariants ? '1' : '0',
							transform: openVariants ? 'translateY(0)' : 'translateY(100%)',
							transition: 'all 0.2s ease',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '-2px 0px 14px -4px rgba(0,0,0,0.300)',
						}}
					></Box>
				}
			</ContentWrapper>
		</StyledBazaarCard>
	)
}

export default ProductCard1
