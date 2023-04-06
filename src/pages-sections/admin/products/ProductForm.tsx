import {
	Button,
	Card,
	Dialog,
	DialogContent,
	FormControlLabel,
	FormGroup,
	Grid,
	Switch,
	TextField,
	Typography,
} from '@mui/material'
import { AdminProductsService } from 'src/api/services-admin/products/products.service'
import { Paragraph } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { ContentWrapper } from 'src/components/products/ProductViewDialog'
import { useActions } from 'src/hooks/useActions'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { localize } from 'src/utils/Translate/localize'
import * as yup from 'yup'
import { useProductFetch } from './useProductFetch'
import { ICategory } from 'src/shared/types/product.types'
import AsyncSelect from 'react-select/async'
import { useForm } from 'react-hook-form'
import useYupValidationResolver from 'src/hooks/useYupValidationResolver'
import { productFormValidationSchema } from 'src/components/validationSchema'

// ================================================================
type ProductFormProps = {
	initialValues: any
	handleFormSubmit: (values: any, redirect?: boolean) => void
	update?: boolean
	includeShop?: boolean
	refetch?: () => void
}
// ================================================================

const ProductForm: FC<ProductFormProps> = (props) => {
	const { t: adminT } = useTranslation('admin')
	const { t: commonT } = useTranslation('common')
	const { initialValues, handleFormSubmit, update } = props
	const {
		push,
		query: { id },
	} = useRouter()

	const resolver = useYupValidationResolver(productFormValidationSchema)
	const {
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
		trigger,
		reset,
	} = useForm({
		resolver,
		defaultValues: {
			...initialValues,
			category: initialValues?.category?.id,
			brand: initialValues?.brand?.id,
		},
	})

	const values = getValues()
	const { setCurrentCategory } = useActions()

	// const [openDialog, setOpenDialog] = useState(false)
	const [thisCategory, setThisCategory] = useState<ICategory>(null)

	const { brands, categories } = useProductFetch(props.includeShop, {})

	const toggleDialog = (value) => {
		// setOpenDialog(!openDialog)
		setCurrentCategory(value)

		setValue('category', value)
		trigger('category')
	}

	// const changeCategory = async () => {
	// 	if (categoryID && update) {
	// 		;(async () => {
	// 			await AdminProductsService.update(values?.id as string, {
	// 				category: categoryID,
	// 			})
	// 			props?.refetch()
	// 		})()
	// 	}
	// 	setOpenDialog(false)
	// }

	const handleProductSubmit = (_, event) => {
		event.preventDefault()
		handleFormSubmit(values)
	}

	useEffect(() => {
		setThisCategory(
			categories?.find((category) => category.id === initialValues.category.id)
		)
	}, [categories, initialValues])

	useEffect(() => {
		if (initialValues.category) toggleDialog(initialValues.category.id)
		if (initialValues.brand) setValue('brand', initialValues.brand.id)
		if (initialValues.is_pablished) {
			setValue('is_published', initialValues.is_published)
			trigger('is_published')
		}
	}, [initialValues])

	useEffect(() => {
		console.log('values', values)
	}, [values])

	return (
		<Card sx={{ p: 3, overflow: 'initial' }}>
			<form onSubmit={handleSubmit(handleProductSubmit)}>
				<Grid container spacing={3}>
					<Grid item sm={12} xs={12} display="flex" columnGap={5}>
						<FlexBox
							sx={{
								gridGap: '10px',
								flex: 1,
								'@media (max-width: 600px)': {
									flexDirection: 'column-reverse',
									gridGap: '15px',
								},
							}}
						>
							<TextField
								onChange={(e) => {
									setValue('name', e.target.value)
									trigger('name')
								}}
								defaultValue={initialValues.name}
								error={!!errors.name}
								helperText={!!errors.name && errors.name.message}
								id="name"
								name="name"
								fullWidth
								label={commonT('productName')}
								color="info"
								size="medium"
								placeholder={commonT('productName')}
								sx={{
									'@media (max-width: 600px)': {
										mt: 2,
									},
								}}
							/>

							<FormGroup
								sx={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<FormControlLabel
									control={
										<Switch
											checked={values.is_published}
											// value={values?.is_published}
											onChange={(e) => {
												setValue('is_published', e.target.checked)
												trigger('is_published')
											}}
											color="success"
										/>
									}
									label={
										values.is_published
											? localize({
													ru: 'Опубликовано',
													tr: 'Yayınlandı',
													en: 'Published',
													kg: 'Жарияланды',
													kz: 'Жарияланды',
											  })
											: localize({
													ru: 'Не опубликовано',
													tr: 'Yayınlanmadı',
													en: 'Not published',
													kg: 'Жарияланбады',
													kz: 'Жарияланбады',
											  })
									}
								/>
							</FormGroup>
							<Button
								variant="contained"
								color="success"
								size="small"
								type="submit"
								sx={{
									px: 3,
									whiteSpace: 'nowrap',
									fontSize: '16px',
									fontWeight: 'bold',
									height: '50px',
									minWidth: '150px',
								}}
							>
								{update ? commonT('save') : adminT('createProduct')}
							</Button>
						</FlexBox>
					</Grid>

					<Grid item sm={4} xs={12}>
						<TextField
							onChange={(e) => {
								setValue('unit', e.target.value)
								trigger('unit')
							}}
							defaultValue={initialValues.unit}
							error={!!errors.unit}
							helperText={!!errors.unit && errors.unit.message}
							name="unit"
							id="unit"
							fullWidth
							color="info"
							size="medium"
							label={commonT('unit')}
							placeholder={commonT('unit')}
						/>
					</Grid>

					<Grid item sm={4} xs={6}>
						<AsyncSelect
							defaultOptions={categories?.map((category) => {
								return {
									value: category.id,
									label: `${category.name} - ${category.tax}%`,
								}
							})}
							defaultValue={
								initialValues?.category?.id
									? {
											value: initialValues?.category?.id,
											label: initialValues?.category?.name,
									  }
									: null
							}
							onChange={(selectedCategory) => {
								toggleDialog(selectedCategory.value)
							}}
							maxMenuHeight={400}
							aria-invalid={!!errors.category}
							styles={{
								control: (base, state) => ({
									...base,
									borderColor: state.isFocused
										? '#3f51b5'
										: !!errors.category
										? '#f44336'
										: '#e0e0e0',
									'&:hover': {
										borderColor: state.isFocused
											? '#3f51b5'
											: !!errors.category
											? '#f44336'
											: '#e0e0e0',
									},
									padding: '0.4rem 1rem',
									borderRadius: '0.5rem',
								}),
							}}
							placeholder={localize({
								ru: 'Выберите категорию',
								tr: 'Kategori seçin',
								en: 'Select category',
								kg: 'Категорияны тандоо',
								kz: 'Категорияны тандоо',
							})}
						/>
					</Grid>

					<Grid item sm={4} xs={6}>
						<AsyncSelect
							defaultOptions={brands?.map((brand) => {
								return {
									value: brand.id,
									label: brand.name,
								}
							})}
							defaultValue={
								initialValues?.brand?.id
									? {
											value: initialValues?.brand?.id,
											label: initialValues?.brand?.name,
									  }
									: null
							}
							onChange={(selectedBrand) => {
								setValue('brand', selectedBrand.value)
								trigger('brand')
							}}
							styles={{
								control: (base, state) => ({
									...base,
									borderColor: state.isFocused
										? '#3f51b5'
										: !!errors.category
										? '#f44336'
										: '#e0e0e0',
									'&:hover': {
										borderColor: state.isFocused
											? '#3f51b5'
											: !!errors.category
											? '#f44336'
											: '#e0e0e0',
									},
									padding: '0.4rem 1rem',
									borderRadius: '0.5rem',
								}),
							}}
							placeholder={localize({
								ru: 'Выберите бренд',
								tr: 'Marka seçin',
								en: 'Select brand',
								kg: 'Бренд тандоо',
								kz: 'Бренд тандоо',
							})}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							onChange={(e) => {
								setValue('description', e.target.value)
								trigger('description')
							}}
							defaultValue={values.description}
							error={!!errors.description}
							helperText={!!errors.description && errors.description.message}
							id="description"
							name="description"
							multiline
							rows={4}
							fullWidth
							label={commonT('description')}
							color="info"
							size="medium"
							placeholder={commonT('description')}
						/>
					</Grid>
				</Grid>
			</form>

			{/* <Dialog
				open={openDialog}
				maxWidth={false}
				onClose={() => setOpenDialog(false)}
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
									{localize(translations.warning)}
								</Typography>

								<Paragraph textAlign="center" my={2} color="error">
									{localize(translations.warningInfo)}
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
										onClick={() => setOpenDialog(false)}
									>
										{localize(translations.cancel)}
									</Button>

									<Button
										variant="contained"
										sx={{
											color: 'dark',
											borderRadius: '5px',
										}}
										// onClick={changeCategory}
									>
										{localize(translations.ok)}
									</Button>
								</FlexBox>
							</Grid>
						</Grid>
					</ContentWrapper>
				</DialogContent>
			</Dialog> */}
		</Card>
	)
}

export default ProductForm
