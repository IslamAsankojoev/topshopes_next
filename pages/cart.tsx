import { Box, Button, Card, Divider, Grid } from '@mui/material'
import { Container } from '@mui/system'
import { FlexBetween } from 'components/flex-box'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import ProductCard7 from 'components/product-cards/ProductCard7'
import SEO from 'components/SEO'
import { Span } from 'components/Typography'
import { CartItem, useAppContext } from 'contexts/AppContext'
<<<<<<< HEAD
import countryList from 'data/countryList'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
=======
>>>>>>> iska
import { NextPage } from 'next'
import Link from 'next/link'
import { ICartItem } from 'store/cart/cart.interface'

const Cart: NextPage = () => {
	const { cart, total_items, total_price } = useTypedSelector(
		(state) => state.cartStore
	)
	const cartList: ICartItem[] = cart

	return (
<<<<<<< HEAD
		<CheckoutNavLayout>
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

						<FlexBox alignItems="center" columnGap={1} mb={2}>
							<Span fontWeight="600">Additional Comments</Span>

							<Span
								p="6px 10px"
								fontSize={12}
								lineHeight="1"
								borderRadius="3px"
								color="primary.main"
								bgcolor="primary.light"
							>
								Note
							</Span>
						</FlexBox>

						<TextField
							variant="outlined"
							rows={6}
							fullWidth
							multiline
							sx={{ mb: 2 }}
						/>

						<Divider sx={{ mb: 2 }} />

						<TextField
							fullWidth
							size="small"
							label="Voucher"
							variant="outlined"
							placeholder="Voucher"
						/>

						<Button
							variant="outlined"
							color="primary"
							fullWidth
							sx={{ mt: 2, mb: 4 }}
						>
							Apply Voucher
						</Button>

						<Divider sx={{ mb: 2 }} />

						<Span fontWeight={600} mb={2} display="block">
							Shipping Estimates
						</Span>

						<Autocomplete
							fullWidth
							sx={{ mb: 2 }}
							options={countryList}
							// getOptionLabel={(option) => option.label}
							renderInput={(params) => (
								<TextField
									{...params}
									size="small"
									label="Country"
									variant="outlined"
									placeholder="Select Country"
								/>
							)}
						/>

						<TextField
							select
							fullWidth
							size="small"
							label="State"
							variant="outlined"
							placeholder="Select State"
							defaultValue="new-york"
						>
							{stateList?.map((item) => (
								<MenuItem value={item.value} key={item.label}>
									{item.label}
								</MenuItem>
=======
		<ShopLayout1>
			<Container sx={{ my: 4 }}>
				<Box mb={3} display={{ sm: 'block', xs: 'none' }}>
					<SEO title="Cart" />
					<Grid container spacing={3}>
						<Grid item md={8} xs={12}>
							{cartList?.map((item) => (
								<ProductCard7 key={item.id} {...item} />
>>>>>>> iska
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
