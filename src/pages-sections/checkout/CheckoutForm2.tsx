/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled'
import { DeleteOutline } from '@mui/icons-material'
import { Alert, Button, Card, Grid, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { AddressesService } from 'api/services/addresses/addresses.service'
import { ProfilePaymentService } from 'api/services/payment/ProfilePayment.service'
import Card1 from 'components/Card1'
import DropZone from 'components/DropZone'
import { H6, Paragraph } from 'components/Typography'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { ResponseList } from 'shared/types/response.types'
import { IAddress } from 'shared/types/user.types'
import { common } from 'utils/Translate/common'
import { dynamicLocalization } from 'utils/Translate/dynamicLocalization'

import EditAddressForm from './EditAddressForm'
import Heading from './Heading'
import NewAddressForm from './NewAddressForm'
import PaymentDialog from './PaymentDialog'
import { paymentTranslations, payment_methods } from './paymentHelper'

// ====================================================================
// date types
type DateProps = { label: string; value: string }
// ====================================================================

const CheckoutForm2: FC = () => {
	const { t } = useTranslation('common')

	// states
	const { cart } = useTypedSelector((state) => state.cartStore)

	const [formState, setFormState] = useState<Record<string, any>>({
		selectedAddress: null,
		paymentMethod: '',
		image: null,
	})
	const [bankAccount, setBankAccount] = useState<string>()

	const [helperText, setHelperText] = useState({
		bankAccount: '',
		selectedAddress: '',
		image: '',
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
	const { mutateAsync: orderAsync } = useMutation('order create', () =>
		ProfilePaymentService.pay({
			cart,
			address: formState.selectedAddress,
			data: {
				bank_account: bankAccount,
				confirm_photo: formState.image,
				payment_type: formState.paymentMethod,
				phone_number: formState.selectedAddress.phone,
			},
		})
	)

	const handleFormSubmit = async () => {
		// validation
		if (
			!formState.bankAccount ||
			!formState.selectedAddress ||
			!formState.image
		) {
			setHelperText({
				bankAccount: formState.bankAccount
					? ''
					: dynamicLocalization(common.required),
				selectedAddress: formState.selectedAddress
					? ''
					: dynamicLocalization(common.required),
				image: formState.image ? '' : dynamicLocalization(common.required),
			})
			return
		}

		orderAsync()
		// router.push('/orders/')
	}

	const handleFieldValueChange = (item) => () => {
		setFormState({ ...formState, selectedAddress: item })
		setHelperText({ ...helperText, selectedAddress: '' })
	}

	const deleteAddress = async (
		e: React.MouseEvent<HTMLElement>,
		id: string
	) => {
		e.stopPropagation()
		await AddressesService.delete(id)
		await refetch()
		if (id == formState.selectedAddress?.id)
			setFormState({ ...formState, selectedAddress: null })
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
										item.id === formState.selectedAddress?.id
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
				<Heading number={2} title={t('choosePayment')} />

				<RadioWrapper>
					{payment_methods?.map((method) => (
						<RadioItem
							key={method.id}
							style={{
								boxShadow:
									formState.paymentMethod == method.id
										? '0 0 0 1px #ff7900'
										: null,
							}}
							onClick={() =>
								setFormState({ ...formState, paymentMethod: method.id })
							}
						>
							<img src={method.icon.src} alt={method.name} />
							<p>{method.name}</p>
							<PaymentDialog images={method?.images} />
						</RadioItem>
					))}
				</RadioWrapper>
			</Card1>

			<Card1 sx={{ mb: 3 }}>
				<Heading number={3} title={t('confirmPayment')} />
				<TextField
					sx={{ m: '25px 0 0' }}
					autoComplete="on"
					label={dynamicLocalization(paymentTranslations.cardPhoneNumber)}
					placeholder={dynamicLocalization(paymentTranslations.cardPhoneNumber)}
					onChange={(e) => {
						setBankAccount(e.target.value)
						setHelperText({ ...helperText, bankAccount: '' })
					}}
					onBlur={() =>
						!bankAccount &&
						setHelperText({
							...helperText,
							bankAccount: dynamicLocalization(common.required),
						})
					}
					fullWidth
				/>

				{helperText.bankAccount ? (
					<Alert sx={{ m: '20px 0' }} severity="error">
						{helperText.bankAccount}
					</Alert>
				) : null}
				<Grid
					style={{
						margin: '30px 0 0',
						display: 'flex',
						position: 'relative',
					}}
					width="100%"
					container
				>
					<Grid
						item
						sm={formState.image ? 6 : 12}
						xs={formState.image ? 6 : 12}
					>
						<DropZone
							style={{
								borderColor: 'red!important',
							}}
							name={formState.image?.name}
							onChange={(file: File[]) => {
								setFormState({ ...formState, image: file[0] })
								setHelperText({ ...helperText, image: '' })
							}}
							multiple={false}
							accept={
								'image/*, image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp'
							}
						/>
					</Grid>
					{formState.image ? (
						<Grid
							display="flex"
							item
							sm={6}
							xs={6}
							position="relative"
							justifyContent="center"
							alignItems="center"
						>
							<Image
								layout="fill"
								objectFit="contain"
								objectPosition="center"
								src={URL?.createObjectURL(formState.image)}
								alt={formState.image?.name}
							/>
						</Grid>
					) : null}
				</Grid>

				{helperText.image ? (
					<Alert sx={{ m: '20px 0 0' }} severity="error">
						{helperText.image}
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

export default CheckoutForm2
