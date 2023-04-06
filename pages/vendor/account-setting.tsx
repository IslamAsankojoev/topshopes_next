import { CameraAlt, CameraEnhance } from '@mui/icons-material'
import { Avatar, Box, Button, Card, Grid, SxProps } from '@mui/material'
import TextField from '@mui/material/TextField'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { Formik } from 'formik'
import { useActions } from 'src/hooks/useActions'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { FC, Fragment, ReactElement, useState } from 'react'
import { NextPageAuth } from 'src/shared/types/auth.types'
import * as yup from 'yup'
import { AuthService } from 'src/api/services/auth/auth.service'
import { toast } from 'react-toastify'
import { localize } from 'src/utils/Translate/localize'

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

// upload button
type UploadButtonProps = { id: string; style?: SxProps }
const UploadButton: FC<UploadButtonProps> = ({ id, style = {} }) => {
	return (
		<Fragment>
			<label htmlFor={id}>
				<Button
					size="small"
					component="span"
					color="secondary"
					sx={{
						p: '6px',
						height: 'auto',
						borderRadius: '50%',
						bgcolor: 'info.100',
						...style,
						':hover': { backgroundColor: 'grey.300' },
					}}
				>
					<CameraAlt fontSize="small" color="info" />
				</Button>
			</label>

			<input
				id={id}
				type="file"
				accept="image/*, image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
				className="hidden"
				onChange={(e) => console.log(e.target.files)}
				style={{ display: 'none' }}
			/>
		</Fragment>
	)
}

const accountSchema = yup.object().shape({
	city: yup.string().required('City is required'),
	country: yup.mixed().required('Country is required'),
	contact: yup.string().required('Contact is required'),
	last_name: yup.string().required('Last name is required'),
	first_name: yup.string().required('First name is required'),
	email: yup.string().email('Invalid Email').required('Email is required'),
})

const AccountSetting: NextPageAuth = () => {
	const { t } = useTranslation('common')
	const user = useTypedSelector((state) => state.userStore.user)
	const [file, setFile] = useState(null)
	const [fileLocaleUrl, setFileLocaleUrl] = useState(null)

	const { push } = useRouter()
	const { profile } = useActions()

	const handleFileChange = (e) => {
		const file = e?.target?.files[0]
		if (file) {
			setFile(file)
			setFileLocaleUrl(URL?.createObjectURL(file))
		}
	}

	const initialValues = {
		email: '',
		phone: '',
		last_name: '',
		first_name: '',
	}

	const handleFormSubmit = async (values: any) => {
		const formData = new FormData()
		formData.append('first_name', values.first_name)
		formData.append('last_name', values.last_name)
		formData.append('email', values.email)
		formData.append('phone', values.phone)
		if (file) {
			formData.append('avatar', file)
		}
		const res = await AuthService.update(formData)
		if (res) {
			toast.success(
				localize({
					ru: 'Профиль успешно обновлен',
					tr: 'Profil başarıyla güncellendi',
					en: 'Profile successfully updated',
				})
			)
		}

		profile()
	}

	return (
		user && (
			<Box py={4}>
				<H3 mb={2}>{t('accountSettings')}</H3>

				<Card sx={{ p: 4 }}>
					<Avatar
						src={
							fileLocaleUrl ||
							user.avatar ||
							'/assets/images/avatars/001-man.svg'
						}
						sx={{ height: 64, width: 64 }}
					/>

					<Box
						ml={5.5}
						sx={{
							transform: 'translateY(-50%)',
						}}
					>
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

					<Formik
						initialValues={user || initialValues}
						// validationSchema={accountSchema}
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
												color="info"
												size="medium"
												name="first_name"
												label={t('firstName')}
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
												color="info"
												size="medium"
												name="last_name"
												label={t('lastName')}
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
												color="info"
												name="email"
												type="email"
												label="Email"
												placeholder="Email"
												size="medium"
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
												type="tel"
												color="info"
												size="medium"
												name="phone"
												label={t('phone')}
												placeholder={t('phone')}
												onBlur={handleBlur}
												value={values.phone}
												onChange={handleChange}
												error={!!touched.phone && !!errors.phone}
												helperText={touched.phone && errors.phone}
											/>
										</Grid>
										{/* <Grid item md={6} xs={12}>
											<TextField
												fullWidth
												type="password"
												color="info"
												size="medium"
												name="password"
												label={t('password')}
												placeholder={t('password')}
												onBlur={handleBlur}
												value={values.password}
												onChange={handleChange}
												error={!!touched.password && !!errors.password}
												helperText={touched.password && errors.password}
											/>
										</Grid> */}
										{/* <Grid item md={6} xs={12}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      options={countryList}
                      value={values.country}
                      getOptionLabel={(option) => option.label}
                      onChange={(_, value) => setFieldValue('country', value)}
                      renderInput={(params) => (
                        <TextField
                          color="info"
                          label="Country"
                          variant="outlined"
                          placeholder="Select Country"
                          error={!!touched.country && !!errors.country}
                          helperText={touched.country && errors.country}
                          {...params}
                          size="medium"
                        />
                      )}
                    />
                  </Grid> */}
										{/* <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="city"
                      label="City"
                      color="info"
                      size="medium"
                      onBlur={handleBlur}
                      value={values.city}
                      onChange={handleChange}
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                    />
                  </Grid> */}
									</Grid>
								</Box>

								<Button type="submit" variant="contained" color="info">
									{t('saveChanges')}
								</Button>
							</form>
						)}
					</Formik>
				</Card>
			</Box>
		)
	)
}

AccountSetting.isOnlySeller = true

AccountSetting.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default AccountSetting
