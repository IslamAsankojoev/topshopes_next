import { Divider } from '@mui/material'
import Card1 from 'components/Card1'
import { FlexBetween } from 'components/flex-box'
import { Paragraph } from 'components/Typography'
import { useTypedSelector } from 'hooks/useTypedSelector'
import React from 'react'

const PaymentSummary = () => {
	const { total_price, cart, total_items } = useTypedSelector(
		(state) => state.cartStore
	)

	return (
		<Card1>
			<FlexBetween mb={1}>
				<Paragraph color="grey.600">Subtotal:</Paragraph>
				<Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
					{total_price.toFixed(2)}c
				</Paragraph>
			</FlexBetween>

			<FlexBetween mb={1}>
				<Paragraph color="grey.600">Shipping:</Paragraph>
				<Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
					-
				</Paragraph>
			</FlexBetween>

			<FlexBetween mb={1}>
				<Paragraph color="grey.600">Tax:</Paragraph>
				<Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
					$40
				</Paragraph>
			</FlexBetween>

			<FlexBetween mb={2}>
				<Paragraph color="grey.600">Discount:</Paragraph>
				<Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
					-
				</Paragraph>
			</FlexBetween>

			<Divider sx={{ mb: 2 }} />

			<Paragraph
				fontSize={25}
				fontWeight={600}
				lineHeight={1}
				textAlign="right"
			>
				$2610.00
			</Paragraph>
		</Card1>
	)
}

export default PaymentSummary
