import { Container, Grid } from '@mui/material'
import ShopLayout1 from 'src/components/layouts/ShopLayout1'
import { FC } from 'react'
import Navigations from './Navigations'

/**
 *  Used in:
 *  1. wish-list page
 *  2. address and address-details page
 *  3. orders and order-details page
 *  4. payment-methods and payment-method-details page
 *  5. profile and edit profile page
 *  6. support-tickets page
 */

const CustomerDashboardLayout: FC = ({ children }) => (
	<ShopLayout1>
		<Container sx={{ my: '2rem' }}>
			<Grid
				container
				spacing={3}
				sx={{
					'@media (max-width: 600px)': {
						flexDirection: 'column-reverse',
					},
				}}
			>
				<Grid
					item
					lg={3}
					xs={12}
					// sx={{ display: { xs: "none", sm: "none", md: "block" } }}
				>
					<Navigations />
				</Grid>

				<Grid item lg={9} xs={12}>
					{children}
				</Grid>
			</Grid>
		</Container>
	</ShopLayout1>
)

export default CustomerDashboardLayout
