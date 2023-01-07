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
import {
	IProduct,
	IProductPreview,
	IProductVariant,
} from 'shared/types/product.types'
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
	product: IProductPreview
	hideRating?: boolean
	hoverEffect?: boolean
	style?: CSSProperties
	showProductSize?: boolean
}
// ========================================================

const ProductCard1: FC<ProductCard1Props> = (props) => {
	const {
		name,
		rating,
		shop,
		slug,
		discount,
		discount_price,
		price,
		thumbnail,
	} = props.product

	const CurrentCard = useRef(null)
	const [openModal, setOpenModal] = useState(false)
	const wishListItems = useTypedSelector((state) => state.wishStore?.items)
	const { toggleWish } = useActions()
	const inWishList = wishListItems.find((item) => item.slug === slug)

	const toggleIsFavorite = () => {
		toggleWish(props.product)
	}

	const toggleDialog = useCallback(() => setOpenModal((open) => !open), [])

	// const handleAddToCart = useCallback(() => addToCart(props.product), [])

	// const handleRemoveFromCart = useCallback(
	// 	() => removeFromCart(props.product),
	// 	[]
	// )

	return (
		<StyledBazaarCard ref={CurrentCard} hoverEffect={props.hoverEffect}>
			<ImageWrapper>
				{!!discount && (
					<StyledChip color="primary" size="small" label={`${discount}% off`} />
				)}

				<Link href={`/product/${slug}`}>
					<a>
						<LazyImage
							loader={() => thumbnail}
							src={thumbnail}
							width={0}
							height={0}
							layout="responsive"
							alt={name}
						/>
					</a>
				</Link>
			</ImageWrapper>

			<ProductViewDialog
				openDialog={openModal}
				handleCloseDialog={toggleDialog}
				product={props.product}
			/>

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
							<Box fontWeight="600" color="primary.main">
								{Number(price)?.toFixed()}
							</Box>

							{!!discount && (
								<Box color="grey.600" fontWeight="600">
									<del>{Number(discount_price)?.toFixed(2)}</del>
								</Box>
							)}
						</FlexBox>
					</Box>

					<FlexBox
						width="30px"
						alignItems="center"
						className="add-cart"
						flexDirection="column-reverse"
						justifyContent={'flex-start'}
					>
						{/* <IconButton onClick={toggleDialog}>
							<RemoveRedEye color="disabled" fontSize="small" />
						</IconButton> */}
						<IconButton onClick={toggleIsFavorite}>
							{inWishList ? (
								<Favorite color="primary" fontSize="small" />
							) : (
								<FavoriteBorder fontSize="small" color="disabled" />
							)}
						</IconButton>
					</FlexBox>
				</FlexBox>
			</ContentWrapper>
		</StyledBazaarCard>
	)
}

export default ProductCard1
