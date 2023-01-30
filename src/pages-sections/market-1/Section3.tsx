import BazaarCard from 'components/BazaarCard'
import CategorySectionCreator from 'components/CategorySectionCreator'
import Carousel from 'components/carousel/Carousel'
import Category from 'components/icons/Category'
import ProductCard6 from 'components/product-cards/ProductCard6'
import useWindowSize from 'hooks/useWindowSize'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { ICategory } from 'shared/types/product.types'

// =====================================================
type Props = { categoryList: ICategory[] }
// =====================================================

const Section3: FC<Props> = ({ categoryList = [] }) => {
	const { t } = useTranslation('home')
	const [visibleSlides, setVisibleSlides] = useState(3)
	const width = useWindowSize()

	useEffect(() => {
		if (width < 650) setVisibleSlides(1)
		else if (width < 950) setVisibleSlides(2)
		else setVisibleSlides(3)
	}, [width])

	if (!categoryList) return <></>

	return (
		<CategorySectionCreator
			icon={<Category color="primary" />}
			title={t('topCategories')}
			seeMoreLink="#"
		>
			<Carousel totalSlides={5} visibleSlides={visibleSlides}>
				{categoryList?.map((item, ind) => (
					<Link
						href={{
							pathname: '/shop',
							query: {
								category: item.id,
							},
						}}
						key={ind}
						passHref
					>
						<a>
							<BazaarCard sx={{ p: 2 }} elevation={0}>
								<ProductCard6 title={item.name} imgUrl={item.icon} />
							</BazaarCard>
						</a>
					</Link>
				))}
			</Carousel>
		</CategorySectionCreator>
	)
}

export default Section3
