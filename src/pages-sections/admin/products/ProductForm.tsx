import styled from '@emotion/styled'
import { Button, Card, Grid, MenuItem, TextField } from '@mui/material'
import { FlexBox } from 'components/flex-box'
import { useFormik } from 'formik'
import { useActions } from 'hooks/useActions'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { IBrand, ICategory } from 'shared/types/product.types'
import * as yup from 'yup'
import { Assign, ObjectShape } from 'yup/lib/object'

import { ProductFetchTypes } from './useProductFetch'

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

	const { push } = useRouter()

	//data fetching
	const { brands, shops, categories } = productFetch

	// states
	const [redirect, setRedirect] = React.useState<boolean>(false)

	// actions
	const { setCurrentCategory } = useActions()

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues,
			onSubmit: () => {
				const { reviews, shop, variants, ...other } = values
				const clearData = props.includeShop ? { ...other, shop } : other
				handleFormSubmit(clearData, redirect)
			},
			validationSchema: validationSchema,
		})

	const categoryHandler: any = async (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		if (
			!window.confirm(
				'all already existing attributes will be removed, do you agree with that?'
			)
		)
			return

		handleChange(e)
	}

	React.useEffect(() => {
		setCurrentCategory(values.category)
	}, [values.category])

	return (
		<Card sx={{ p: 6 }}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid item sm={6} xs={12}>
						<TextField
							fullWidth
							name="name"
							label="Name"
							color="info"
							size="medium"
							placeholder="Name"
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
							onChange={categoryHandler}
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
						<TextField
							multiline
							rows={4}
							fullWidth
							name="description"
							label="Description"
							color="info"
							size="medium"
							placeholder="Description"
							value={values.description}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.description && !!errors.description}
							helperText={touched.description && errors.description}
						/>
					</Grid>

					<Grid item xs={12}>
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
										Go to view
									</Button>
									<Button variant="contained" color="primary" type="submit">
										Save and exit
									</Button>
								</>
							) : null}
							<Button
								onClick={() => setRedirect(true)}
								variant="contained"
								color="primary"
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
