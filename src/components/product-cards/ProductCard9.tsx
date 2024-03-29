import { Add, Remove } from '@mui/icons-material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import {
	Box,
	Button,
	Card,
	Chip,
	Grid,
	IconButton,
	Rating,
	styled,
} from '@mui/material'
import Image from 'src/components/BazaarImage'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import { H5, Span } from 'src/components/Typography'
import { CartItem, useAppContext } from 'src/contexts/AppContext'
import Link from 'next/link'
import { FC, useCallback } from 'react'
import { IProduct, IProductPreview } from 'src/shared/types/product.types'

// styled components
const Wrapper = styled(Card)(() => ({
	width: '100%',
	overflow: 'hidden',
	position: 'relative',
	marginBottom: '1.25rem',
}))

// ===========================================================
// type ProductCard9Props = {
// 	className?: string
// 	style?: any
// 	imgUrl: string
// 	title: string
// 	price: number
// 	off?: number
// 	rating?: number
// 	id: string
// 	subcategories?: Array<{ title: string; url: string }>
// 	[key: string]: unknown
// }
// ===========================================================

const ProductCard9: FC<{ product: IProductPreview }> = ({ product }) => {
	const { category, rating, shop, slug, name, id } = product

	const { state, dispatch } = useAppContext()

	// const handleCartAmountChange = useCallback(
	// 	(amount) => () => {
	// 		dispatch({
	// 			type: 'CHANGE_CART_AMOUNT',
	// 			payload: { name: title, qty: amount, price: +price, imgUrl, id },
	// 		})
	// 	},
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// 	[]
	// )

	return (
		<Wrapper>
			<IconButton
				size="small"
				sx={{ position: 'absolute', top: 15, right: 15 }}
			>
				<FavoriteBorder fontSize="small" />
			</IconButton>

			<Grid container spacing={1}>
				<Grid item sm={3} xs={12}>
					<Box position="relative">
						{/* {!!off && (
							<Chip
								size="small"
								color="primary"
								label={`${off}% off`}
								sx={{
									top: 15,
									left: 15,
									px: '5px',
									fontSize: 10,
									fontWeight: 600,
									position: 'absolute',
								}}
							/>
						)} */}

						{/* <Image src={imgUrl} alt={title} width="100%" /> */}
					</Box>
				</Grid>

				<Grid item sm={9} xs={12}>
					<FlexBox
						flexDirection="column"
						justifyContent="center"
						height="100%"
						p={2}
					>
						<Link href={`/product/${id}`}>
							<a>
								<H5 fontWeight="600" my="0.5rem">
									{name}
								</H5>
							</a>
						</Link>

						<Rating value={rating || 0} color="warn" readOnly />

						<FlexBox mt={1} mb={2} alignItems="center">
							<H5 fontWeight={600} color="primary.main" mr={1}>
								{/* ${(+price - (+price * off) / 100).toFixed(2)} */}
							</H5>

							{/* {off && (
								<Span fontWeight="600" color="grey.600">
									<del>${Number(price)?.toFixed(2)}</del>
								</Span>
							)} */}
						</FlexBox>

						<FlexBox>
							{/* {!cartItem?.qty && (
								<Button
									color="primary"
									variant="contained"
									sx={{ height: 32 }}
									// onClick={handleCartAmountChange(1)}
								>
									Add To Cart
								</Button>
							)}

							{!!cartItem?.qty && (
								<FlexBetween>
									<Button
										color="primary"
										variant="outlined"
										sx={{ padding: '5px' }}
										// onClick={handleCartAmountChange(cartItem.qty + 1)}
									>
										<Add fontSize="small" />
									</Button>

									<H5 fontWeight="600" fontSize="15px" mx={1.5}>
										{cartItem.qty}
									</H5>

									<Button
										color="primary"
										variant="outlined"
										sx={{ padding: '5px' }}
										// onClick={handleCartAmountChange(cartItem.qty - 1)}
									>
										<Remove fontSize="small" />
									</Button>
								</FlexBetween>
							)} */}
						</FlexBox>
					</FlexBox>
				</Grid>
			</Grid>
		</Wrapper>
	)
}

// ProductCard9.defaultProps = {
//   title:
//     "Apple iPhone 5 Unlocked 16GB 8MP Used Cell-Phone-16gbIOS Used Refurbished 100%Factory Used",
//   imgUrl: "/assets/images/products/macbook.png",
//   off: 50,
//   price: 450,
//   rating: 0,
//   subcategories: [
//     { title: "Bike", url: "/#" },
//     { title: "Ducati", url: "/#" },
//     { title: "Motors", url: "/#" },
//   ],
// };

export default ProductCard9
