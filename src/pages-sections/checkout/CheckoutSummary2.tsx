import { Box, Divider } from '@mui/material'
import { Paragraph, Span } from 'components/Typography'
import { FlexBetween } from 'components/flex-box'
import { useTypedSelector } from 'hooks/useTypedSelector'
import React, { FC } from 'react'

const CheckoutSummary2: FC = () => {
	const { cart, total_items, total_price } = useTypedSelector(
		(state) => state.cartStore
	)
	return (
		<Box>
			<Paragraph color="secondary.900" fontWeight={700} mb={2}>
				Your order
			</Paragraph>

			{cart?.map((item) => (
				<FlexBetween mb={1.5} key={item.name}>
					<Paragraph>
						<Span fontWeight="700" fontSize="14px">
							{item.qty}
						</Span>{' '}
						x {item.name} - (
						{item.variants[0].attribute_values
							.map((item) => item.value)
							.join(', ')}
						)
					</Paragraph>
					<Paragraph>
						${Number(item.variants[0].overall_price).toFixed(2)} x {item.qty}
					</Paragraph>
				</FlexBetween>
			))}

			<Divider sx={{ borderColor: 'grey.300', my: 3 }} />

			<FlexBetween mb={0.5}>
				<Paragraph color="grey.600">Subtotal:</Paragraph>
				<Paragraph fontWeight="700">{total_price.toFixed(2)}</Paragraph>
			</FlexBetween>

			<FlexBetween mb={0.5}>
				<Paragraph color="grey.600">Shipping:</Paragraph>
				<Paragraph fontWeight="700">-</Paragraph>
			</FlexBetween>

			{/* <FlexBetween mb={0.5}>
				<Paragraph color="grey.600">Tax:</Paragraph>
				<Paragraph fontWeight="700">{(40).toFixed(2)}</Paragraph>
			</FlexBetween> */}
			{/* 
			<FlexBetween mb={3}>
				<Paragraph color="grey.600">Discount:</Paragraph>
				<Paragraph fontWeight="700">-</Paragraph>
			</FlexBetween> */}

			<Divider sx={{ borderColor: 'grey.300', mb: 1 }} />

			<FlexBetween fontWeight="700" mb={1}>
				<Paragraph>Total:</Paragraph>
				<Paragraph fontWeight="700">${total_price.toFixed(2)}</Paragraph>
			</FlexBetween>
		</Box>
	)
}

const cartList = [
	{ name: 'iPhone 12', quantity: 1, price: 999 },
	{ name: 'iPhone 12 pro', quantity: 1, price: 1199 },
	{ name: 'iPhone 12 pro max', quantity: 1, price: 1299 },
]

export default CheckoutSummary2
