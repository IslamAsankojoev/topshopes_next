import { Checkbox, FormControlLabel } from '@mui/material'
import { AuthService } from 'api/services/auth/auth.service'
import BazaarButton from 'components/BazaarButton'
import BazaarTextField from 'components/BazaarTextField'
import { H3, H6, Small } from 'components/Typography'
import { FlexBox } from 'components/flex-box'
import { StyledNavLink } from 'components/mobile-navigation/styles'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'utils/getErrorMessage'
import * as yup from 'yup'

import EyeToggleButton from './EyeToggleButton'
import { Wrapper } from './Login'
import SocialButtons from './SocialButtons'

const Signup = () => {
	const { t: commonT } = useTranslation('common')
	const { t: authT } = useTranslation('auth')

	const [passwordVisibility, setPasswordVisibility] = useState(false)
	const { push, replace, asPath } = useRouter()

	const togglePasswordVisibility = useCallback(() => {
		setPasswordVisibility((visible) => !visible)
	}, [])

	const { mutateAsync } = useMutation(
		'register',
		() => AuthService.register(values),
		{
			onSuccess: () => {
				push('/login')
			},
			onError: (e: any) => {
				toast.error(getErrorMessage(e))
			},
		}
	)

	const handleFormSubmit = async () => {
		await mutateAsync()
	}

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues,
			onSubmit: handleFormSubmit,
			validationSchema: formSchema,
		})

	return (
		<Wrapper elevation={3} passwordVisibility={passwordVisibility}>
			<form>
				<H3 textAlign="center" mb={1}>
					{authT('createYourAccount')}
				</H3>
				<Small
					mb={4.5}
					fontSize={12}
					display="block"
					fontWeight={600}
					color="grey.800"
					textAlign="center"
				>
					{authT('allFields')}
				</Small>

				<BazaarTextField
					mb={1.5}
					fullWidth
					name="email"
					size="small"
					label="Email"
					variant="outlined"
					onBlur={handleBlur}
					value={values.email}
					onChange={handleChange}
					placeholder="example@mail.ru"
					error={!!touched.email && !!errors.email}
					helperText={touched.email && errors.email}
				/>

				<BazaarTextField
					mb={1.5}
					fullWidth
					name="phone"
					size="small"
					type="text"
					variant="outlined"
					onBlur={handleBlur}
					value={values.phone}
					onChange={handleChange}
					label={commonT('phone')}
					placeholder="+996 707 777 777"
					error={!!touched.phone && !!errors.phone}
					helperText={touched.phone && errors.phone}
				/>

				<BazaarTextField
					mb={1.5}
					fullWidth
					size="small"
					name="password"
					label={commonT('password')}
					variant="outlined"
					autoComplete="on"
					placeholder="*********"
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.password}
					type={passwordVisibility ? 'text' : 'password'}
					error={!!touched.password && !!errors.password}
					helperText={touched.password && errors.password}
					InputProps={{
						endAdornment: (
							<EyeToggleButton
								show={passwordVisibility}
								click={togglePasswordVisibility}
							/>
						),
					}}
				/>

				<BazaarTextField
					fullWidth
					size="small"
					autoComplete="on"
					name="re_password"
					variant="outlined"
					label={commonT('retypePassword')}
					placeholder="*********"
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.re_password}
					type={passwordVisibility ? 'text' : 'password'}
					error={!!touched.re_password && !!errors.re_password}
					helperText={touched.re_password && errors.re_password}
					InputProps={{
						endAdornment: (
							<EyeToggleButton
								show={passwordVisibility}
								click={togglePasswordVisibility}
							/>
						),
					}}
				/>

				<FormControlLabel
					name="agreement"
					className="agreement"
					onChange={handleChange}
					control={
						<Checkbox
							size="small"
							color="secondary"
							checked={values.agreement || false}
						/>
					}
					label={
						<FlexBox
							flexWrap="wrap"
							alignItems="center"
							justifyContent="flex-start"
						>
							<a
								href="/"
								target="_blank"
								rel="noreferrer noopener"
								style={{ textDecoration: 'underline' }}
							>
								{authT('termsCondtion')}
							</a>
						</FlexBox>
					}
				/>

				<BazaarButton
					fullWidth
					// @ts-ignore
					onClick={handleFormSubmit}
					color="primary"
					variant="contained"
					sx={{ height: 44 }}
				>
					{authT('createAccount')}
				</BazaarButton>
			</form>

			<SocialButtons redirect="/login" redirectText={commonT('login')} />
			<StyledNavLink href="/">{commonT('goHome')}</StyledNavLink>
		</Wrapper>
	)
}

const initialValues = {
	phone: '',
	email: '',
	password: '',
	re_password: '',
	agreement: true,
}

const formSchema = yup.object().shape({
	phone: yup.string().required('Phone is required'),
	email: yup.string().email('invalid email').required('Email is required'),
	password: yup.string().required('Password is required'),
	re_password: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Please re-type password'),
	agreement: yup
		.bool()
		.test(
			'agreement',
			'You have to agree with our Terms and Conditions!',
			(value) => value === true
		)
		.required('You have to agree with our Terms and Conditions!')
		.oneOf([true], 'You have to agree with our Terms and Conditions!'),
})

export default Signup
