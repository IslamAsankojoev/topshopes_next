import Place from '@mui/icons-material/Place'
import { Box, Button, Grid, TextField } from '@mui/material'
import { AddressesService } from 'api/services/addresses/addresses.service'
import Card1 from 'components/Card1'
import UserDashboardHeader from 'components/header/UserDashboardHeader'
import CustomerDashboardLayout from 'components/layouts/customer-dashboard'
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations'
import Loading from 'components/Loading'
import { Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import * as yup from 'yup'

const AddressEditor: NextPageAuth = () => {
	const {
		push,
		query: { id },
	} = useRouter()

	const { data, isLoading } = useQuery(
		'get one user address',
		() => AddressesService.get(id as string),
		{
			enabled: !!id,
		}
	)

	// handle form submit
	const handleFormSubmit = async (values: any) => {
		console.log(values)
		await AddressesService.update(id as string, values)

		push('/address')
	}

	return data ? (
		<CustomerDashboardLayout>
			<UserDashboardHeader
				icon={Place}
				title="Update Address"
				navigation={<CustomerDashboardNavigation />}
				button={
					<Link href="/address" passHref>
						<Button color="primary" sx={{ bgcolor: 'primary.light', px: 4 }}>
							Back to Address
						</Button>
					</Link>
				}
			/>

			<Card1>
				{isLoading ? (
					<Loading />
				) : (
					<Formik
						onSubmit={handleFormSubmit}
						initialValues={data || initialValues}
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
												placeholder="City"
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
												placeholder="Country"
												value={values.country}
												onChange={handleChange}
												error={!!touched.country && !!errors.country}
												helperText={touched.country && errors.country}
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												placeholder="Street"
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
												placeholder="Phone"
												name="phone"
												onBlur={handleBlur}
												value={values.phone}
												onChange={handleChange}
												error={!!touched.phone && !!errors.phone}
												helperText={touched.phone && errors.phone}
											/>
										</Grid>
									</Grid>
								</Box>

								<Button type="submit" variant="contained" color="primary">
									Save Changes
								</Button>
							</form>
						)}
					</Formik>
				)}
			</Card1>
		</CustomerDashboardLayout>
	) : null
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

AddressEditor.isOnlyUser = true

export default AddressEditor
