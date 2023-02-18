import { Grid } from '@mui/material'
import SEO from 'src/components/SEO'
import CheckoutNavLayout from 'src/components/layouts/CheckoutNavLayout'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CheckoutForm from 'src/pages-sections/checkout/CheckoutForm'
import CheckoutSummary from 'src/pages-sections/checkout/CheckoutSummary'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const Checkout: NextPage = () => {
	return (
		<CheckoutNavLayout>
			<SEO title="Checkout" />
			<Grid container flexWrap="wrap-reverse" spacing={3}>
				<Grid item lg={8} md={8} xs={12}>
					<CheckoutForm />
				</Grid>

				<Grid item lg={4} md={4} xs={12}>
					<CheckoutSummary />
				</Grid>
			</Grid>
		</CheckoutNavLayout>
	)
}

export default Checkout
