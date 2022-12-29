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
import { IBrand, ICategory } from 'shared/types/product.types'
import { FlexBox } from 'components/flex-box'

// ================================================================
type ProductFormProps = {
	initialValues: any
	handleFormSubmit: (values: any, redirect?: boolean) => void
	validationSchema: yup.ObjectSchema<Assign<ObjectShape, any>>
	productFetch: ProductFetchTypes
	update?: boolean
	includeShop?: boolean
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
	const { brands, shops, categories } = productFetch

	// states
	const [imageState, setImageState] = React.useState(
		initialValues.thumbnail ? initialValues.thumbnail : null
	)
	const [images, setImages] = React.useState(
		initialValues.images ? initialValues.images : null
	)
	const [redirect, setRedirect] = React.useState<boolean>(false)

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
		onSubmit: () => handleFormSubmit(values, redirect),
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

					{imageState ? (
						<Grid sx={{ width: '100%', height: '100%' }} item sm={6} xs={12}>
							<PrevImg src={imageState} alt={'picture'} />
						</Grid>
					) : null}

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
							select
							fullWidth
							color="info"
							size="medium"
							name="category"
							onBlur={handleBlur}
							placeholder="Category"
							onChange={handleChange}
							value={values.category}
							label="Select Category"
							error={!!touched.category && !!errors.category}
							helperText={touched.category && errors.category}
						>
							{categories?.map((category: ICategory) => (
								<MenuItem key={category.name} value={category.id}>
									{category.name}
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
							name="brand"
							onBlur={handleBlur}
							placeholder="Brands"
							onChange={handleChange}
							value={values.brand}
							label="Select Brand"
							error={!!touched.brand && !!errors.brand}
							helperText={touched.brand && errors.brand}
						>
							{brands?.map((brand: IBrand) => (
								<MenuItem key={brand.name} value={brand.id}>
									{brand.name}
								</MenuItem>
							))}
						</TextField>
					</Grid>

					{props.includeShop ? (
						<Grid item xs={12}>
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
					) : null}

					<Grid item xs={12}>
						<FlexBox
							flexWrap={'wrap'}
							justifyContent={'flex-end'}
							sx={{ gridGap: '10px' }}
						>
							{update ? (
								<Button variant="contained" color="info" type="submit">
									Save and exit
								</Button>
							) : null}
							<Button
								onClick={() => setRedirect(true)}
								variant="contained"
								color="info"
								type="submit"
							>
								{update ? 'Save product' : 'Create product'}
							</Button>
						</FlexBox>
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
