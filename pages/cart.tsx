import { Box, Button, Card, Divider, Grid } from '@mui/material'
import { Container } from '@mui/system'
import { FlexBetween } from 'components/flex-box'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import ProductCard7 from 'components/product-cards/ProductCard7'
import SEO from 'components/SEO'
import { Span } from 'components/Typography'
import { CartItem, useAppContext } from 'contexts/AppContext'

import countryList from 'data/countryList'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { NextPage } from 'next'
import Link from 'next/link'
import { ICartItem } from 'store/cart/cart.interface'

const Cart: NextPage = () => {
	const { cart, total_items, total_price } = useTypedSelector(
		(state) => state.cartStore
	)
	const cartList: ICartItem[] = cart

	return (
		<ShopLayout1>
			<Container sx={{ my: 4 }}>
				<Box mb={3} display={{ sm: 'block' }}>
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
										${total_price.toFixed(2)}
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
