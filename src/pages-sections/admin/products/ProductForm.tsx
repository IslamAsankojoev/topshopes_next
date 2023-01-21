import styled from '@emotion/styled'
import {
	Autocomplete,
	Button,
	Card,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material'
import { FlexBox } from 'components/flex-box'
import { useFormik } from 'formik'
import { useActions } from 'hooks/useActions'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { IBrand, ICategory } from 'shared/types/product.types'
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
}
// ================================================================

const ProductForm: FC<ProductFormProps> = (props) => {
	const { t: adminT } = useTranslation('admin')
	const { t: commonT } = useTranslation('common')

	const { initialValues, validationSchema, handleFormSubmit, update } = props

	const { push } = useRouter()

	// states
	const [redirect, setRedirect] = React.useState<boolean>(false)

	const [categoriesSearch, setCategoriesSearch] = React.useState<string>('')
	const [brandsSearch, setBrandsSearch] = React.useState<string>('')
	const [shopsSearch, setShopsSearch] = React.useState<string>('')

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
			const clearData = props.includeShop
				? { ...other, shop: shop?.id, category: category?.id, brand: brand?.id }
				: { ...other, category: category?.id, brand: brand?.id }
			handleFormSubmit(clearData, redirect)
		},
		validationSchema: validationSchema,
	})

	//data fetching
	const { brands, shops, categories } = useProductFetch(props.includeShop, {
		categoriesSearch,
		brandsSearch,
		shopsSearch,
	})

	const autocompleteProps = {
		category: {
			name: 'category',
			options: categories || [],
			getOptionLabel: (option) => option?.name || '',
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
		shop: {
			name: 'shop',
			options: shops || [],
			getOptionLabel: (option) => option?.name || '',
			error: !!touched.shop && !!errors.shop,
			helperText: touched.shop && errors.shop,
		},
	}

	React.useEffect(() => {
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
									color="grey.800"
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
									color="grey.800"
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
							fullWidth
							color="info"
							size="medium"
							placeholder={commonT('categories')}
							value={values.category}
							// @ts-ignore
							onChange={(
								event: any,
								newValue: { id: string | number; label: string } | null
							) => {
								if (
									!window.confirm(
										'all already existing attributes will be removed, do you agree with that?'
									)
								) {
									return
								}
								setFieldValue('category', newValue)
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
											color="grey.800"
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
											color="grey.800"
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

					{props.includeShop ? (
						<Grid item xs={12}>
							<Autocomplete
								{...autocompleteProps.shop}
								fullWidth
								color="info"
								size="medium"
								onBlur={handleBlur}
								placeholder={commonT('shop')}
								value={values.shop}
								// @ts-ignore
								onChange={(
									_: any,
									newValue: { id: string | number; label: string } | null
								) => {
									setFieldValue('shop', newValue)
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										error={autocompleteProps.shop.error}
										helperText={autocompleteProps.shop.helperText}
										onChange={({ target }) => {
											setShopsSearch(target.value)
										}}
										label={commonT('shop')}
									/>
								)}
							/>
						</Grid>
					) : null}

					<Grid item xs={12}>
						<TextField
							multiline
							rows={4}
							fullWidth
							name="description"
							label={
								<Typography
									fontWeight="650"
									color="grey.800"
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
								bottom: 10,
								right: 10,
								zIndex: 100,
								padding: '10px!important',
								backgroundColor: '#F7F9FC',
								'@media (max-width: 768px)': {
									width: '95%',
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
													pathname: '/product/[id]',
													query: { trueID: values.id, id: values.slug },
												})
											}
											variant="contained"
											color="secondary"
										>
											{adminT('goView')}
										</Button>
										<Button variant="contained" color="primary" type="submit">
											{adminT('saveExit')}
										</Button>
									</>
								) : null}
								<Button
									onClick={() => setRedirect(true)}
									variant="contained"
									color="primary"
									type="submit"
									sx={{
										px: 4,
									}}
								>
									{update ? commonT('save') : adminT('createProduct')}
								</Button>
							</FlexBox>
						</Card>
					</Grid>
				</Grid>
			</form>
		</Card>
	)
}

export default ProductForm
