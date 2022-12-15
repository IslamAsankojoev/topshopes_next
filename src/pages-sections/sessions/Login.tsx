import { Card, CardProps, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import BazaarButton from 'components/BazaarButton'
import BazaarTextField from 'components/BazaarTextField'
import { H3, Small } from 'components/Typography'
import { useFormik } from 'formik'
import { useActions } from 'hooks/useActions'
import React, { FormEvent, useCallback, useState } from 'react'
import * as yup from 'yup'
import EyeToggleButton from './EyeToggleButton'
import SocialButtons from './SocialButtons'
import { useRouter } from 'next/router'
import { StyledNavLink } from 'components/mobile-navigation/styles'

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
	const [passwordVisibility, setPasswordVisibility] = useState(false)
	const { login, profile } = useActions()
	const { push } = useRouter()

	const togglePasswordVisibility = useCallback(() => {
		setPasswordVisibility((visible) => !visible)
	}, [])

	const handleFormSubmit = async () => {
		await login({ email: values.email, password: values.password })
		await profile()
		push('/profile')
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
					Welcome To Topshopes
				</H3>
				<Small
					mb={4.5}
					display="block"
					fontSize="12px"
					fontWeight="600"
					color="grey.800"
					textAlign="center"
				>
					Log in with email & password
				</Small>

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
					label="Email or Phone Number"
					placeholder="exmple@mail.com"
					error={!!touched.email && !!errors.email}
					helperText={touched.email && errors.email}
				/>

				<BazaarTextField
					mb={2}
					fullWidth
					size="small"
					name="password"
					label="Password"
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
						// @ts-ignore
						onClick={handleSubmit}
						sx={{
							mb: '1.65rem',
							height: 44,
							borderRadius: '5px 5px 5px 5px',
							border: '1px solid white',
						}}
					>
						Login
					</BazaarButton>
					{/* <BazaarButton
            fullWidth
            color="primary"
            variant="contained"
            // @ts-ignore
            onClick={handleSubmit}
            sx={{
              mb: '1.65rem',
              height: 44,
              borderRadius: '0px 5px 5px 0px',
              border: '1px solid white',
            }}>
            Register
          </BazaarButton> */}
				</Grid>
			</form>

			<SocialButtons redirect="/signup" redirectText="Sign Up" />
			<StyledNavLink href="/">Go to Home</StyledNavLink>
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
