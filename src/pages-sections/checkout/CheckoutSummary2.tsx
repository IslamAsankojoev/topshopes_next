import { Box, Divider } from '@mui/material'
import { Paragraph, Span } from 'components/Typography'
import { FlexBetween } from 'components/flex-box'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'

const CheckoutSummary2: FC = () => {
	const { t } = useTranslation('common')
	const { t: paymentT } = useTranslation('payment')

	const { cart, total_items, total_price } = useTypedSelector(
		(state) => state.cartStore
	)
	return (
		<Box>
			<Paragraph color="secondary.900" fontWeight={700} mb={2}>
				{t('yourOrder')}
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
						${Number(item.variants[0].price).toFixed(2)}c x {item.qty}
					</Paragraph>
				</FlexBetween>
			))}

			<Divider sx={{ borderColor: 'grey.300', mb: 2 }} />

			<FlexBetween mb={0.5}>
				<Paragraph color="grey.600">{t('subtotal')}:</Paragraph>
				<Paragraph fontWeight="700">{total_price.toFixed(2)}</Paragraph>
			</FlexBetween>

			<FlexBetween mb={0.5}>
				<Paragraph color="grey.600">{t('shipping')}:</Paragraph>
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
				<Paragraph>{t('total')}:</Paragraph>
				<Paragraph fontWeight="700">${total_price.toFixed(2)}</Paragraph>
			</FlexBetween>

			<Divider sx={{ borderColor: 'grey.300', mb: 2 }} />

			<FlexBetween fontWeight="700" mt={5}>
				<Paragraph>{paymentT('Instruction')}</Paragraph>
			</FlexBetween>
			<Divider sx={{ borderColor: 'grey.300', mb: 1 }} />

			<FlexBetween mb={2}>
				<Paragraph>{paymentT('step1')}</Paragraph>
			</FlexBetween>
			<Divider sx={{ borderColor: 'grey.300', mb: 1 }} />

			<FlexBetween mb={2}>
				<Paragraph>{paymentT('step2')}</Paragraph>
			</FlexBetween>
			<Divider sx={{ borderColor: 'grey.300', mb: 1 }} />

			<FlexBetween mb={2}>
				<Paragraph>{paymentT('step3')}</Paragraph>
			</FlexBetween>
			<Divider sx={{ borderColor: 'grey.300', mb: 1 }} />

			<FlexBetween mb={2}>
				<Paragraph>{paymentT('done')}</Paragraph>
			</FlexBetween>
		</Box>
	)
}

export default CheckoutSummary2
