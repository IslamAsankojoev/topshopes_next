import { Grid } from '@mui/material'
import CheckoutNavLayout from 'components/layouts/CheckoutNavLayout'
import PaymentForm from 'pages-sections/payment/PaymentForm'
import PaymentSummary from 'pages-sections/payment/PaymentSummary'
import { NextPageAuth } from 'shared/types/auth.types'

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

Checkout.isOnlyUser = true

export default Checkout
