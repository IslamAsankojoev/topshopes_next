import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
	Box,
	Button,
	Card,
	Divider,
	FormControl,
	Grid,
	IconButton,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import { OrdersService } from 'api/services-admin/orders/order.service'
import { ShopService, ShopsService } from 'api/services/shop/shop.service'
import LazyImage from 'components/LazyImage'
import { H3, H6, Paragraph, Span } from 'components/Typography'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { IOrder, IOrderItem, IOrderStatus } from 'shared/types/order.types'

import { StatusWrapper } from '../StyledComponents'

import { statusDisabled, statuses } from './OrderRow'

const OrderDetail: React.FC<{ isAdmin?: boolean }> = ({ isAdmin }) => {
	const { t } = useTranslation('common')

	const getOrder = isAdmin ? OrdersService.get : ShopsService.getShopOrder
	const patchOrder = isAdmin
		? OrdersService.update
		: ShopsService.updateShopOrder

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
		() => getOrder(id as string),
		{
			select: (data: IOrder) => data,
			enabled: !!id,
			onSuccess: (data) => {
				setOrderStatus(data.status)
			},
		}
	)

	const [orderStatus, setOrderStatus] = React.useState<IOrderStatus>(
		order?.status
	)

	const { mutateAsync: mutateStatus } = useMutation(
		'order status update',
		(status: IOrderStatus) => patchOrder(order?.id, { status }),
		{
			onSuccess: async (data) => {
				toast.success('Order status updated')
				setOrderStatus(data.status)
				await refetch()
			},
		}
	)

	const changeStatus = (selected) => {
		mutateStatus(selected)
	}

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
									<FormControl variant="outlined">
										<Select
											className="order-status-admin"
											sx={{
												'& .MuiSelect-select': {
													padding: '0px!important',
													fontSize: '1rem',
													fontWeight: 400,
													color: 'text.primary',
													backgroundColor: 'background.paper',
													border: '0px solid!important',
													borderColor: 'divider',
													'& fieldset': {
														display: 'none!important',
													},
												},
											}}
											disableUnderline={true}
											value={orderStatus}
											label=""
											onChange={(e) => {
												changeStatus(e.target.value)
											}}
										>
											{statuses.map((status) => (
												<MenuItem
													disabled={statusDisabled(status, isAdmin)}
													value={status?.name}
												>
													<StatusWrapper status={status?.name}>
														{status.label}
													</StatusWrapper>
												</MenuItem>
											))}
										</Select>
									</FormControl>
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
										<Paragraph color="grey.900">{t('phone')}:</Paragraph>
										<H6>{order?.address?.phone}</H6>
									</FlexBetween>
									<Divider />
									<FlexBetween my={1.5}>
										<Paragraph color="grey.900">{t('country')}:</Paragraph>
										<H6>{order?.address?.country}</H6>
									</FlexBetween>
									<Divider />
									<FlexBetween my={1.5}>
										<Paragraph color="grey.900">{t('city')}:</Paragraph>
										<H6>{order?.address?.city}</H6>
									</FlexBetween>
									<Divider />
									<FlexBetween my={1.5}>
										<Paragraph color="grey.900">{t('street')}:</Paragraph>
										<H6>{order?.address?.street}</H6>
									</FlexBetween>
									<Divider />
									<FlexBetween my={1.5}>
										<Paragraph color="grey.900">{t('date')}:</Paragraph>
										<H6> {new Date(order?.created_at).toLocaleString()}</H6>
									</FlexBetween>
									<FlexBetween my={1.5}>
										<Paragraph color="grey.900">Delivered at:</Paragraph>
										<H6> {new Date(order?.delivered_at).toLocaleString()}</H6>
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
						{t('back')}
					</Button>
				</Grid>
			</FlexBox>
		</div>
	) : null
}

export default OrderDetail
