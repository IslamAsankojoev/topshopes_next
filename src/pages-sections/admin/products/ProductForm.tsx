import { Button, Card, Grid, MenuItem, TextField } from '@mui/material'
import DropZone from 'components/DropZone'
import { useFormik } from 'formik'
import React, { FC } from 'react'
import * as yup from 'yup'
import { Assign, ObjectShape } from 'yup/lib/object'
import MultipleSelect from '../../../components/multiple-select/MultipleSelect'
import {
	getIdArray,
	MultipleSelectDataFormat,
} from '../../../components/multiple-select/MultipleSelectHelper'
import styled from '@emotion/styled'
import { ProductFetchTypes, useProductFetch } from './useProductFetch'
import { checkChangeThumbnail } from './productFormHelper'
import { objToFormData } from '../../../utils/formData'
import { Formik } from 'formik'

// ================================================================
type ProductFormProps = {
	initialValues: any
	handleFormSubmit: (values: any) => void
	validationSchema: yup.ObjectSchema<Assign<ObjectShape, any>>
	productFetch: ProductFetchTypes
	update?: boolean
}
// ================================================================

const ProductForm: FC<ProductFormProps> = (props) => {
	const {
		initialValues,
		validationSchema,
		handleFormSubmit,
		productFetch,
		update,
	} = props

	//data fetching
	const { categories, size, colors, brands, shops } = productFetch

	//states for multiple selects
	const [categoryState, setCategoryState] = React.useState(
		MultipleSelectDataFormat(update ? initialValues.categories : [])
	)
	const [sizeState, setSizeState] = React.useState(
		MultipleSelectDataFormat(update ? initialValues.sizes : [])
	)
	const [colorsState, setColorsState] = React.useState(
		MultipleSelectDataFormat(update ? initialValues.colors : [])
	)
	const [imageState, setImageState] = React.useState(
		initialValues.thumbnail ? initialValues.thumbnail : null
	)

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
		onSubmit: async () => {
			console.log(values)
			const submitData = {
				...checkChangeThumbnail(values),
				categories: getIdArray(categoryState),
				sizes: getIdArray(sizeState),
				colors: getIdArray(colorsState),
			}
			handleFormSubmit(
				initialValues.thumbnail === values.thumbnail
					? submitData
					: { ...submitData, thumbnail: values.thumbnail }
			)
		},
		validationSchema: validationSchema,
	})

	return (
		<Card sx={{ p: 6 }}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid item sm={6} xs={12}>
						<TextField
							fullWidth
							name="title"
							label="Title"
							color="info"
							size="medium"
							placeholder="Title"
							value={values.title}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.title && !!errors.title}
							helperText={touched.title && errors.title}
						/>
					</Grid>

					<Grid item sm={6} xs={12}>
						<MultipleSelect
							names={categories}
							chosenName={categoryState}
							setChosenName={setCategoryState}
							label={'Categories'}
						/>
					</Grid>

					<Grid item sm={imageState ? 6 : 12} xs={12}>
						<DropZone
							name={'thumbnail'}
							onBlur={handleBlur}
							required={!values.thumbnail}
							onChange={(file: any) => {
								setFieldValue('thumbnail', file)
								setImageState(URL.createObjectURL(file))
							}}
							multiple={false}
							accept={'image/*'}
						/>
					</Grid>

					{imageState ? (
						<Grid sx={{ width: '100%', height: '100%' }} item sm={6} xs={12}>
							<PrevImg src={imageState} alt={'picture'} />
						</Grid>
					) : null}

					<Grid sm={6} item xs={12}>
						<MultipleSelect
							names={size}
							chosenName={sizeState}
							setChosenName={setSizeState}
							label={'Sizes'}
						/>
					</Grid>

					<Grid item sm={6} xs={12}>
						<MultipleSelect
							names={colors}
							chosenName={colorsState}
							setChosenName={setColorsState}
							label={'Colors'}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<TextField
							fullWidth
							name="rating"
							label="Rating"
							color="info"
							size="medium"
							placeholder="Rating"
							onBlur={handleBlur}
							value={values.rating}
							onChange={handleChange}
							error={!!touched.rating && !!errors.rating}
							helperText={touched.rating && errors.rating}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<TextField
							fullWidth
							name="price"
							color="info"
							size="medium"
							type="number"
							onBlur={handleBlur}
							value={values.price}
							label="Regular Price"
							onChange={handleChange}
							placeholder="Regular Price"
							error={!!touched.price && !!errors.price}
							helperText={touched.price && errors.price}
						/>
					</Grid>

					<Grid item sm={6} xs={12}>
						<TextField
							fullWidth
							color="info"
							size="medium"
							name="unit"
							label="Unit"
							onBlur={handleBlur}
							onChange={handleChange}
							placeholder="Unit"
							value={values.unit}
							error={!!touched.unit && !!errors.unit}
							helperText={touched.unit && errors.unit}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<TextField
							fullWidth
							type={'number'}
							color="info"
							size="medium"
							name="discount"
							label="Discount"
							onBlur={handleBlur}
							onChange={handleChange}
							placeholder="Discount"
							value={values.discount}
							error={!!touched.discount && !!errors.discount}
							helperText={touched.discount && errors.discount}
						/>
					</Grid>

					<Grid item sm={6} xs={12}>
						<TextField
							select
							fullWidth
							color="info"
							size="medium"
							name="brand"
							onBlur={handleBlur}
							placeholder="Brands"
							onChange={handleChange}
							value={values.brand}
							label="Select Brand"
							error={!!touched.brand && !!errors.brand}
							helperText={touched.brand && errors.brand}
						>
							{brands?.map((brand) => (
								<MenuItem key={brand.name} value={brand.id}>
									{brand.name}
								</MenuItem>
							))}
						</TextField>
					</Grid>

					<Grid item sm={6} xs={12}>
						<TextField
							select
							fullWidth
							color="info"
							size="medium"
							name="shop"
							onBlur={handleBlur}
							placeholder="Shop"
							onChange={handleChange}
							value={values.shop}
							label="Select Shop"
							error={!!touched.shop && !!errors.shop}
							helperText={touched.shop && errors.shop}
						>
							{shops?.map((shop) => (
								<MenuItem key={shop.name} value={shop.id}>
									{shop.name}
								</MenuItem>
							))}
						</TextField>
					</Grid>

					<Grid item sm={6} xs={12}>
						<Button variant="contained" color="info" type="submit">
							{update ? 'Save product' : 'Create product'}
						</Button>
					</Grid>
				</Grid>
			</form>
		</Card>
	)
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

export default ProductForm
