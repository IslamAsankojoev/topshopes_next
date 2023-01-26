/* eslint-disable react-hooks/exhaustive-deps */
import balance from '/public/assets/images/payment-methods/balance.webp'
import elsom from '/public/assets/images/payment-methods/elsom.webp'
import mbank from '/public/assets/images/payment-methods/mbank.webp'
import oDengi from '/public/assets/images/payment-methods/odengi.webp'
import visa from '/public/assets/images/payment-methods/visa.png'
import styled from '@emotion/styled'
import { DeleteOutline } from '@mui/icons-material'
import { Alert, Avatar, Button, Card, Grid, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { instance } from 'api/interceptor'
import { AddressesService } from 'api/services/addresses/addresses.service'
import { ProfilePaymentService } from 'api/services/payment/ProfilePayment.service'
import Card1 from 'components/Card1'
import { H6, Paragraph } from 'components/Typography'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { IPaymentType } from 'shared/types/order.types'
import { ResponseList } from 'shared/types/response.types'
import { IAddress } from 'shared/types/user.types'
import { ICartItem } from 'store/cart/cart.interface'
import { common } from 'utils/Translate/common'
import { dynamicLocalization } from 'utils/Translate/dynamicLocalization'

import EditAddressForm from './EditAddressForm'
import NewAddressForm from './NewAddressForm'
import PaymentDialog from './PaymentDialog'

// ====================================================================
// date types
type DateProps = { label: string; value: string }
type HeadingProps = { number: number; title: string }
// ====================================================================

const Heading: FC<HeadingProps> = ({ number, title }) => {
	return (
		<FlexBox gap={1.5} alignItems="center" mb={3.5}>
			<Avatar
				sx={{
					width: 32,
					height: 32,
					color: 'primary.text',
					backgroundColor: 'primary.main',
				}}
			>
				{number}
			</Avatar>
			<Typography fontSize="20px">{title}</Typography>
		</FlexBox>
	)
}

const CheckoutForm2: FC = () => {
	const { t } = useTranslation('common')

	// states
	const { cart } = useTypedSelector((state) => state.cartStore)
	const [selectedAddress, setSelectedAddress] = useState<string>('')

	const [paymentMethod, setPaymentMethod] = useState(payment_methods[0]?.id)
	const [orderStack, setOrderStack] = useState<ICartItem[]>(cart)

	const [helperText, setHelperText] = useState({
		paymentMethod: '',
		selectedAddress: '',
	})

	// hooks
	const router = useRouter()

	// redux
	const { user } = useTypedSelector((state) => state.userStore)

	// address fetching
	const { data: addresses, refetch } = useQuery(
		'address get',
		() => AddressesService.getList(),
		{
			select: (data: ResponseList<IAddress>) => data.results,
		}
	)

	// address mutation
	const { mutateAsync: createAsync } = useMutation(
		'address create',
		(data: IAddress) => AddressesService.create({ ...data, user: user.id }),
		{
			onSuccess: () => {
				toast.success('new address successfully created')
				refetch()
			},
		}
	)

	const { mutateAsync: updateAsync } = useMutation(
		'address update',
		({ id, data }: { id: string; data: IAddress }) =>
			AddressesService.update(id, data),
		{
			onSuccess: () => {
				toast.success('address successfully updated')
				refetch()
			},
		}
	)

	// handlers
	const { mutateAsync: orderAsync } = useMutation(
		'order create',
		(data: ICartItem) => {
			return instance.post(`/products/variants/${data?.variants[0]?.id}/buy/`, {
				quantity: data?.qty,
				address: selectedAddress,
			})
		}
	)

	const handleFormSubmit = async () => {
		const withSortShops = ProfilePaymentService.postWithSort(orderStack)

		for (let i in withSortShops) {
			await ProfilePaymentService.create({
				payment_type: paymentMethod,
				confirm_photo: 'string',
				phone_number: selectedAddress,
				bank_account: 'string',
			})
		}

		// if (!paymentMethod || !selectedAddress) {
		// 	setHelperText({
		// 		paymentMethod: paymentMethod
		// 			? ''
		// 			: dynamicLocalization(common.required),
		// 		selectedAddress: selectedAddress
		// 			? ''
		// 			: dynamicLocalization(common.required),
		// 	})
		// 	return
		// }

		// await orderStack.forEach((item) => {
		// 	orderAsync(item)
		// })
		// router.push('/orders/')
	}

	const handleFieldValueChange = (item) => () => {
		setSelectedAddress(item)
		setHelperText({ ...helperText, selectedAddress: '' })
	}

	const deleteAddress = async (
		e: React.MouseEvent<HTMLElement>,
		id: string
	) => {
		e.stopPropagation()
		await AddressesService.delete(id)
		await refetch()
		if (id == selectedAddress) setSelectedAddress('')
	}

	return (
		<>
			<Card1 sx={{ mb: 3 }}>
				<FlexBetween>
					<Heading number={1} title={t('selectDelivery')} />
					<NewAddressForm mutateAsync={createAsync} />
				</FlexBetween>

				<Grid container spacing={3}>
					{addresses?.map((item: IAddress) => (
						<Grid item md={4} sm={6} xs={12} key={item.id}>
							<Card
								sx={{
									padding: 2,
									boxShadow: 'none',
									cursor: 'pointer',
									border: '1px solid',
									position: 'relative',
									backgroundColor: 'grey.100',
									borderColor:
										item.id === selectedAddress.id
											? 'primary.main'
											: 'transparent',
								}}
								onClick={handleFieldValueChange(item)}
							>
								<FlexBox
									justifyContent="flex-end"
									sx={{ position: 'absolute', top: 5, right: 5 }}
								>
									<EditAddressForm address={item} mutateAsync={updateAsync} />
									<IconButton
										size="small"
										color="error"
										onClick={(e) => deleteAddress(e, item.id)}
									>
										<DeleteOutline sx={{ fontSize: 20 }} />
									</IconButton>
								</FlexBox>

								<H6 mb={0.5}>{item.country}</H6>
								<Paragraph color="grey.700">{item.city}</Paragraph>
								<Paragraph color="grey.700">{item.street}</Paragraph>
								<Paragraph color="grey.700">{item.phone}</Paragraph>
							</Card>
						</Grid>
					))}
				</Grid>
				{helperText.selectedAddress ? (
					<Alert sx={{ m: '20px 0 0' }} severity="error">
						{helperText.selectedAddress}
					</Alert>
				) : null}
			</Card1>

			<Card1 sx={{ mb: 3 }}>
				<Heading number={2} title="Payment Details" />

				<RadioWrapper>
					{payment_methods?.map((method) => (
						<RadioItem
							key={method.id}
							style={{
								boxShadow:
									paymentMethod == method.id ? '0 0 0 1px #ff7900' : null,
							}}
							onClick={() => {
								setPaymentMethod(method.id)
								setHelperText({ ...helperText, paymentMethod: '' })
							}}
						>
							<img src={method.icon.src} alt={method.name} />
							<p>{method.name}</p>
							<PaymentDialog images={method?.images} />
						</RadioItem>
					))}
				</RadioWrapper>
				{helperText.paymentMethod ? (
					<Alert sx={{ m: '20px 0 0' }} severity="error">
						{helperText.paymentMethod}
					</Alert>
				) : null}
			</Card1>

			<Button
				fullWidth
				type="submit"
				color="primary"
				variant="contained"
				sx={{ mt: 3 }}
				onClick={handleFormSubmit}
			>
				{t('placeOrder')}
			</Button>
		</>
	)
}

const RadioWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	grid-gap: 30px;
	width: 100%;
`

const RadioItem = styled.div`
	display: flex;
	/* grid-template-columns: 1fr 1fr; */
	align-items: center;
	justify-content: center;
	grid-gap: 0 10px;

	background-color: #f6f9fc;
	border-radius: 5px;
	padding: 2px 10px;

	transition: 0.3s;
	cursor: pointer;

	img {
		width: 30px;
		height: 30px;
		object-fit: contain;
	}

	&:hover {
		background-color: #fcf8f5;
	}
`

const payment_methods: {
	id: IPaymentType
	name: string
	icon: any
	images?: string[]
}[] = [
	{
		id: 'elsom',
		name: 'Элсом',
		icon: elsom,
		images: [
			'https://stock.xistore.by/upload/resize/news/detail/3480/c24/screenshot3_312_676_75.png',
			'https://madgeek.io/wp-content/uploads/2019/06/Apple-IPhone_1-628x1024.jpg',
		],
	},
	{
		id: 'visa',
		name: 'Visa',
		icon: visa,
	},
	{
		id: 'balance',
		name: 'Balance',
		icon: balance,
	},
	{
		id: 'mbank',
		name: 'MBank',
		icon: mbank,
	},
	{
		id: 'o_dengi',
		name: 'О! деньги',
		icon: oDengi,
	},
]

export default CheckoutForm2
