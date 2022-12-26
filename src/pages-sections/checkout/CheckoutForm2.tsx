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
import { AddressesService } from 'api/services/addresses/addresses.service'
import Card1 from 'components/Card1'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { H6, Paragraph } from 'components/Typography'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { method } from 'lodash'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { IAddress } from 'shared/types/user.types'
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
	// states
	const [selectedAddress, setSelectedAddress] = useState<string>('')
	const [paymentMethod, setPaymentMethod] = useState('')

	// hooks
	const router = useRouter()

	// redux
	const { user } = useTypedSelector((state) => state.userStore)

	// address fetching
	const { data: addresses, refetch } = useQuery(
		'address get',
		AddressesService.getList
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
	const handleFormSubmit = async (values: any) => {
		// router.push('/payment')
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
					<Heading number={1} title="Delivery Address" />
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

				<Button
					fullWidth
					type="submit"
					color="primary"
					variant="contained"
					sx={{ mt: 3 }}
				>
					Place Order
				</Button>
			</Card1>
		</>
	)
}

const payment_methods: { id: string; name: string }[] = [
	{ id: 'cash_on_dilivery', name: 'cash on dilivery' },
	{ id: 'credit_card', name: 'credit card' },
]

// const addressList2 = [
// 	{
// 		name: 'Home',
// 		phone: '+17804084466',
// 		street2: '435 Bristol, MA 2351',
// 		street1: '375 Subidbazaar, MA 2351',
// 	},
// 	{
// 		name: 'Office',
// 		phone: '+18334271710',
// 		street2: '968 Brockton, MA 2351',
// 		street1: '645 Bondorbazaar, MA 2351',
// 	},
// 	{
// 		name: 'Office 2',
// 		phone: '+17754739407',
// 		street2: '777 Kazi, MA 2351',
// 		street1: '324 Ambarkhana, MA 2351',
// 	},
// ]

// const paymentMethodList = [
// 	{
// 		cardType: 'Amex',
// 		last4Digits: '4765',
// 		name: 'Jaslynn Land',
// 	},
// 	{
// 		cardType: 'Mastercard',
// 		last4Digits: '5432',
// 		name: 'Jaslynn Land',
// 	},
// 	{
// 		cardType: 'Visa',
// 		last4Digits: '4543',
// 		name: 'Jaslynn Land',
// 	},
// ]

// const timeList = [
// 	{ label: '9AM - 11AM', value: '9AM - 11AM' },
// 	{ label: '11AM - 1PM', value: '11AM - 1PM' },
// 	{ label: '3PM - 5PM', value: '3PM - 5PM' },
// 	{ label: '5PM - 7PM', value: '5PM - 7PM' },
// ]

// const checkoutSchema = yup.object().shape({
// 	card: yup.string().required('required'),
// 	date: yup.string().required('required'),
// 	time: yup.string().required('required'),
// 	address: yup.string().required('required'),
// 	cardHolderName: yup.string().required('required'),
// 	cardNumber: yup.number().required('required'),
// 	cardMonth: yup.string().required('required'),
// 	cardYear: yup.number().required('required'),
// 	cardCVC: yup.number().required('required'),
// 	voucher: yup.string(),
// })

export default CheckoutForm2
