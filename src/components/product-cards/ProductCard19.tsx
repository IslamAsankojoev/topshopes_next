import { Box, Rating } from '@mui/material'
import BazaarImage from 'src/components/BazaarImage'
import { Paragraph } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import NavLink from 'src/components/nav-link/NavLink'
import Link from 'next/link'
import { FC } from 'react'

// ===========================================
type ProductCard19Props = {
	image: string
	title: string
	price: number
	id: string | number
}
// ===========================================

const ProductCard19: FC<ProductCard19Props> = ({ image, title, price, id }) => {
	return (
		<FlexBox
			mb={2}
			gap={2}
			alignItems="center"
			sx={{
				' & a': { flexShrink: 0 },
				':last-of-type': { mb: 0 },
				'& img': { transition: '0.3s' },
				':hover': { img: { transform: 'scale(1.1)' } },
			}}
		>
			<Link href={`/product/${id}`}>
				<a>
					<Box maxWidth={100} bgcolor="grey.300">
						<BazaarImage width="100%" alt="product" src={image} />
					</Box>
				</a>
			</Link>

			<Box>
				<NavLink href="#">
					<Paragraph fontSize={16}>{title}</Paragraph>
				</NavLink>
				<Paragraph fontWeight={700}>{price}</Paragraph>
				<Rating value={4} sx={{ fontSize: 14 }} />
			</Box>
		</FlexBox>
	)
}

export default ProductCard19
