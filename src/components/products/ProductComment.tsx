import { Box } from '@mui/material'
import BazaarAvatar from 'components/BazaarAvatar'
import BazaarRating from 'components/BazaarRating'
import { H5, H6, Paragraph, Span } from 'components/Typography'
import { FlexBox } from 'components/flex-box'
import { FC } from 'react'
import { IReview } from 'shared/types/product.types'
import { getDateDifference } from 'utils/utils'

const ProductComment: FC<IReview> = (props) => {
	const { product_variant, user, rating, comment, created_at } = props

	return (
		<Box mb={4} maxWidth="600px">
			<FlexBox alignItems="center" mb={2}>
				<BazaarAvatar
					src={user?.avatar || '/assets/images/avatars/001-man.svg'}
					height={48}
					width={48}
				/>
				<Box ml={2}>
					<H5 mb={0.5}>{user?.first_name}</H5>
					<FlexBox alignItems="center">
						<BazaarRating value={rating} color="warn" readOnly />
						<H6 mx={1.25}>{rating}</H6>
						<Span>{getDateDifference(created_at)}</Span>
					</FlexBox>
				</Box>
			</FlexBox>
			<Paragraph color="grey.700">{comment}</Paragraph>
		</Box>
	)
}

export default ProductComment
