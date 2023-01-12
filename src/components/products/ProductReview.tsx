import { Rating } from '@mui/lab'
import { Box, Button, TextField } from '@mui/material'
import { instance } from 'api/interceptor'
import { ReviewService } from 'api/services/review/Review.service'
import { H2, H5 } from 'components/Typography'
import { FlexBox } from 'components/flex-box'
import { useFormik } from 'formik'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { IProduct, IReview } from 'shared/types/product.types'
import * as yup from 'yup'

import ProductComment from './ProductComment'

export interface ProductReviewProps {
	product: IProduct
	refetch: () => void
}

const ProductReview: React.FC<ProductReviewProps> = ({ product, refetch }) => {
	const { user } = useTypedSelector((state) => state.userStore)

	const { mutateAsync } = useMutation(
		'send a comment',
		(values: IReview) => ReviewService.create(product.id, values),
		{
			onSuccess: async () => {
				await refetch()
				await toast.success('comment sent successfully')
			},
		}
	)

	const handleFormSubmit = async (values: any, { resetForm }: any) => {
		mutateAsync({ product_variant: product?.variants[0].id, ...values })
		resetForm()
	}

	const {
		dirty,
		values,
		errors,
		touched,
		isValid,
		handleBlur,
		handleChange,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		onSubmit: handleFormSubmit,
		initialValues: initialValues,
		validationSchema: reviewSchema,
	})

	return (
		<Box>
			{product?.reviews?.map((item: any) => (
				<ProductComment {...item} key={item.id} />
			))}

			<H2 fontWeight="600" mt={7} mb={2.5}>
				Write a Review for this product
			</H2>

			{user ? (
				<form onSubmit={handleSubmit}>
					<Box mb={2.5}>
						<FlexBox mb={1.5} gap={0.5}>
							<H5 color="grey.700">Your Rating</H5>
							<H5 color="error.main">*</H5>
						</FlexBox>

						<Rating
							color="warn"
							size="medium"
							value={values.rating}
							onChange={(_, value: any) => setFieldValue('rating', value)}
						/>
					</Box>

					<Box mb={3}>
						<FlexBox mb={1.5} gap={0.5}>
							<H5 color="grey.700">Your Review</H5>
							<H5 color="error.main">*</H5>
						</FlexBox>

						<TextField
							rows={8}
							multiline
							fullWidth
							name="comment"
							variant="outlined"
							onBlur={handleBlur}
							value={values.comment}
							onChange={handleChange}
							placeholder="Write a review here..."
							error={!!touched.comment && !!errors.comment}
							helperText={touched.comment && errors.comment}
						/>
					</Box>

					<Button
						variant="contained"
						color="primary"
						type="submit"
						disabled={!(dirty && isValid)}
					>
						Submit
					</Button>
				</form>
			) : (
				<h3>User not found</h3>
			)}
		</Box>
	)
}

const initialValues = {
	rating: 0,
	comment: '',
}

const reviewSchema = yup.object().shape({
	rating: yup.number().required('required'),
	comment: yup.string().required('required'),
})

export default ProductReview
