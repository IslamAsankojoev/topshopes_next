import { Rating } from '@mui/lab'
import { Box, Button, TextField } from '@mui/material'
import { ReviewService } from 'src/api/services/review/Review.service'
import { H2, H5 } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { useFormik } from 'formik'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { QueryClient, useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { IProduct, IReview } from 'src/shared/types/product.types'
import * as yup from 'yup'

import ProductComment from './ProductComment'
import { dynamicLocalization } from 'src/utils/Translate/dynamicLocalization'

export interface ProductReviewProps {
	product: IProduct
}

const ProductReview: FC<ProductReviewProps> = ({ product }) => {
	const { t } = useTranslation('review')
	const { user } = useTypedSelector((state) => state.userStore)
	const router = useRouter()

	const reloadPageWithParams = () => {
		const cleanPath = router.asPath.split('?')[0]

		router.replace(
			{
				pathname: cleanPath,
				query: { comment: 'success' },
			},
			undefined,
			{ scroll: false }
		)
	}
	const { mutateAsync } = useMutation(
		'send a comment',
		(values: IReview) => ReviewService.create(product?.id, values),
		{
			onSuccess: async () => {
				toast.success(
					dynamicLocalization({
						ru: 'Ваш отзыв успешно отправлен',
						tr: 'Yorumunuz başarıyla gönderildi',
						en: 'Your review has been sent successfully',
						kg: 'Сиздин отзыв жөнөтүлдү',
						kz: 'Сіздің пікіріңіз жіберілді',
					})
				)
				reloadPageWithParams()
			},
		}
	)

	const handleFormSubmit = async (values: any, { resetForm }: any) => {
		mutateAsync({ product_variant: product?.variants[0]?.id, ...values })
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
			{product?.reviews
				?.map((item: any) => <ProductComment {...item} key={item.id} />)
				.reverse()}

			<H2 fontWeight="600" mt={7} mb={2.5}>
				{t('writeReview')}
			</H2>

			{user ? (
				<form onSubmit={handleSubmit}>
					<Box mb={2.5}>
						<FlexBox mb={1.5} gap={0.5}>
							<H5 color="grey.700">{t('yourRating')}</H5>
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
							<H5 color="grey.700">{t('yourReview')}</H5>
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
							placeholder={t('writeReviewHere')}
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
						{t('send')}
					</Button>
				</form>
			) : (
				<h3>
					<Link href={'/login'}>{t('login')}</Link>
				</h3>
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
