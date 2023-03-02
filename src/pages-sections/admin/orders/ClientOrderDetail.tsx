import styled from '@emotion/styled'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
	Box,
	Button,
	Card,
	Divider,
	Typography,
} from '@mui/material'
import { OrdersService } from 'src/api/services/orders/orders.service'
import LazyImage from 'src/components/LazyImage'
import { H3, H6, Paragraph } from 'src/components/Typography'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { useQuery } from 'react-query'
import { IOrder, IOrderStatus } from 'src/shared/types/order.types'
import { dynamicLocalization } from 'src/utils/Translate/dynamicLocalization'

import { StatusWrapper } from '../StyledComponents'
import { useState } from 'react'
import { getCurrency } from 'src/utils/getCurrency'


const ClientOrderDetail = () => {
	const { t } = useTranslation('common')

	const {
		push,
		query: { id },
	} = useRouter()

	const {
		data: order,
		isLoading,
	}: { data: IOrder; isLoading: any; refetch: () => void } = useQuery(
		'get one order',
		() => OrdersService.get(id as string),
		{
			select: (data: IOrder) => data,
			enabled: !!id,
			onSuccess: (data) => {
				setOrderStatus(data.status)
			},
		}
	)

	const [orderStatus, setOrderStatus] = useState<IOrderStatus>(
		order?.status
	)

	return !isLoading ? (
		<FlexBox flexDirection="column" justifyContent="center" alignItems="center">
			<CardsWrapper>
				<Card
					sx={{
						p: 4,
						height: '100%',
						width: '330px!important',
					}}
				>
					<FlexBox
						mb={1.5}
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
					>
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
							{order?.product?.name} - {order?.quantity}
						</Paragraph>
						<H3>{getCurrency(order?.total_price)}</H3>
					</FlexBox>

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
						<StatusWrapper status={order.status}>{order.status}</StatusWrapper>
					</FlexBox>

					{order.delivered_at ? (
						<FlexBox justifyContent={'center'} sx={{ m: '15px 0 0' }}>
							<Typography
								p="0.5rem 1rem"
								textAlign="center"
								borderRadius="300px"
								color="primary.main"
								bgcolor="primary.light"
							>
								{dynamicLocalization({
									ru: 'Предполагаемая дата поставки',
									en: 'Estimated Delivery Date',
									kz: 'Болжалды жеткізу күні',
									kg: 'Болжолдуу жеткирүү датасы',
									tr: 'Tahmini Teslim Tarihi',
								})}
								{': '}
								<b>{format(new Date(order.delivered_at), 'dd.MM.yyyy')}</b>
							</Typography>
						</FlexBox>
					) : null}
				</Card>

				<Card
					sx={{
						p: 4,
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
					</FlexBox>
				</Card>
			</CardsWrapper>

			<Button
				sx={{ m: '20px 0' }}
				variant="contained"
				color="error"
				onClick={() => {
					push('/orders')
				}}
			>
				<ArrowBackIcon />
				{t('back')}
			</Button>
		</FlexBox>
	) : null
}

const CardsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-content: center;
	align-items: center;
	grid-gap: 20px;

	@media (max-width: 730px) {
		grid-template-columns: 1fr;
	}
`

export default ClientOrderDetail
