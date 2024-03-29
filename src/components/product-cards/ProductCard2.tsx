import HoverBox from 'src/components/HoverBox'
import LazyImage from 'src/components/LazyImage'
import { H4 } from 'src/components/Typography'
import Link from 'next/link'
import { FC } from 'react'
import { getCurrency } from 'src/utils/getCurrency'
import { IProductPreview } from 'src/shared/types/product.types'
import { FlexBox } from '../flex-box'

const ProductCard2: FC<IProductPreview> = (props) => {
	const { thumbnail, name, price, id, slug, discount_price, discount } = props

	return (
		<Link href={`/product/${id}`}>
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
				<FlexBox gap={1}>
					<H4 fontWeight="600" fontSize="14px" color="primary.main">
						{getCurrency(!!discount ? discount_price : price)}
					</H4>

					<H4 fontWeight="600" fontSize="14px" color="grey.600">
						<del>{getCurrency(!!discount && price)}</del>
					</H4>
				</FlexBox>
			</a>
		</Link>
	)
}

export default ProductCard2
