import { Close } from '@mui/icons-material'
import {
	Box,
	Dialog,
	DialogContent,
	Divider,
	Grid,
	IconButton,
	styled,
} from '@mui/material'
import BazaarButton from 'src/components/BazaarButton'
import BazaarImage from 'src/components/BazaarImage'
import BazaarRating from 'src/components/BazaarRating'
import { H1, H2, H6, Paragraph } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { useAppContext } from 'src/contexts/AppContext'
import { FC } from 'react'
import { IProductPreview } from 'src/shared/types/product.types'

export const ContentWrapper = styled(Box)(({ theme }) => ({
	'& .carousel:hover': {
		cursor: 'pointer',
		'& .carousel__back-button': { opacity: 1, left: 10 },
		'& .carousel__next-button': { opacity: 1, right: 10 },
	},
	'& .carousel__next-button, & .carousel__back-button': {
		opacity: 0,
		boxShadow: 'none',
		transition: 'all 0.3s',
		background: 'transparent',
		color: theme.palette.primary.main,
		':disabled': { color: theme.palette.grey[500] },
		':hover': {
			color: theme.palette.primary.main,
			backgroundColor: 'transparent',
		},
	},
	'& .carousel__back-button': { left: 0 },
	'& .carousel__next-button': { right: 0 },
}))

// =====================================================
type ProductViewDialogProps = {
	product: IProductPreview
	openDialog: boolean
	handleCloseDialog: () => void
}
// =====================================================

const ProductViewDialog: FC<ProductViewDialogProps> = (props) => {
	const { product, openDialog, handleCloseDialog } = props

	const { state, dispatch } = useAppContext()

	// const handleCartAmountChange = useCallback(
	// 	(amount) => () => {
	// 		dispatch({
	// 			type: 'CHANGE_CART_AMOUNT',
	// 			payload: {
	// 				...product,
	// 				qty: amount,
	// 				name: product.title,
	// 				imgUrl: product.imgGroup[0],
	// 			},
	// 		})
	// 	},
	// 	[dispatch, product]
	// )

	return (
		<Dialog
			open={openDialog}
			maxWidth={false}
			onClose={handleCloseDialog}
			sx={{ zIndex: 1501 }}
		>
			<DialogContent sx={{ maxWidth: 900, width: '100%' }}>
				<ContentWrapper>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							{/* <Carousel
								totalSlides={
									[variant?.thumbnail, variant?.images?.map((el) => el.image)]
										?.length
								}
								visibleSlides={1}
							>
								{[
									variant?.thumbnail,
									variant?.images?.map((el) => el.image),
								]?.map((item: string, index: number) => (
									
								))}
							</Carousel> */}
							<BazaarImage
								src={product?.thumbnail}
								sx={{
									mx: 'auto',
									width: '100%',
									objectFit: 'contain',
									height: { sm: 400, xs: 250 },
								}}
							/>
						</Grid>

						<Grid item md={6} xs={12} alignSelf="center">
							<H2>{product?.name}</H2>

							<Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
								CATEGORY: Cosmetic
							</Paragraph>

							<H1 color="primary.main">{Number(product?.price).toFixed(2)}c</H1>

							<FlexBox alignItems="center" gap={1}>
								<BazaarRating
									color="warn"
									fontSize="1.25rem"
									value={4}
									readOnly
								/>
								<H6 lineHeight="1">(50)</H6>
							</FlexBox>

							<Paragraph my={2}>
								Sed egestas, ante et vulputate volutpat, eros pede semper est,
								vitae luctus metus libero eu augue. Morbi purus liberpuro ate
								vol faucibus adipiscing.
							</Paragraph>

							<Divider sx={{ mb: 2 }} />

							<BazaarButton
								color="primary"
								variant="contained"
								// onClick={handleAddToCart}
								sx={{ px: '1.75rem', height: 40 }}
							>
								Add to Cart
							</BazaarButton>
							{/* {!cartItem?.qty ? (


								<BazaarButton
									size="large"
									color="primary"
									variant="contained"
									// onClick={}
									sx={{ height: 45 }}
								>
									Add to Cart
								</BazaarButton>
							) : (
								<FlexBox alignItems="center">
									<BazaarButton
										size="small"
										color="primary"
										variant="outlined"
										sx={{ p: '.6rem', height: 45 }}
										// onClick={}
									>
										<Remove fontSize="small" />
									</BazaarButton>

									<H3 fontWeight="600" mx={2.5}>
										{cartItem?.qty.toString().padStart(2, '0')}
									</H3>

								

									<BazaarButton
										size="small"
										color="primary"
										variant="outlined"
										sx={{ p: '.6rem', height: 45 }}
										// onClick={}
									>
										<Add fontSize="small" />
									</BazaarButton>
								</FlexBox>
							)} */}
						</Grid>
					</Grid>
				</ContentWrapper>

				<IconButton
					sx={{ position: 'absolute', top: 3, right: 3 }}
					onClick={handleCloseDialog}
				>
					<Close fontSize="small" color="secondary" />
				</IconButton>
			</DialogContent>
		</Dialog>
	)
}

export default ProductViewDialog
