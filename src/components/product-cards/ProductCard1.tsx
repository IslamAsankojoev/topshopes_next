/* eslint-disable react-hooks/exhaustive-deps */
import { Favorite } from '@mui/icons-material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import { Box, Chip, IconButton, Modal, Typography, styled } from '@mui/material'
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
		<>
			<StyledBazaarCard ref={CurrentCard} hoverEffect={props.hoverEffect}>
				<ImageWrapper>
					{!!discount && (
						<StyledChip
							color="primary"
							size="small"
							label={`${discount}% off`}
						/>
					)}
					<Link href={`/product/${id}`}>
						<a ref={parent}>
							<LazyImage
								src={thumbnail}
								width={200}
								height={200}
								layout="responsive"
								alt={name}
								objectFit="cover"
								objectPosition="top"
							/>
						</a>
					</Link>
				</ImageWrapper>

				<ContentWrapper>
					<FlexBox>
						<Box flex="1 1 0" minWidth="0px" mr={1}>
							<Link href={`/product/${id}`}>
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

							<Link href={`/shops/${shop?.id}`}>
								<a>
									<span
										style={{
											fontSize: '0.8rem',
											fontWeight: 400,
											color: 'grey',
											display: 'block',
										}}
									>
										{shop?.name}
									</span>
								</a>
							</Link>
							<Typography color="primary">{category}</Typography>

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

							<FlexBox alignItems="center" gap={1} mt={0.5}>
								<Box fontWeight="600" color="primary.main">
									{getCurrency(!!discount ? discount_price : price)}
								</Box>

								{!!discount && (
									<Box color="grey.600" fontWeight="600">
										<del>{getCurrency(!!discount && price)}</del>
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
							{/* <IconButton onClick={handleOpen}>
								<AddIcon color="primary" fontSize="small" />
							</IconButton> */}
							<IconButton onClick={toggleIsFavorite}>
								{!!isInWishList ? (
									<Favorite color="primary" fontSize="small" />
								) : (
									<FavoriteBorder fontSize="small" color="disabled" />
								)}
							</IconButton>
						</FlexBox>
					</FlexBox>
				</ContentWrapper>
			</StyledBazaarCard>
			<Modal
				open={open}
				onClose={handleClose}
				sx={styleModalOverlay}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<>
					<Box sx={styleModal}>
						{open && <ProductModal id={id} />}
						<IconButton
							sx={{
								position: 'fixed',
								top: 5,
								right: 5,
							}}
						>
							<CloseIcon onClick={handleClose} />
						</IconButton>
					</Box>
				</>
			</Modal>
		</>
	)
}

export default ProductCard1

const styleModalOverlay = {
	position: 'fixed' as 'fixed',
	zIndex: 9999,
}

const styleModal = {
	overflow: 'scroll',
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
	height: '100%',
	maxWidth: '100%',
	maxHeight: '100%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	'&::-webkit-scrollbar': {
		display: 'none',
	},
}
