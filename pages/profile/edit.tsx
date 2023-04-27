import CameraEnhance from '@mui/icons-material/CameraEnhance'
import Person from '@mui/icons-material/Person'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Avatar, Box, Button, Grid, TextField } from '@mui/material'
import { AuthService } from 'src/api/services/auth/auth.service'
import Card1 from 'src/components/Card1'
import { FlexBox } from 'src/components/flex-box'
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
import { useState } from 'react'

import { useMutation } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { formData } from 'src/utils/formData'
import { getLocalStorage } from 'src/utils/local-storage/localStorage'
import * as yup from 'yup'
import { api } from 'src/api/index.service'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const ProfileEditor: NextPageAuth = () => {
	const { t } = useTranslation('common')
	const user = useTypedSelector((state) => state.userStore.user)
	const [file, setFile] = useState(null)
	const [fileLocaleUrl, setFileLocaleUrl] = useState(null)
	const { avatar, ...initialData } = getLocalStorage('user') || initialValues

	const { push } = useRouter()

	const { mutateAsync } = useMutation(
		'update profile',
		(values: FormData) => api.auth.AuthService.update(values),
		{
			onSuccess: () => {
				push('/profile')
			},
		}
	)

	const handleFileChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			setFile(file)
			setFileLocaleUrl(URL.createObjectURL(file))
		}
	}

	const handleFormSubmit = async (values: any) => {
		if (file) values.avatar = file
		mutateAsync(formData(values))
	}

	return user ? (
		<CustomerDashboardLayout>
			<UserDashboardHeader
				icon={Person}
				title={t('editProfile')}
				navigation={<CustomerDashboardNavigation />}
				button={
					<Link href="/profile" passHref>
						<Button color="primary" sx={{ px: 4, bgcolor: 'primary.light' }}>
							{t('backProfile')}
						</Button>
					</Link>
				}
			/>

			<Card1>
				<FlexBox alignItems="flex-end" mb={3}>
					<Avatar
						src={
							fileLocaleUrl ||
							user.avatar ||
							'/assets/images/avatars/001-man.svg'
						}
						sx={{ height: 64, width: 64 }}
					/>

					<Box ml={-2.5}>
						<label htmlFor="profile-image">
							<Button
								component="span"
								color="secondary"
								sx={{
									p: '8px',
									height: 'auto',
									bgcolor: 'grey.300',
									borderRadius: '50%',
								}}
							>
								<CameraEnhance fontSize="small" />
							</Button>
						</label>
					</Box>

					<Box display="none">
						<input
							onChange={(e) => handleFileChange(e)}
							id="profile-image"
							accept="image/*, image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
							type="file"
						/>
					</Box>
				</FlexBox>

				<Formik
					initialValues={initialData}
					// validationSchema={checkoutSchema}
					onSubmit={handleFormSubmit}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						setFieldValue,
					}) => (
						<form onSubmit={handleSubmit}>
							<Box mb={4}>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											name="first_name"
											placeholder={t('firstName')}
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.first_name}
											error={!!touched.first_name && !!errors.first_name}
											helperText={touched.first_name && errors.first_name}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											name="last_name"
											placeholder={t('lastName')}
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.last_name}
											error={!!touched.last_name && !!errors.last_name}
											helperText={touched.last_name && errors.last_name}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											name="email"
											type="email"
											placeholder="Email"
											onBlur={handleBlur}
											value={values.email}
											onChange={handleChange}
											error={!!touched.email && !!errors.email}
											helperText={touched.email && errors.email}
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
										/>
									</Grid>

									<Grid item md={6} xs={12}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DateTimePicker
												label="Birth Date"
												maxDate={new Date()}
												value={values.birth_date}
												inputFormat="dd MMMM, yyyy"
												shouldDisableTime={() => false}
												renderInput={(props) => (
													<TextField
														fullWidth
														size="small"
														helperText={touched.birth_date && errors.birth_date}
														error={
															(!!touched.birth_date && !!errors.birth_date) ||
															props.error
														}
														{...props}
													/>
												)}
												onChange={(newValue) =>
													setFieldValue('birth_date', newValue)
												}
											/>
										</LocalizationProvider>
									</Grid>
								</Grid>
							</Box>
							{/*// @ts-ignore*/}
							<Button type="submit" variant="contained" color="primary">
								{t('saveChanges')}
							</Button>
						</form>
					)}
				</Formik>
			</Card1>
		</CustomerDashboardLayout>
	) : null
}

ProfileEditor.isOnlyAuth = true

const initialValues = {
	first_name: '',
	last_name: '',
	email: '',
	phone: '',
	birth_date: new Date(),
}

const checkoutSchema = yup.object().shape({
	first_name: yup.string().required('required'),
	last_name: yup.string(),
	email: yup.string().email('invalid email').required('required'),
	phone: yup.string().required('required'),
	birth_date: yup.date().required('invalid date'),
})

export default ProfileEditor
