import { Delete, KeyboardArrowDown } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Card,
	Divider,
	Grid,
	IconButton,
	MenuItem,
	TextField,
} from '@mui/material'
import { OrdersService } from 'api/services/orders/orders.service'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { H5, H6, Paragraph, Span } from 'components/Typography'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { IOrder, IOrderItem } from 'shared/types/order.types'

// list data
const products = [
	{
		price: '$250',
		published: true,
		id: '#6ed34Edf65d',
		category: 'Gadgets',
		name: 'Samsung Galaxy-M1',
		brand: '/assets/images/brands/samsung.png',
		image: '/assets/images/products/samsung.png',
	},
	{
		price: '$10',
		published: true,
		id: '#6ed34Edf65d',
		category: 'Grocery',
		name: 'Tomatto',
		brand: '/assets/images/brands/brokshire.png',
		image: '/assets/images/products/tomato.png',
	},
	{
		price: '$24',
		published: false,
		id: '#6ed34Edf65d',
		category: 'Beauty',
		name: 'Boston Round Cream Pack',
		brand: '/assets/images/brands/levis.png',
		image: '/assets/images/products/beauty-cream.png',
	},
]

const OrderDetails = () => {
	const {
		push,
		query: { id },
	} = useRouter()

	const {
		data: order,
		isLoading,
		refetch,
	}: { data: IOrder; isLoading: any; refetch: () => void } = useQuery(
		'get one order',
		() => OrdersService.get(id as string),
		{
			enabled: !!id,
		}
	)

	const { mutateAsync } = useMutation(
		'change status order',
		(value) => OrdersService.update(id as string, { status: value }),
		{
			onSuccess: () => {
				refetch()
			},
		}
	)

	const handleChangeStatus = (e) => {
		mutateAsync(e.target.value)
	}

	return !isLoading ? (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Card sx={{ p: 3 }}>
					<FlexBox alignItems="center" gap={4}>
						<Paragraph>
							<Span color="grey.600">Order ID:</Span> {id.slice(0, 8)}
						</Paragraph>

						<Paragraph>
							<Span color="grey.600">Placed on:</Span> 01 Jan, 2021
						</Paragraph>
					</FlexBox>

					<FlexBox gap={3} my={3} flexDirection={{ sm: 'row', xs: 'column' }}>
						{/* <TextField
							fullWidth
							color="info"
							size="medium"
							variant="outlined"
							label="Add Product"
							placeholder="Type product name"
						/> */}

						<TextField
							select
							fullWidth
							color="info"
							size="medium"
							label={order.status}
							inputProps={{
								IconComponent: () => (
									<KeyboardArrowDown sx={{ color: 'grey.600', mr: 1 }} />
								),
							}}
							value={order.status}
							onChange={handleChangeStatus}
						>
							<MenuItem value="PENDING">PENDING</MenuItem>
							<MenuItem value="PROCESSING">PROCESSING</MenuItem>
							<MenuItem value="DELIVERED">DELIVERED</MenuItem>
							<MenuItem value="CANCELLED">CANCELLED</MenuItem>
						</TextField>
					</FlexBox>

					{order.items.map((item: IOrderItem, index) => (
						<Box
							my={2}
							gap={2}
							key={index}
							sx={{
								display: 'grid',
								gridTemplateColumns: { md: '1fr 1fr', xs: '1fr' },
							}}
						>
							<FlexBox flexShrink={0} gap={1.5} alignItems="center">
								<Avatar
									src={item.product_image}
									sx={{ height: 64, width: 64, borderRadius: '8px' }}
								/>

								<Box>
									<H6 mb={1}>{item.product_name}</H6>

									<FlexBox alignItems="center" gap={1}>
										<Paragraph fontSize={14} color="grey.600">
											{item.product_price} x
										</Paragraph>

										<Box maxWidth={60}>
											<TextField defaultValue={3} type="number" fullWidth />
										</Box>
									</FlexBox>
								</Box>
							</FlexBox>

							<FlexBetween flexShrink={0}>
								<Paragraph color="grey.600">
									Product properties: Black, L
								</Paragraph>
								{/* 
								<IconButton>
									<Delete sx={{ color: 'grey.600', fontSize: 22 }} />
								</IconButton> */}
							</FlexBetween>
						</Box>
					))}
				</Card>
			</Grid>

			<Grid item md={6} xs={12}>
				<Card sx={{ px: 3, py: 4 }}>
					{/* <TextField
						rows={5}
						multiline
						fullWidth
						color="info"
						disabled
						variant="outlined"
						label="Shipping Address"
						defaultValue=
						sx={{ mb: 4 }}
					/> */}
					<Paragraph color="grey.900">
						<Span color="grey.600">Shipping Address:</Span>{' '}
						{order.shipping_address}
					</Paragraph>

					<Paragraph color="grey.900">
						<Span color="grey.600">Customer’s Note:</Span>{' '}
						{'Please deliver ASAP'}
					</Paragraph>

					{/* <Paragraph color="grey.900">
						<Span color="grey.600">Customer’s Note:</Span>{' '}
						{order.}
					</Paragraph> */}
				</Card>
			</Grid>

			<Grid item md={6} xs={12}>
				<Card sx={{ px: 3, py: 4 }}>
					<H5 mt={0} mb={2}>
						Total Summary
					</H5>

					<FlexBetween mb={1.5}>
						<Paragraph color="grey.600">Subtotal:</Paragraph>
						<H6>$335</H6>
					</FlexBetween>

					<FlexBetween mb={1.5}>
						<Paragraph color="grey.600">Shipping fee:</Paragraph>

						<FlexBox alignItems="center" gap={1} maxWidth={100}>
							<Paragraph>$</Paragraph>
							<TextField
								color="info"
								defaultValue={10}
								type="number"
								fullWidth
							/>
						</FlexBox>
					</FlexBetween>

					<FlexBetween mb={1.5}>
						<Paragraph color="grey.600">Discount:</Paragraph>

						<FlexBox alignItems="center" gap={1} maxWidth={100}>
							<Paragraph>$</Paragraph>
							{/* <TextField
								color="info"
								defaultValue={20}
								type="number"
								fullWidth
							/> */}
							{order.discount}
						</FlexBox>
					</FlexBetween>

					<Divider sx={{ my: 2 }} />

					<FlexBetween mb={2}>
						<H6>Total</H6>
						<H6>{order.total_price}c</H6>
					</FlexBetween>

					<Paragraph>Paid by Credit/Debit Card</Paragraph>
				</Card>
			</Grid>

			<Grid item xs={12}>
				<Button
					variant="contained"
					color="info"
					onClick={() => {
						push('/admin/orders')
					}}
				>
					Save Changes
				</Button>
			</Grid>
		</Grid>
	) : null
}

export default OrderDetails
