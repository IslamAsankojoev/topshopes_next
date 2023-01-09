import { Box } from '@mui/material'
import BazaarAvatar from 'components/BazaarAvatar'
import BazaarRating from 'components/BazaarRating'
import { FlexBox } from 'components/flex-box'
import { H5, H6, Paragraph, Span } from 'components/Typography'
import { FC } from 'react'
import { getDateDifference } from 'utils/utils'

// ===========================================================
type ProductCommentProps = {
	id: string
	product_variant: string
	user: { first_name: string; last_name: string; avatar: string }
	rating: number
	comment: string
	created_at: string
	product: number
	shop: string
}
// ===========================================================

const ProductComment: FC<ProductCommentProps> = (props) => {
	const { product_variant, user, rating, comment, created_at } = props

	return (
		<Box mb={4} maxWidth="600px">
			<FlexBox alignItems="center" mb={2}>
				<BazaarAvatar src={user.avatar} height={48} width={48} />
				<Box ml={2}>
					<H5 mb={0.5}>{product_variant}</H5>
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
