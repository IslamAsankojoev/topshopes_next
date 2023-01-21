import { Card, CardProps, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { AuthService } from 'api/services/auth/auth.service'
import axios from 'axios'
import BazaarButton from 'components/BazaarButton'
import BazaarTextField from 'components/BazaarTextField'
import { H3, Small } from 'components/Typography'
import { StyledNavLink } from 'components/mobile-navigation/styles'
import { useFormik } from 'formik'
import { useActions } from 'hooks/useActions'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { FormEvent, useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import * as yup from 'yup'

import EyeToggleButton from './EyeToggleButton'
import SocialButtons from './SocialButtons'

const fbStyle = { background: '#3B5998', color: 'white' }
const googleStyle = { background: '#4285F4', color: 'white' }

type WrapperProps = { passwordVisibility?: boolean }

export const Wrapper = styled<React.FC<WrapperProps & CardProps>>(
	({ children, passwordVisibility, ...rest }) => (
		<Card {...rest}>{children}</Card>
	)
)<CardProps>(({ theme, passwordVisibility }) => ({
	width: 500,
	padding: '2rem 3rem',
	[theme.breakpoints.down('sm')]: { width: '100%' },
	'.passwordEye': {
		color: passwordVisibility
			? theme.palette.grey[600]
			: theme.palette.grey[400],
	},
	'.facebookButton': { marginBottom: 10, ...fbStyle, '&:hover': fbStyle },
	'.googleButton': { ...googleStyle, '&:hover': googleStyle },
	'.agreement': { marginTop: 12, marginBottom: 24 },
}))

const Login = () => {
	const { t } = useTranslation('common')
	const [passwordVisibility, setPasswordVisibility] = useState(false)
	const { profile } = useActions()
	const router = useRouter()

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		resetForm,
	} = useFormik({
		initialValues,
		onSubmit: () => handleFormSubmit(),
		validationSchema: formSchema,
	})

	const togglePasswordVisibility = useCallback(() => {
		setPasswordVisibility((visible) => !visible)
	}, [])

	const { mutateAsync } = useMutation('login', () => AuthService.login(values))

	const handleFormSubmit = async () => {
		await mutateAsync()
		await profile()
		resetForm()
	}

	return (
		<Wrapper elevation={3} passwordVisibility={passwordVisibility}>
			<form onSubmit={handleSubmit}>
				<H3 textAlign="center" mb={1}>
					{t('welcome')}
				</H3>

				<BazaarTextField
					mb={1.5}
					fullWidth
					name="email"
					size="small"
					type="email"
					variant="outlined"
					onBlur={handleBlur}
					value={values.email}
					onChange={handleChange}
					label={t('phoneEmail')}
					placeholder="exmple@mail.com"
					error={!!touched.email && !!errors.email}
					helperText={touched.email && errors.email}
				/>

				<BazaarTextField
					mb={2}
					fullWidth
					size="small"
					name="password"
					label={t('password')}
					autoComplete="on"
					variant="outlined"
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.password}
					placeholder="*********"
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

				<Grid
					sx={{
						display: 'flex',
					}}
				>
					<BazaarButton
						fullWidth
						color="primary"
						variant="contained"
						type="submit"
						sx={{
							mb: '1.65rem',
							height: 44,
							borderRadius: '5px 5px 5px 5px',
							border: '1px solid white',
						}}
					>
						{t('login')}
					</BazaarButton>
				</Grid>
			</form>

			<SocialButtons redirect="/signup" redirectText={t('signUp')} />
			<StyledNavLink href="/">{t('goHome')}</StyledNavLink>
		</Wrapper>
	)
}

const initialValues = {
	email: '',
	password: '',
}

const formSchema = yup.object().shape({
	password: yup.string().required('Password is required'),
	email: yup.string().email('invalid email').required('Email is required'),
})

export default Login
