import { Box } from '@mui/material'
import CategorySectionCreator from 'components/CategorySectionCreator'
import Carousel from 'components/carousel/Carousel'
import Light from 'components/icons/Light'
import ProductCard1 from 'components/product-cards/ProductCard1'
import useWindowSize from 'hooks/useWindowSize'
import { useTranslation } from 'next-i18next'
import { FC, useEffect, useState } from 'react'

// =============================================================
type Props = { flashDeals: any[] }
// =============================================================

const Section2: FC<Props> = ({ flashDeals }) => {
	const { t } = useTranslation('home')
	const [visibleSlides, setVisibleSlides] = useState(4)
	const width = useWindowSize()

	useEffect(() => {
		if (width < 500) setVisibleSlides(1)
		else if (width < 650) setVisibleSlides(2)
		else if (width < 950) setVisibleSlides(3)
		else setVisibleSlides(4)
	}, [width])

	return (
		<CategorySectionCreator
			icon={<Light color="primary" />}
			title={t('flashDeals')}
			seeMoreLink="/shop"
		>
			<Carousel
				totalSlides={flashDeals?.length}
				visibleSlides={visibleSlides}
				infinite={true}
			>
				{flashDeals?.map((item, ind) => (
					<Box py={0.5} key={ind}>
						<ProductCard1 product={item} />
					</Box>
				))}
			</Carousel>
		</CategorySectionCreator>
	)
}

export default Section2
