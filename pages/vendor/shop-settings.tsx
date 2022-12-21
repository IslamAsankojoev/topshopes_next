import styled from '@emotion/styled'
import { Box, Button, Card, Grid, TextField } from '@mui/material'
import { ShopService } from 'api/services/shop/shop.service'
import DropZone from 'components/DropZone'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import { H3, Paragraph } from 'components/Typography'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IShop } from 'shared/types/shop.types'
import { formData } from 'utils/formData'
import { removeImg } from 'utils/removeImg'
import * as Yup from 'yup'

const initialValues = {
	name: '',
	phone: '',
	address: '',
	email: '',
	cover_picture: '',
	profile_picture: '',
}

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Shop Name is required!'),
	email: Yup.string()
		.email('invalid email')
		.required('Shop email is required!'),
	address: Yup.string().required('Address is required!'),
	phone: Yup.string().required('Shop Address is required!'),
	cover_picture: Yup.mixed().required('Orders is required!'),
	profile_picture: Yup.mixed().required('Orders is required!'),
})

const ShopSettings: NextPageAuth = () => {
	// const [links, setLinks] = useState([
	// 	{ id: 1, name: 'Links', value: 'https://www.productbanner.com' },
	// ])

	// const handleAddLink = () => {
	// 	setLinks((state) => [
	// 		...state,
	// 		{ id: Date.now(), name: 'Links', value: 'https://www.google.com' },
	// 	])
	// }

	// const handleDeleteLink = (id: number) => () => {
	// 	setLinks((state) => state.filter((item) => item.id !== id))
	// }

	const { push } = useRouter()

	// shop fetching
	const { data: shop, isLoading } = useQuery('shop get', ShopService.getList)

	// shop mutation
	const { mutateAsync: createAsync } = useMutation(
		'shop create',
		(data: FormData) => ShopService.create(data),
		{
			onSuccess: () => {
				toast.success('shop successfully created')
				push('vendor/products')
			},
		}
	)

	const { mutateAsync: updateAsync } = useMutation(
		'shop update',
		(data: FormData) => ShopService.update(null, data),
		{
			onSuccess: () => {
				toast.success('shop successfully updated')
				push('vendor/products')
			},
		}
	)

	// images
	const [coverPicture, setCoverPicture] = React.useState(
		shop?.length ? shop[0]?.cover_picture : ''
	)
	const [profilePicture, setProfilePicture] = React.useState(
		shop?.length ? shop[0]?.profile_picture : ''
	)

	// submiting
	const handleFormSubmit = (values: IShop) => {
		if (shop.length) {
			const checkCoverPicture = removeImg(values, 'cover_picture')
			const checkProfilePicture = removeImg(
				checkCoverPicture,
				'profile_picture'
			)
			updateAsync(formData(checkProfilePicture))
			return
		}
		createAsync(formData(values))
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
		initialValues: shop?.length ? shop[0] : initialValues,
		onSubmit: handleFormSubmit,
		validationSchema: validationSchema,
	})

	// if (isLoading) {
	// 	return <Loading />
	// }

	return !isLoading ? (
		<Box py={4} maxWidth={740} margin="auto">
			<H3 mb={2}>Shop Settings</H3>

			<Card sx={{ p: 3 }}>
				<Paragraph fontWeight={700} mb={4}>
					Basic Settings
				</Paragraph>

				<form onSubmit={handleSubmit}>
					<Grid container alignItems={'center'} spacing={3}>
						<Grid item sx={{ alignContent: 'center' }} xs={12}>
							<TextField
								fullWidth
								color="info"
								size="medium"
								name="name"
								label="Shop Name *"
								onBlur={handleBlur}
								value={values.name}
								onChange={handleChange}
								helperText={touched.name && errors.name}
								error={Boolean(errors.name && touched.name)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								color="info"
								size="medium"
								name="email"
								label="email"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.email}
								helperText={touched.email && errors.email}
								error={Boolean(errors.email && touched.email)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								color="info"
								size="medium"
								name="address"
								onBlur={handleBlur}
								placeholder="address"
								label="Select address"
								onChange={handleChange}
								value={values.address}
								helperText={touched.address && errors.address}
								error={Boolean(errors.address && touched.address)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								color="info"
								size="medium"
								name="phone"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.phone}
								label="phone"
								helperText={touched.phone && errors.phone}
								error={Boolean(errors.phone && touched.phone)}
							/>
						</Grid>

						<Grid item sm={coverPicture ? 6 : 12} xs={12}>
							<h3 style={{ margin: 0 }}>Cover picture</h3>
							<DropZone
								name={'cover_picture'}
								onBlur={handleBlur}
								onChange={(file: File[]) => {
									setFieldValue('cover_picture', file[0])
									setCoverPicture(URL.createObjectURL(file[0]))
								}}
								multiple={false}
								accept={'image/*,.web'}
							/>
							{!!touched.cover_picture && !!errors.cover_picture ? (
								<h4 style={{ color: 'red', textAlign: 'center' }}>
									{touched.cover_picture && errors.cover_picture}
								</h4>
							) : null}
						</Grid>

						{coverPicture ? (
							<Grid sx={{ width: '100%', height: '100%' }} item sm={6} xs={12}>
								<PrevImg src={coverPicture} alt={'picture'} />
							</Grid>
						) : null}

						<Grid item sm={profilePicture ? 6 : 12} xs={12}>
							<h3 style={{ margin: 0 }}>Profile picture</h3>
							<DropZone
								name={'profile_picture'}
								onBlur={handleBlur}
								onChange={(file: File[]) => {
									setFieldValue('profile_picture', file[0])
									setProfilePicture(URL.createObjectURL(file[0]))
								}}
								multiple={false}
								accept={'image/*,.web'}
							/>
							{!!touched.profile_picture && !!errors.profile_picture ? (
								<h4 style={{ color: 'red', textAlign: 'center' }}>
									{touched.profile_picture && errors.profile_picture}
								</h4>
							) : null}
						</Grid>

						{profilePicture ? (
							<Grid
								sx={{
									width: '100%',
									height: '100%',
								}}
								item
								sm={6}
								xs={12}
							>
								<PrevImg src={profilePicture} alt={'picture'} />
							</Grid>
						) : null}
					</Grid>

					<Button
						sx={{ m: '20px 0' }}
						fullWidth
						type="submit"
						color="info"
						variant="contained"
					>
						Save Changes
					</Button>
				</form>

				{/* <Divider sx={{ my: 4 }} />

				<Paragraph fontWeight={700} mb={2}>
					Shop Page Settings
				</Paragraph>

				<Stack spacing={3} mb={3}>
					<DropZone
						onChange={(files) => console.log(files)}
						title="Main Banner (1920 x 360) *"
						imageSize="We had to limit height to maintian consistancy. Some device both side of the banner might cropped for height limitation."
					/>

					<TextField
						select
						fullWidth
						color="info"
						size="medium"
						name="features"
						placeholder="Product Features"
						label="Product Features"
						defaultValue="electronics"
					>
						<MenuItem value="electronics">Electronics</MenuItem>
						<MenuItem value="fashion">Fashion</MenuItem>
					</TextField>

					<DropZone
						onChange={(files) => console.log(files)}
						title="All products page banner * (Recommended size 1025x120)"
						imageSize="We had to limit height to maintian consistancy. Some device both side of the banner might cropped for height limitation."
					/>
				</Stack> */}

				{/* <Box mb={4}>
					{links.map((item) => (
						<FlexBox gap={2} alignItems="center" mb={2} key={item.id}>
							<TextField
								fullWidth
								color="info"
								size="medium"
								label="Links"
								defaultValue={item.value}
							/>

							<Box flexShrink={0}>
								<IconButton onClick={handleDeleteLink(item.id)}>
									<Delete sx={{ color: 'grey.600' }} />
								</IconButton>
							</Box>
						</FlexBox>
					))}

					<Button color="info" variant="outlined" onClick={handleAddLink}>
						Add Link
					</Button>
				</Box> */}

				{/* <Button color="info" variant="contained">
					Save Changes
				</Button> */}
			</Card>
		</Box>
	) : null
}

const PrevImg = styled.img`
	max-width: 408px;
	max-height: 220px;
	width: 100%;
	height: 100%;
	object-fit: contain;
	border-radius: 10px;
	margin: auto;
`

ShopSettings.isOnlyUser = true

ShopSettings.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default ShopSettings
