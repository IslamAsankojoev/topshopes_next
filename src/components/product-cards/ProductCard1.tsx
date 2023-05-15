/* eslint-disable react-hooks/exhaustive-deps */
import { Favorite } from '@mui/icons-material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import {
	Box,
	Card,
	Chip,
	IconButton,
	Modal,
	Typography,
	styled,
} from '@mui/material'
import BazaarCard from 'src/components/BazaarCard'
import BazaarRating from 'src/components/BazaarRating'
import LazyImage from 'src/components/LazyImage'
import { Span } from 'src/components/Typography'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import Link from 'next/link'
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react'
import { IProductPreview } from 'src/shared/types/product.types'
import { v4 } from 'uuid'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { FlexBox } from '../flex-box'
import { getCurrency } from 'src/utils/getCurrency'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import ProductModal from '../products/ProductModal'
import { error, secondary } from 'src/theme/themeColors'

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
	bottom: '10px',
	left: '10px',
	paddingLeft: 3,
	paddingRight: 3,
	fontWeight: 600,
	fontSize: '10px',
	position: 'absolute',
	color: 'white',
	borderRadius: '6px',
}))

// const HoverIconWrapper = styled(Box)(({ theme }) => ({
// 	zIndex: 2,
// 	top: '7px',
// 	opacity: 0,
// 	right: '15px',
// 	display: 'flex',
// 	cursor: 'pointer',
// 	position: 'absolute',
// 	flexDirection: 'column',
// 	transition: 'all 0.3s ease-in-out',
// }))

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
		id = v4(),
		name,
		rating,
		shop,
		discount,
		discount_price,
		price,
		thumbnail,
		category,
	} = props.product

	const CurrentCard = useRef(null)
	const wishListItems = useTypedSelector((state) => state.wishStore?.items)
	const [parent, enableAnimate] = useAutoAnimate()
	const [open, setOpen] = useState(false)
	const isInWishList = useMemo(
		() => wishListItems.find((item: IProductPreview) => item?.id === id),
		[wishListItems]
	)

	const { toggleWish } = useActions()

	const toggleIsFavorite = () => {
		toggleWish(props.product)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleOpen = () => {
		setOpen(true)
	}

	return (
		<Box
			sx={{
				position: 'relative',
				padding: '.5rem',
				borderRadius: '10px',
				'@media (max-width: 600px)': {
					padding: '0',
				},
				'&:hover': {
					backgroundColor: 'white',
					boxShadow: '0px 1px 3px rgba(3, 0, 71, 0.09)',
				},
				'&:hover .product-card-img-wrapper': {
					boxShadow: 'none',
				},
			}}
		>
			{/* <StyledBazaarCard ref={CurrentCard} hoverEffect={props.hoverEffect}> */}
			<Card
				className="product-card-img-wrapper"
				sx={{
					transition: '0s',
					position: 'relative',
				}}
			>
				{!!discount && (
					<StyledChip color="error" size="small" label={`${discount}% off`} />
				)}
				<Link href={`/product/${id}`}>
					<a ref={parent}>
						<LazyImage
							src={thumbnail}
							width={150}
							height={200}
							layout="responsive"
							alt={name}
							objectFit="cover"
							objectPosition="top"
						/>
					</a>
				</Link>
				<FlexBox
					width="30px"
					alignItems="center"
					className="add-cart"
					flexDirection="column-reverse"
					justifyContent={'flex-start'}
					sx={{
						position: 'absolute',
						right: '15px',
						bottom: '10px',
						'@media (max-width: 600px)': {
							right: '15px',
							bottom: '10px',
						},
					}}
				>
					<IconButton
						onClick={toggleIsFavorite}
						color="inherit"
						sx={{
							backgroundColor: '#ffffff90',
							padding: '5px',
							'&:hover': {
								opacity: 1,
								backgroundColor: '#ffffff',
							},
							'& svg': {
								color: 'error',
							},
						}}
					>
						{!!isInWishList ? (
							<Favorite color="error" fontSize="small" />
						) : (
							<FavoriteBorder fontSize="small" color="error" />
						)}
					</IconButton>
				</FlexBox>
			</Card>
			{/* </StyledBazaarCard> */}
			<ContentWrapper className="product-wrapper">
				<FlexBox>
					<Box flex="1 1 0" minWidth="0px">
						<Link href={`/product/${id}`}>
							<a>
								<span style={{}}>
									<FlexBox alignItems="center" gap={1}>
										<Box
											sx={{
												color: 'grey.900',
												fontWeight: 1000,
												fontSize: '1.1rem',
											}}
										>
											{getCurrency(!!discount ? discount_price : price)}
										</Box>

										{!!discount && (
											<Box color="grey.600" fontWeight="600">
												<del>{getCurrency(!!discount && price)}</del>
											</Box>
										)}
									</FlexBox>
									<Typography
										className="title-concated"
										sx={{
											color: 'grey.600',
											display: 'block',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}
									>
										<Typography
											sx={{
												color: 'grey.900',
												display: 'inline-block',
												fontWeight: 600,
											}}
										>
											{`${shop?.name} / `}&nbsp;
										</Typography>
										{name}
									</Typography>
								</span>
							</a>
						</Link>

						<Box className="detail">
							{/* <Link href={`/shops/${shop?.id}`}>
								<a>
									<span
										style={{
											fontSize: '0.8rem',
											fontWeight: 400,
											color: 'grey',
											display: 'block',
										}}
									>
										
									</span>
								</a>
							</Link> */}
							{/* <Typography color="primary">{category}</Typography> */}

							{!props.hideRating ? (
								<BazaarRating
									value={Number(rating) || 0}
									color="warn"
									readOnly
								/>
							) : null}

							{props.showProductSize ? (
								<Span color="grey.600" mb={1} display="block">
									300ml
								</Span>
							) : null}
						</Box>
					</Box>
				</FlexBox>
			</ContentWrapper>
		</Box>
	)
}

export default ProductCard1

// const styleModalOverlay = {
// 	position: 'fixed' as 'fixed',
// 	zIndex: 9999,
// }

// const styleModal = {
// 	overflow: 'scroll',
// 	position: 'absolute' as 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: '100%',
// 	height: '100%',
// 	maxWidth: '100%',
// 	maxHeight: '100%',
// 	bgcolor: 'background.paper',
// 	boxShadow: 24,
// 	'&::-webkit-scrollbar': {
// 		display: 'none',
// 	},
// }
