import { Box, Button, Card, Divider, Grid } from '@mui/material'
import { Container } from '@mui/system'
import SEO from 'src/components/SEO'
import { Span } from 'src/components/Typography'
import { FlexBetween } from 'src/components/flex-box'
import ShopLayout1 from 'src/components/layouts/ShopLayout1'
import ProductCard7 from 'src/components/product-cards/ProductCard7'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { ICartItem } from 'src/store/cart/cart.interface'
import { animated, useSpring } from 'react-spring'
import { getCurrency } from 'src/utils/getCurrency'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const Cart: NextPage = () => {
	const { t } = useTranslation()
	const { cart, total_price } = useTypedSelector((state) => state.cartStore)
	const animated_total_price = useSpring({
		number: total_price,
		from: { number: 0 },
	})
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
									<Span color="grey.600">{t('total')}:</Span>

									<Span fontSize={18} fontWeight={600} lineHeight="1">
										<animated.span>
											{animated_total_price.number.to((x) => getCurrency(x))}
										</animated.span>
									</Span>
								</FlexBetween>

								<Divider sx={{ mb: 2 }} />

								<Link href="/checkout-alternative" passHref>
									<Button variant="contained" color="primary" fullWidth>
										{t('checkoutNow')}
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
