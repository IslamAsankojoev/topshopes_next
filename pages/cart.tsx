import { Box, Button, Card, Divider, Grid } from '@mui/material'
import { Container } from '@mui/system'
import { FlexBetween } from 'components/flex-box'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import ProductCard7 from 'components/product-cards/ProductCard7'
import SEO from 'components/SEO'
import { Span } from 'components/Typography'
import { CartItem, useAppContext } from 'contexts/AppContext'
import { NextPage } from 'next'
import Link from 'next/link'

const Cart: NextPage = () => {
	const { state } = useAppContext()
	const cartList: CartItem[] = state.cart

	const getTotalPrice = () => {
		return cartList.reduce((accum, item) => accum + item.price * item.qty, 0)
	}

	return (
		<ShopLayout1>
			<Container sx={{ my: 4 }}>
				<Box mb={3} display={{ sm: 'block', xs: 'none' }}>
					<SEO title="Cart" />
					<Grid container spacing={3}>
						<Grid item md={8} xs={12}>
							{cartList?.map((item) => (
								<ProductCard7 key={item.id} {...item} />
							))}
						</Grid>

						<Grid item md={4} xs={12}>
							<Card sx={{ padding: 3 }}>
								<FlexBetween mb={2}>
									<Span color="grey.600">Total:</Span>

									<Span fontSize={18} fontWeight={600} lineHeight="1">
										${getTotalPrice().toFixed(2)}
									</Span>
								</FlexBetween>

								<Divider sx={{ mb: 2 }} />

								<Button
									variant="outlined"
									color="primary"
									fullWidth
									sx={{ my: 2 }}
								>
									Calculate Shipping
								</Button>

								<Link href="/checkout-alternative" passHref>
									<Button variant="contained" color="primary" fullWidth>
										Checkout Now
									</Button>
								</Link>
							</Card>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</ShopLayout1>
	)
}

const stateList = [
	{ value: 'new-york', label: 'New York' },
	{ value: 'chicago', label: 'Chicago' },
]

export default Cart
