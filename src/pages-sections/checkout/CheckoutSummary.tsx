import { Button, Divider, TextField, Typography } from '@mui/material'
import Card1 from 'src/components/Card1'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { FC } from 'react'

const CheckoutSummary: FC = () => {
	const { total_price, cart, total_items } = useTypedSelector(
		(state) => state.cartStore
	)

	return (
		<Card1>
			<FlexBetween mb={1}>
				<Typography color="grey.600">Subtotal:</Typography>
				<FlexBox alignItems="flex-end">
					<Typography fontSize="18px" fontWeight="600" lineHeight="1">
						{total_price.toFixed(2)}c
					</Typography>
				</FlexBox>
			</FlexBetween>
			<FlexBetween mb={1}>
				<Typography color="grey.600">Shipping:</Typography>
				<FlexBox alignItems="flex-end">
					<Typography fontSize="18px" fontWeight="600" lineHeight="1">
						-
					</Typography>
				</FlexBox>
			</FlexBetween>
			<FlexBetween mb={1}>
				<Typography color="grey.600">Tax:</Typography>
				<FlexBox alignItems="flex-end">
					<Typography fontSize="18px" fontWeight="600" lineHeight="1">
						$40.
					</Typography>
				</FlexBox>
			</FlexBetween>
			<FlexBetween mb={2}>
				<Typography color="grey.600">Discount:</Typography>
				<FlexBox alignItems="flex-end">
					<Typography fontSize="18px" fontWeight="600" lineHeight="1">
						-
					</Typography>
				</FlexBox>
			</FlexBetween>

			<Divider sx={{ mb: '1rem' }} />

			<Typography
				fontSize="25px"
				fontWeight="600"
				lineHeight="1"
				textAlign="right"
				mb={3}
			>
				$2610.00
			</Typography>

			<TextField
				placeholder="Voucher"
				variant="outlined"
				size="small"
				fullWidth
			/>
			<Button
				variant="outlined"
				color="primary"
				fullWidth
				sx={{ mt: '1rem', mb: '30px' }}
			>
				Apply Voucher
			</Button>
		</Card1>
	)
}

export default CheckoutSummary
