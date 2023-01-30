import HoverBox from 'components/HoverBox'
import LazyImage from 'components/LazyImage'
import { H4 } from 'components/Typography'
import Link from 'next/link'
import React from 'react'

// ==========================================================
type ProductCard2Props = {
	id: number
	overall_price: number
	name: string
	thumbnail: string
	rating: number
	discount: number
	slug: string
}
// ==========================================================

const ProductCard2: React.FC<ProductCard2Props> = (props) => {
	const { thumbnail, name, overall_price, id, slug } = props

	return (
		<Link
			href={{
				pathname: '/product/[id]',
				query: { trueID: id, id: slug },
			}}
		>
			<a>
				<HoverBox borderRadius="8px" mb={1}>
					<LazyImage
						src={thumbnail}
						width={0}
						height={0}
						layout="responsive"
						alt={name}
					/>
				</HoverBox>
				<H4 fontSize={14} mb={0.5}>
					{name}
				</H4>
				<H4 fontSize={14} color="primary.main">
					{Math.ceil(overall_price).toLocaleString()}c
				</H4>
			</a>
		</Link>
	)
}

export default ProductCard2
