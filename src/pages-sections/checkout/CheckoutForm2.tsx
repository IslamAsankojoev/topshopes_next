/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutline } from '@mui/icons-material'
import {
	Avatar,
	Button,
	Card,
	FormControl,
	Grid,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import { instance } from 'api/interceptor'
import { AddressesService } from 'api/services/addresses/addresses.service'
import { OrdersService } from 'api/services/orders/orders.service'
import axios from 'axios'
import Card1 from 'components/Card1'
import { H6, Paragraph } from 'components/Typography'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { method } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { ResponseList } from 'shared/types/response.types'
import { IAddress } from 'shared/types/user.types'
import { ICartItem } from 'store/cart/cart.interface'

import EditAddressForm from './EditAddressForm'
import NewAddressForm from './NewAddressForm'

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
	const [paymentMethod, setPaymentMethod] = useState('')
	const [orderStack, setOrderStack] = useState<ICartItem[]>(cart)

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
		await orderStack.forEach((item) => {
			orderAsync(item)
		})
		router.push('/orders/')
	}

	const handleFieldValueChange = (id: string) => () => {
		setSelectedAddress(id)
	}

	const deleteAddress = async (
		e: React.MouseEvent<HTMLElement>,
		id: string
	) => {
		e.stopPropagation()
		await AddressesService.delete(id)
		await refetch()
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
										item.id === selectedAddress
											? 'primary.main'
											: 'transparent',
								}}
								onClick={handleFieldValueChange(item.id)}
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
			</Card1>

			<Card1 sx={{ mb: 3 }}>
				<Heading number={2} title="Payment Details" />

				<FormControl>
					<RadioGroup
						value={paymentMethod}
						defaultValue={payment_methods[0]?.name}
						onChange={({ target }) => setPaymentMethod(target.value)}
					>
						{payment_methods?.map((method) => (
							<FormControlLabel
								key={method.id}
								value={method.id}
								control={<Radio />}
								label={method.name}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Card1>
		</>
	)
}

const payment_methods: { id: string; name: string; icon: string }[] = [
	{
		id: 'oDengi',
		name: 'О! деньги',
		icon: '/public/assets/images/payment-methods/odengi.webp',
	},
	{
		id: 'elsom',
		name: 'Элсом',
		icon: '/public/assets/images/payment-methods/elsom.webp',
	},
	{
		id: 'visa',
		name: 'Visa',
		icon: '/public/assets/images/payment-methods/visa.png',
	},
	{
		id: 'balance',
		name: 'Balance',
		icon: '/public/assets/images/payment-methods/balance.webp',
	},
	{
		id: 'mbank',
		name: 'MBank',
		icon: '/public/assets/images/payment-methods/odengi.webp',
	},
]

export default CheckoutForm2
