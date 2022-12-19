import {
	Button,
	Card,
	Grid,
	ImageList,
	ImageListItem,
	MenuItem,
	TextField,
} from '@mui/material'
import DropZone from 'components/DropZone'
import { useFormik } from 'formik'
import React, { FC } from 'react'
import * as yup from 'yup'
import { Assign, ObjectShape } from 'yup/lib/object'
import MultipleSelect from '../../../components/multiple-select/MultipleSelect'
import styled from '@emotion/styled'
import { ProductFetchTypes } from './useProductFetch'

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

	const [imageState, setImageState] = React.useState(
		initialValues.thumbnail ? initialValues.thumbnail : null
	)

	const [images, setImages] = React.useState(
		initialValues.images ? initialValues.images : null
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
		onSubmit: handleFormSubmit,
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
							allNames={categories}
							defaultValues={values.categories}
							onChange={(selected) => setFieldValue('categories', selected)}
							label={'Categories'}
							helperText={touched.categories && (errors.categories as string)}
							error={!!touched.categories && !!errors.categories}
						/>
					</Grid>

					<Grid item sm={imageState ? 6 : 12} xs={12}>
						<DropZone
							name={'thumbnail'}
							onBlur={handleBlur}
							onChange={(file: File[]) => {
								setFieldValue('thumbnail', file[0])
								setImageState(URL.createObjectURL(file[0]))
							}}
							multiple={false}
							accept={'image/*,.web'}
						/>
						{!!touched.thumbnail && !!errors.thumbnail ? (
							<h2 style={{ color: 'red', textAlign: 'center' }}>
								{touched.thumbnail && errors.thumbnail}
							</h2>
						) : null}
					</Grid>

					{imageState ? (
						<Grid sx={{ width: '100%', height: '100%' }} item sm={6} xs={12}>
							<PrevImg src={imageState} alt={'picture'} />
						</Grid>
					) : null}

					<Grid sm={6} item xs={12}>
						<MultipleSelect
							allNames={size}
							defaultValues={values.sizes}
							onChange={(selected) => setFieldValue('sizes', selected)}
							label={'Sizes'}
							helperText={touched.sizes && (errors.sizes as string)}
							error={!!touched.sizes && !!errors.sizes}
						/>
					</Grid>

					<Grid item sm={6} xs={12}>
						<MultipleSelect
							allNames={colors}
							defaultValues={values.colors}
							onChange={(selected) => setFieldValue('colors', selected)}
							label={'Colors'}
							helperText={touched.colors && (errors.colors as string)}
							error={!!touched.colors && !!errors.colors}
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
