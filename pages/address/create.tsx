import Place from '@mui/icons-material/Place'
import { Box, Button, Grid, TextField } from '@mui/material'
import Card1 from 'src/components/Card1'
import UserDashboardHeader from 'src/components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'src/components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'src/components/layouts/customer-dashboard/Navigations'
import { Formik } from 'formik'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPageAuth } from 'src/shared/types/auth.types'
import * as yup from 'yup'
import PhoneNumberMask from 'src/components/Form/PhoneNumberMask'
import { api } from 'src/api/index.service'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'adminActions',
			])),
		},
	}
}
// =

const AddressCreate: NextPageAuth = () => {
	const { t } = useTranslation('common')
	const { push } = useRouter()
	const { user }: { user: any } = useTypedSelector((state) => state.userStore)

	// handle form submit
	const handleFormSubmit = async (values: any) => {
		if (!user) return
		await api.address.AddressesService.create({ ...values, user: user.id })
		push('/address')
	}

	return (
		<CustomerDashboardLayout>
			<UserDashboardHeader
				icon={Place}
				title={t('addAddress')}
				navigation={<CustomerDashboardNavigation />}
				button={
					<Link href="/address" passHref>
						<Button color="primary" sx={{ bgcolor: 'primary.light', px: 4 }}>
							{t('backAddress')}
						</Button>
					</Link>
				}
			/>

			<Card1>
				<Formik
					onSubmit={handleFormSubmit}
					initialValues={initialValues}
					validationSchema={checkoutSchema}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
					}) => (
						<form onSubmit={handleSubmit}>
							<Box mb={4}>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											name="city"
											placeholder={t('city')}
											onBlur={handleBlur}
											value={values.city}
											onChange={handleChange}
											error={!!touched.city && !!errors.city}
											helperText={touched.city && errors.city}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											name="country"
											onBlur={handleBlur}
											placeholder={t('country')}
											value={values.country}
											onChange={handleChange}
											error={!!touched.country && !!errors.country}
											helperText={touched.country && errors.country}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											placeholder={t('street')}
											name="street"
											onBlur={handleBlur}
											value={values.street}
											onChange={handleChange}
											error={!!touched.street && !!errors.street}
											helperText={touched.street && errors.street}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											placeholder={t('phone')}
											name="phone"
											onBlur={handleBlur}
											value={values.phone}
											onChange={handleChange}
											error={!!touched.phone && !!errors.phone}
											helperText={touched.phone && errors.phone}
											InputProps={{
												inputComponent: PhoneNumberMask as any,
											}}
										/>
									</Grid>
								</Grid>
							</Box>

							<Button type="submit" variant="contained" color="primary">
								{t('saveChanges')}
							</Button>
						</form>
					)}
				</Formik>
			</Card1>
		</CustomerDashboardLayout>
	)
}

const initialValues = {
	city: '',
	country: '',
	street: '',
	phone: '',
}

const checkoutSchema = yup.object().shape({
	city: yup.string().required('required'),
	country: yup.string().required('required'),
	street: yup.string().required('required'),
	phone: yup.string().required('required'),
})

AddressCreate.isOnlyAuth = true

export default AddressCreate
