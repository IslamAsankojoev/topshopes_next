import { Grid } from '@mui/material'
import CheckoutNavLayout from 'src/components/layouts/CheckoutNavLayout'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PaymentForm from 'src/pages-sections/payment/PaymentForm'
import PaymentSummary from 'src/pages-sections/payment/PaymentSummary'
import { NextPageAuth } from 'src/shared/types/auth.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const Checkout: NextPageAuth = () => {
	return (
		<CheckoutNavLayout>
			<Grid container flexWrap="wrap-reverse" spacing={3}>
				<Grid item lg={8} md={8} xs={12}>
					<PaymentForm />
				</Grid>

				<Grid item lg={4} md={4} xs={12}>
					<PaymentSummary />
				</Grid>
			</Grid>
		</CheckoutNavLayout>
	)
}

Checkout.isOnlyAuth = true

export default Checkout
