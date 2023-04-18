import { Rating } from '@mui/lab'
import { Box, Button, TextField, Typography } from '@mui/material'
import { ReviewService } from 'src/api/services/review/Review.service'
import { H2, H5 } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { IProduct, IReview } from 'src/shared/types/product.types'
import * as yup from 'yup'

import ProductComment from './ProductComment'
import { localize } from 'src/utils/Translate/localize'
import { ShopsProductsService } from 'src/api/services/products/product.service'
import { useForm } from 'react-hook-form'
import useYupValidationResolver from 'src/hooks/useYupValidationResolver'

export interface ProductReviewProps {
	product: IProduct
}

const ProductReview: FC<ProductReviewProps> = ({ product }) => {
	const { t } = useTranslation('review')

	const queryClient = useQueryClient()

	const { user } = useTypedSelector((state) => state.userStore)
	const router = useRouter()

	const [rating, setRating] = useState(0)

	const { data: comments, refetch } = useQuery(
		[`product comments`, router.query.id],
		() => ShopsProductsService.get(router.query.id as string),
		{
			enabled: !!router.query.id,
			select: (data: IProduct) => data.reviews,
		}
	)

	const { mutateAsync } = useMutation(
		'send a comment',
		(values: IReview) => ReviewService.create(product?.id, values),
		{
			onSuccess: async () => {
				toast.success(
					localize({
						ru: 'Ваш отзыв успешно отправлен',
						tr: 'Yorumunuz başarıyla gönderildi',
						en: 'Your review has been sent successfully',
						kg: 'Сиздин отзыв жөнөтүлдү',
						kz: 'Сіздің пікіріңіз жіберілді',
					})
				)
				queryClient
					.invalidateQueries([`product comments`, router.query.id])
					.then(() => {
						refetch()
					})
			},
		}
	)
	const resolver = useYupValidationResolver(reviewSchema)

	const {
		getValues,
		setValue,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm({
		resolver,
	})

	const values = getValues()

	const handleFormSubmit = async (values: any) => {
		await mutateAsync({ product_variant: product?.variants[0]?.id, ...values })
		setValue('rating', 0)
		trigger('rating')
		setValue('comment', '')
		trigger('comment')
	}

	const handleSubmitForm = async (e) => {
		e.preventDefault()
		await handleSubmit(handleFormSubmit)()
	}

	return (
		<Box>
			{comments
				?.map((item: any) => <ProductComment {...item} key={item.id} />)
				.reverse()}

			<H2 fontWeight="600" mt={7} mb={2.5}>
				{t('writeReview')}
			</H2>

			{user ? (
				<form onSubmit={handleSubmitForm}>
					<Box mb={2.5}>
						<FlexBox mb={1.5} gap={0.5}>
							<H5 color="grey.700">{t('yourRating')}</H5>
							<H5 color="error.main">*</H5>
						</FlexBox>
						<Rating
							color="warn"
							size="medium"
							name="rating"
							id="rating"
							value={!!values.rating ? values.rating : null}
							onChange={(_, value: any) => {
								if (value) {
									setValue('rating', value)
									trigger('rating')
									return null
								}
								setValue('rating', 0)
								trigger('rating')
							}}
							sx={{
								'& .MuiRating-iconEmpty': {
									color: errors.rating ? 'error.main' : 'grey.500',
								},
							}}
						/>
						{errors.rating && (
							<Typography color="error.main" variant="body2">
								{errors.rating.message}
							</Typography>
						)}
					</Box>

					<Box mb={3}>
						<FlexBox mb={1.5} gap={0.5}>
							<H5 color="grey.700">{t('yourReview')}</H5>
							<H5 color="error.main">*</H5>
						</FlexBox>

						<TextField
							rows={8}
							value={values.comment}
							multiline
							fullWidth
							name="comment"
							variant="outlined"
							placeholder={t('writeReviewHere')}
							id="comment"
							onChange={(e) => {
								setValue('comment', e.target.value)
								trigger('comment')
							}}
							error={!!errors.comment}
							helperText={errors.comment?.message}
						/>
					</Box>

					<Button
						variant="contained"
						color="primary"
						type="submit"
						// disabled={}
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
	rating: yup
		.number()
		.min(1, 'Rating must be greater than 0')
		.required('Rating is required'),
	comment: yup.string().required('Comment is required'),
})

export default ProductReview
