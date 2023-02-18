import { Container, Grid } from '@mui/material'
import SEO from 'src/components/SEO'
import ShopLayout2 from 'src/components/layouts/ShopLayout2'
import Cookies from 'js-cookie'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import CheckoutForm2 from 'src/pages-sections/checkout/CheckoutForm2'
import CheckoutSummary2 from 'src/pages-sections/checkout/CheckoutSummary2'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { useEffect } from 'react'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'payment',
			])),
		},
	}
}

const CheckoutAlternative: NextPageAuth = () => {
	const { push, asPath } = useRouter()
	const token = Cookies.get('refresh')

	useEffect(() => {
		if (!token) {
			push(`/login/?redirect=${asPath}`)
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

CheckoutAlternative.isOnlyAuth = true

export default CheckoutAlternative
