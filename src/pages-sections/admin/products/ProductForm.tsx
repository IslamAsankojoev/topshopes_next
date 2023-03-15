import {
	Autocomplete,
	Button,
	Card,
	Dialog,
	DialogContent,
	Grid,
	TextField,
	Typography,
} from '@mui/material'
import { AdminProductsService } from 'src/api/services-admin/products/products.service'
import { Paragraph } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { ContentWrapper } from 'src/components/products/ProductViewDialog'
import { useFormik } from 'formik'
import { useActions } from 'src/hooks/useActions'
import { useTranslation } from 'next-i18next'
import router, { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { dynamicLocalization } from 'src/utils/Translate/dynamicLocalization'
import * as yup from 'yup'
import { Assign, ObjectShape } from 'yup/lib/object'

import { useProductFetch } from './useProductFetch'

// ================================================================
type ProductFormProps = {
	initialValues: any
	handleFormSubmit: (values: any, redirect?: boolean) => void
	validationSchema: yup.ObjectSchema<Assign<ObjectShape, any>>
	update?: boolean
	includeShop?: boolean
	refetch?: () => void
}
// ================================================================

const ProductForm: FC<ProductFormProps> = (props) => {
	// dialog
	const [openDialog, setOpenDialog] = useState(false)
	const [categoryValue, setCategoryValue] = useState<any>({})

	const toggleDialog = (category?: { id: string | number; name: string }) => {
		setOpenDialog(!openDialog)
		setCategoryValue(category)
	}

	const id = useRouter().query.id

	const changeCategory = async () => {
		setFieldValue('category', categoryValue)
		setCurrentCategory(values.category?.id || '')

		if (values.category?.id && update) {
			;(async () => {
				await AdminProductsService.update(values?.id as string, {
					category: categoryValue.id,
				})
				props.refetch && (await props.refetch())
			})()
		}
		setOpenDialog(false)
	}

	// translate
	const { t: adminT } = useTranslation('admin')
	const { t: commonT } = useTranslation('common')

	const { initialValues, validationSchema, handleFormSubmit, update } = props

	const { push } = useRouter()

	// states
	const [redirect, setRedirect] = useState<boolean>(false)

	const [categoriesSearch, setCategoriesSearch] = useState<string>('')
	const [brandsSearch, setBrandsSearch] = useState<string>('')
	const [shopsSearch, setShopsSearch] = useState<string>('')

	// actions
	const { setCurrentCategory } = useActions()

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
		onSubmit: () => {
			const { reviews, shop, variants, category, brand, ...other } = values
			const clearData = { ...other, category: category?.id, brand: brand?.id }
			handleFormSubmit(clearData, redirect)
		},
		validationSchema: validationSchema,
	})

	//data fetching
	const { brands, categories } = useProductFetch(props.includeShop, {
		categoriesSearch,
		brandsSearch,
		shopsSearch,
	})

	const autocompleteProps = {
		category: {
			name: 'category',
			options: categories || [],
			getOptionLabel: (option) =>
				option?.name ? option?.name + ` - (${option?.tax}%)` : '',
			error: !!touched.category && !!errors.category,
			helperText: touched.category && errors.category,
		},
		brand: {
			name: 'brand',
			options: brands || [],
			getOptionLabel: (option) => option?.name || '',
			error: !!touched.brand && !!errors.brand,
			helperText: touched.brand && errors.brand,
		},
	}

	useEffect(() => {
		setCurrentCategory(values.category?.id || '')
	}, [values.category])

	return (
		<Card sx={{ p: 6 }}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid item sm={6} xs={12}>
						<TextField
							fullWidth
							name="name"
							label={
								<Typography
									fontWeight="650"
									color="grey.500"
									textTransform="capitalize"
									fontSize="16"
								>
									{commonT('name')}
								</Typography>
							}
							color="info"
							size="medium"
							placeholder={commonT('name')}
							value={values.name}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.name && !!errors.name}
							helperText={touched.name && errors.name}
						/>
					</Grid>

					<Grid item sm={6} xs={12}>
						<TextField
							fullWidth
							color="info"
							size="medium"
							name="unit"
							label={
								<Typography
									fontWeight="650"
									color="grey.500"
									textTransform="capitalize"
									fontSize="16"
								>
									{commonT('unit')}
								</Typography>
							}
							onBlur={handleBlur}
							onChange={handleChange}
							placeholder={commonT('unit')}
							value={values.unit}
							error={!!touched.unit && !!errors.unit}
							helperText={touched.unit && errors.unit}
						/>
					</Grid>

					<Grid item sm={6} xs={12}>
						<Autocomplete
							{...autocompleteProps.category}
							disabled={update}
							fullWidth
							color="info"
							size="medium"
							placeholder={commonT('categories')}
							value={values.category}
							// @ts-ignore
							onChange={(
								event: any,
								newValue: { id: string | number; name: string } | null
							) => {
								if (newValue) toggleDialog(newValue)
							}}
							onBlur={handleBlur}
							renderInput={(params) => (
								<TextField
									error={autocompleteProps.category.error}
									helperText={autocompleteProps.category.helperText}
									{...params}
									onChange={({ target }) => {
										setCategoriesSearch(target.value)
									}}
									label={
										<Typography
											fontWeight="650"
											color="grey.500"
											textTransform="capitalize"
											fontSize="16"
										>
											{commonT('categories')}
										</Typography>
									}
								/>
							)}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<Autocomplete
							{...autocompleteProps.brand}
							fullWidth
							color="info"
							size="medium"
							onBlur={handleBlur}
							// @ts-ignore
							onChange={(
								_: any,
								newValue: { id: string | number; label: string } | null
							) => {
								setFieldValue('brand', newValue)
							}}
							placeholder={commonT('brand')}
							value={values.brand}
							renderInput={(params) => (
								<TextField
									{...params}
									error={autocompleteProps.brand.error}
									helperText={autocompleteProps.brand.helperText}
									onChange={({ target }) => {
										setBrandsSearch(target.value)
									}}
									label={
										<Typography
											fontWeight="650"
											color="grey.500"
											textTransform="capitalize"
											fontSize="16"
										>
											{commonT('brand')}
										</Typography>
									}
								/>
							)}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							multiline
							rows={4}
							fullWidth
							name="description"
							label={
								<Typography
									fontWeight="650"
									color="grey.500"
									textTransform="capitalize"
									fontSize="16"
								>
									{commonT('description')}
								</Typography>
							}
							color="info"
							size="medium"
							placeholder={commonT('description')}
							value={values.description}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.description && !!errors.description}
							helperText={touched.description && errors.description}
						/>
					</Grid>

					<Grid item xs={12}>
						<Card
							sx={{
								border: '1px solid #E4E7EB',
								position: 'fixed',
								display: 'flex',
								bottom: 0,
								right: 0,
								zIndex: 100,
								padding: '8px!important',
								backgroundColor: '#F7F9FC',
								'@media (max-width: 768px)': {
									width: '100%',
									justifyContent: 'center',
								},
							}}
						>
							<FlexBox
								flexWrap={'wrap'}
								justifyContent={'flex-end'}
								sx={{ gridGap: '10px' }}
							>
								{update ? (
									<>
										<Button
											onClick={() =>
												push({
													pathname: `/product/${id}/`,
												})
											}
											variant="contained"
											color="secondary"
											size="small"
										>
											{adminT('goView')}
										</Button>
										<Button
											variant="contained"
											color="primary"
											type="submit"
											size="small"
										>
											{adminT('saveExit')}
										</Button>
									</>
								) : null}
								<Button
									onClick={() => setRedirect(true)}
									variant="contained"
									color="success"
									type="submit"
									size="small"
								>
									{update ? commonT('save') : adminT('createProduct')}
								</Button>
							</FlexBox>
						</Card>
					</Grid>
				</Grid>
			</form>

			<Dialog
				open={openDialog}
				maxWidth={false}
				onClose={toggleDialog}
				sx={{ zIndex: 1501 }}
			>
				<DialogContent
					sx={{
						maxWidth: 500,
						width: '100%',
						backgroundColor: 'rgb(253, 237, 237)',
						padding: '10px',
					}}
				>
					<ContentWrapper
						style={{
							padding: '20px',
							border: '2px solid rgb(212, 60, 60)',
							borderRadius: '10px',
						}}
					>
						<Grid container spacing={3}>
							<Grid item xs={12} alignSelf="center">
								<Typography
									textAlign="center"
									color="error"
									fontSize="20px"
									fontWeight="700"
								>
									{dynamicLocalization(translations.warning)}
								</Typography>

								<Paragraph textAlign="center" my={2} color="error">
									{dynamicLocalization(translations.warningInfo)}
								</Paragraph>
							</Grid>
							<Grid item xs={12} alignSelf="center">
								<FlexBox
									flexWrap={'wrap'}
									justifyContent={'center'}
									sx={{ gridGap: '10px' }}
								>
									<Button
										variant="contained"
										color="error"
										onClick={() => toggleDialog()}
									>
										{dynamicLocalization(translations.cancel)}
									</Button>

									<Button
										variant="contained"
										sx={{
											color: 'dark',
											borderRadius: '5px',
										}}
										onClick={changeCategory}
									>
										{dynamicLocalization(translations.ok)}
									</Button>
								</FlexBox>
							</Grid>
						</Grid>
					</ContentWrapper>
				</DialogContent>
			</Dialog>
		</Card>
	)
}

const translations = {
	warning: {
		en: 'WARNING!',
		ru: 'ПРЕДУПРЕЖДЕНИЕ!',
		tr: 'UYARI!',
		kz: 'ЕСКЕРТУ!',
		kg: 'ЭСКЕРТҮҮ!',
	},
	warningInfo: {
		en: 'All already existing attributes will be removed, do you agree with that?',
		ru: 'Все уже существующие атрибуты будут удалены, вы с этим согласны?',
		tr: 'Halihazırda var olan tüm özellikler kaldırılacak, buna katılıyor musunuz?',
		kz: 'Барлық бұрыннан бар атрибуттар жойылады, сіз мұнымен келісесіз бе?',
		kg: 'Бар болгон атрибуттардын баары өчүрүлөт, буга макулсузбу?',
	},
	ok: {
		en: 'Ok',
		ru: 'Хорошо',
		tr: 'Tamam',
		kz: 'Жарайды',
		kg: 'Макул',
	},
	cancel: {
		en: 'Cancel',
		ru: 'Отмена',
		tr: 'İptal',
		kz: 'Болдырмау',
		kg: 'Жокко чыгаруу',
	},
}

export default ProductForm
