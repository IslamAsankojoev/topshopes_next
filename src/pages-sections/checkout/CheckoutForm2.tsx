/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled'
import { DeleteOutline } from '@mui/icons-material'
import { Alert, Button, Card, Grid, TextField, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { AddressesService } from 'src/api/services/addresses/addresses.service'
import { ProfilePaymentService } from 'src/api/services/payments/ProfilePayment.service'
import Card1 from 'src/components/Card1'
import DropZone from 'src/components/DropZone'
import { H6, Paragraph } from 'src/components/Typography'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import { useFormik } from 'formik'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { ResponseList } from 'src/shared/types/response.types'
import { IAddress } from 'src/shared/types/user.types'
import { common } from 'src/utils/Translate/common'
import { localize } from 'src/utils/Translate/localize'
import * as yup from 'yup'
import { MouseEvent } from 'react'

import EditAddressForm from './EditAddressForm'
import Heading from './Heading'
import NewAddressForm from './NewAddressForm'
import PaymentDialog from './PaymentDialog'
import {
	paymentTranslations,
	payment_methods,
	deliveryRegions,
} from './paymentHelper'
import { useActions } from 'src/hooks/useActions'

// ====================================================================
// date types
type DateProps = { label: string; value: string }
// ====================================================================

const initialValues = {
	selectedAddress: null,
	paymentMethod: payment_methods[0].id,
	deliveryRegion: deliveryRegions[0].id,
	bankAccount: '',
	screenshot: null,
}

const checkoutFormValidationSchema = yup.object().shape({
	selectedAddress: yup.mixed().required(localize(common.required)),
	paymentMethod: yup.string().required(localize(common.required)),
	deliveryRegion: yup.string().required(localize(common.required)),
	bankAccount: yup.string().required(localize(common.required)),
	screenshot: yup.mixed().required(localize(common.required)),
})

const CheckoutForm2: FC = () => {
	const { t } = useTranslation('common')

	// states
	const { cart } = useTypedSelector((state) => state.cartStore)
	const { user } = useTypedSelector((state) => state.userStore)

	const router = useRouter()
	const { clearCart } = useActions()

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
				refetch()
			},
		}
	)

	const handleFormSubmit = async () => {
		await orderAsync()
		await router.push('/orders')
	}

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		initialValues,
		onSubmit: handleFormSubmit,
		validationSchema: checkoutFormValidationSchema,
	})

	const { mutateAsync: orderAsync } = useMutation(
		'order create',
		() =>
			ProfilePaymentService.pay({
				cart,
				address: values.selectedAddress,
				data: {
					bank_account: values.bankAccount,
					confirm_photo: values.screenshot,
					payment_type: values.paymentMethod,
					phone_number: values.selectedAddress.phone,
				},
			}),
		{
			onSuccess: () => {
				clearCart()
			},
		}
	)

	const deleteAddress = async (e: MouseEvent<HTMLElement>, id: string) => {
		e.stopPropagation()
		await AddressesService.delete(id)
		await refetch()
		if (id == values.selectedAddress?.id) setFieldValue('selectedAddress', null)
	}

	useEffect(() => {
		if (addresses?.length > 0 && !values.selectedAddress) {
			setFieldValue('selectedAddress', addresses[0])
		}
	}, [values.selectedAddress, addresses])

	return (
		<form onSubmit={handleSubmit}>
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
										item.id === values.selectedAddress?.id
											? 'primary.main'
											: 'transparent',
								}}
								onClick={() => setFieldValue('selectedAddress', item)}
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
				{!!touched.selectedAddress && !!errors.selectedAddress ? (
					<Alert sx={{ m: '20px 0 0' }} severity="error">
						{touched.selectedAddress && errors.selectedAddress}
					</Alert>
				) : null}
			</Card1>

			{/* <Card1 sx={{ mb: 3 }}>
				<Heading number={2} title={'Выберите регион доставки'} />
				<RadioWrapper>
					{deliveryRegions?.map((region) => (
						<RadioItem
							key={region.id}
							style={{
								boxShadow:
									values.deliveryRegion == region.id
										? '0 0 0 1px #ff7900'
										: null,
							}}
							onClick={() => setFieldValue('deliveryRegion', region.id)}
						>
							<p>{region.name}</p>
						</RadioItem>
					))}
				</RadioWrapper>
			</Card1> */}

			<Card1 sx={{ mb: 3 }}>
				<Heading number={2} title={t('choosePayment')} />

				<RadioWrapper>
					{payment_methods?.map((method) => (
						<RadioItem
							key={method.id}
							style={{
								padding: '0px 10px',
								boxShadow:
									values.paymentMethod == method.id
										? '0 0 0 1px #ff7900'
										: null,
							}}
							onClick={() => setFieldValue('paymentMethod', method.id)}
						>
							<img src={method.icon.src} alt={method.name} />
							<Typography
								sx={{
									padding: '10px 10px',
								}}
							>
								{method.name}
								<br />
								<b>{method.bank_account}</b>
							</Typography>

							<PaymentDialog
								images={method?.images}
								text={method.instruction}
							/>
						</RadioItem>
					))}
				</RadioWrapper>
			</Card1>

			<Card1 sx={{ mb: 3 }}>
				<Heading number={3} title={t('confirmPayment')} />

				<TextField
					sx={{ m: '25px 0 0' }}
					autoComplete="on"
					label={localize(paymentTranslations.cardPhoneNumber)}
					placeholder={localize(paymentTranslations.cardPhoneNumber)}
					name={'bankAccount'}
					value={values.bankAccount}
					onChange={handleChange}
					onBlur={handleBlur}
					error={!!touched.bankAccount && !!errors.bankAccount}
					helperText={touched.bankAccount && errors.bankAccount}
					fullWidth
				/>

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
						sm={values.screenshot ? 6 : 12}
						xs={values.screenshot ? 6 : 12}
					>
						<DropZone
							style={{
								borderColor: 'red!important',
							}}
							name={values.screenshot?.name}
							onChange={(file: File[]) => setFieldValue('screenshot', file[0])}
							multiple={false}
							accept={
								'image/*, image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp'
							}
						/>
					</Grid>
					{values.screenshot ? (
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
								src={URL?.createObjectURL(values.screenshot)}
								alt={values.screenshot?.name}
							/>
						</Grid>
					) : null}
				</Grid>

				{!!touched.screenshot && !!errors.screenshot ? (
					<Alert sx={{ m: '20px 0 0' }} severity="error">
						{touched.screenshot && errors.screenshot}
					</Alert>
				) : null}
			</Card1>

			<Button
				fullWidth
				type="submit"
				color="primary"
				variant="contained"
				sx={{ mt: 3 }}
			>
				{t('placeOrder')}
			</Button>
		</form>
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
