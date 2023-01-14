import { Container, Grid } from '@mui/material'
import SEO from 'components/SEO'
import ShopLayout2 from 'components/layouts/ShopLayout2'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import CheckoutForm2 from 'pages-sections/checkout/CheckoutForm2'
import CheckoutSummary2 from 'pages-sections/checkout/CheckoutSummary2'
import React from 'react'
import { NextPageAuth } from 'shared/types/auth.types'

const CheckoutAlternative: NextPageAuth = () => {
	const { push } = useRouter()
	const token = Cookies.get('refresh')

	React.useEffect(() => {
		if (!token) {
			push('/login')
		}
	}, [])

	return (
		<ShopLayout2>
			<SEO title="Checkout alternative" />
			<Container sx={{ my: '1.5rem' }}>
				<Grid container spacing={3}>
					<Grid item lg={8} md={8} xs={12}>
						<CheckoutForm2 />
					</Grid>

					<Grid item lg={4} md={4} xs={12}>
						<CheckoutSummary2 />
					</Grid>
				</Grid>
			</Container>
		</ShopLayout2>
	)
}

CheckoutAlternative.isOnlyUser = true

export default CheckoutAlternative
