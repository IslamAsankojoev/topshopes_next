import styled from '@emotion/styled'
import { Box, Button, Card, Grid, TextField } from '@mui/material'
import { ShopService } from 'src/api/services/shop/shop.service'
import DropZone from 'src/components/DropZone'
import { H3, Paragraph } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { useFormik } from 'formik'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IShop } from 'src/shared/types/shop.types'
import { formData } from 'src/utils/formData'
import { removeImg } from 'src/utils/removeImg'
import * as Yup from 'yup'
import { localize } from 'src/utils/Translate/localize'

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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'store',
				'common',
				'admin',
			])),
		},
	}
}

const ShopSettings: NextPageAuth = () => {
	const { t: storeT } = useTranslation('store')
	const { t: commonT } = useTranslation('common')
	const { push } = useRouter()

	// shop fetching
	const { data: shop, isLoading } = useQuery(
		'shop get',
		() => ShopService.getList(),
		{
			select: (data) => {
				const { products, socialLinks, ...shopData } = data
				return shopData
			},
			onError: () => {
				toast.info(
					localize({
						ru: 'Для того чтобы добавлять товары, необходимо создать магазин и заполнить основные настройки',
						tr: 'Ürün eklemek için önce mağaza oluşturmanız ve temel ayarlarınızı doldurmanız gerekmektedir',
						en: 'To add products, you must first create a store and fill in the basic settings',
					}),
					{
						autoClose: 20000,
					}
				)
			},
		}
	)

	// shop mutation
	const { mutateAsync: createAsync } = useMutation(
		'shop create',
		(data: FormData) => ShopService.create(data),
		{
			onSuccess: () => {
				push('/vendor/products')
			},
		}
	)

	const { mutateAsync: updateAsync } = useMutation(
		'shop update',
		(data: FormData) => ShopService.update(null, data),
		{
			onSuccess: () => {
				toast.success(
					localize({
						ru: 'Обновлен',
						tr: 'Güncellendi',
						en: 'Updated',
					})
				)
				push('/vendor/products')
			},
		}
	)

	// images
	const [coverPicture, setCoverPicture] = useState(shop?.cover_picture || '')
	const [profilePicture, setProfilePicture] = useState(
		shop?.profile_picture || ''
	)

	// submiting
	const handleFormSubmit = (values: IShop) => {
		if (shop) {
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

	const handleDelete = async () => {
		if (
			!window.confirm(
				localize({
					ru: 'Вы действительно хотите удалить магазин?',
					tr: 'Mağazayı silmek istediğinize emin misiniz?',
					en: 'Are you sure you want to delete the store?',
				})
			)
		)
			return

		ShopService.delete(null)
		toast.success(
			localize({
				ru: 'Магазин удален',
				tr: 'Mağaza silindi',
				en: 'Store deleted',
			})
		)
		push('/vendor/products')
	}

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		setFieldValue,
		setValues,
	} = useFormik({
		initialValues: shop || initialValues,
		onSubmit: handleFormSubmit,
		validationSchema,
	})
	useEffect(() => {
		if (shop) {
			setValues(shop)
			setCoverPicture(shop.cover_picture)
			setProfilePicture(shop.profile_picture)
			return null
		}
	}, [shop])

	return !isLoading ? (
		<Box py={4} maxWidth={740} margin="auto">
			<H3 mb={2}>{storeT('shopSettings')}</H3>
			<Card sx={{ p: 3 }}>
				<Paragraph fontWeight={700} mb={4}>
					{storeT('basicSettings')}
				</Paragraph>
				<form onSubmit={handleSubmit}>
					<Grid container alignItems={'center'} spacing={3}>
						<Grid item sx={{ alignContent: 'center' }} xs={12}>
							<TextField
								fullWidth
								color="info"
								size="medium"
								name="name"
								label={storeT('shopName')}
								placeholder={storeT('shopName')}
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
								placeholder="email"
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
								placeholder={commonT('address')}
								label={commonT('address')}
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
								label={commonT('phone')}
								placeholder={commonT('phone')}
								helperText={touched.phone && errors.phone}
								error={Boolean(errors.phone && touched.phone)}
							/>
						</Grid>

						<Grid item sm={coverPicture ? 6 : 12} xs={12}>
							<h3 style={{ margin: 0 }}>{storeT('coverPicture')}</h3>
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
							<h3 style={{ margin: 0 }}>{storeT('profilePicture')}</h3>
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
						{shop ? (
							<Grid item sm={6} xs={12}>
								<Button
									sx={{ m: '20px 0' }}
									color="error"
									variant="contained"
									onClick={handleDelete}
									fullWidth
								>
									{storeT('deleteShop')}
								</Button>
							</Grid>
						) : null}

						<Grid item sm={6} xs={12}>
							<Button
								sx={{ m: '20px 0' }}
								type="submit"
								color="info"
								variant="contained"
								fullWidth
							>
								{shop ? commonT('saveChanges') : storeT('createShop')}
							</Button>
						</Grid>
					</Grid>
				</form>

				{/* <Box mb={4}>
					{links?.map((item) => (
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

ShopSettings.isOnlySeller = true

ShopSettings.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default ShopSettings
