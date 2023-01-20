import { Delete, KeyboardArrowDown } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
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
	Typography,
} from '@mui/material'
import { OrdersService } from 'api/services/orders/orders.service'
import { H3, H4, H5, H6, Paragraph, Span } from 'components/Typography'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { IOrder, IOrderItem } from 'shared/types/order.types'
import LazyImage from 'components/LazyImage'
import { StatusWrapper } from '../StyledComponents'

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
		'get one vendor order',
		() => OrdersService.get(id as string),
		{
			select: (data: IOrder) => data,
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

	return !isLoading ? (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<FlexBox
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<Grid item md={6} xs={12}>
					<Grid container>
						<Grid
							item
							xs={12}
							sm={6}
							sx={{
								p: 1,
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Card
								sx={{
									px: 4,
									py: 4,
									width: '330px!important',
								}}
							>
								<Grid mb={1.5} justifyContent="center" alignItems="center">
									<Box
										sx={{
											my: 3,
											justifyContent: 'center',
											display: 'flex',
										}}
									>
										<LazyImage
											src={order?.product_variant?.thumbnail}
											width={250}
											height={250}
											sx={{ borderRadius: 8 }}
										/>
									</Box>
									<Paragraph fontSize="16px">
										{order?.product?.name} - {order?.quantity}шт
									</Paragraph>
									<H3>{order?.total_price} с</H3>
								</Grid>
								<FlexBox justifyContent="space-between" alignItems="center">
									<Paragraph
										sx={{
											display: 'inline-block',
											fontWeight: 700,
											fontSize: 18,
											color: '#0b8911',
										}}
									>
										{id?.slice(0, 8)}
									</Paragraph>
									<StatusWrapper status={order?.status}>
										{order?.status}
									</StatusWrapper>
								</FlexBox>
							</Card>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
							sx={{
								p: 1,
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Card
								sx={{
									px: 4,
									py: 4,
									height: '100%',
									width: '330px!important',
								}}
							>
								<FlexBox
									sx={{
										height: '100%',
										justifyContent: 'space-evenly',
										flexDirection: 'column',
									}}
								>
									<FlexBetween my={1.5}>
										<Paragraph color="grey.900">Phone:</Paragraph>
										<H6>{order?.address?.phone}</H6>
									</FlexBetween>
									<Divider />
									<FlexBetween my={1.5}>
										<Paragraph color="grey.900">Country:</Paragraph>
										<H6>{order?.address?.country}</H6>
									</FlexBetween>
									<Divider />
									<FlexBetween my={1.5}>
										<Paragraph color="grey.900">City:</Paragraph>
										<H6>{order?.address?.city}</H6>
									</FlexBetween>
									<Divider />
									<FlexBetween my={1.5}>
										<Paragraph color="grey.900">Street:</Paragraph>
										<H6>{order?.address?.street}</H6>
									</FlexBetween>
									<Divider />
									<FlexBetween my={1.5}>
										<Paragraph color="grey.900">Date time:</Paragraph>
										<H6> {new Date(order?.created_at).toLocaleString()}</H6>
									</FlexBetween>
								</FlexBox>
							</Card>
						</Grid>
					</Grid>
				</Grid>

				<Grid
					item
					xs={12}
					sx={{
						my: 4,
					}}
				>
					<Button
						variant="contained"
						color="error"
						onClick={() => {
							push('/admin/orders')
						}}
					>
						<ArrowBackIcon />
						Back to Orders
					</Button>
				</Grid>
			</FlexBox>
		</div>
	) : null
}

export default OrderDetails
