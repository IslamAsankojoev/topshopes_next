import { Box } from '@mui/material'
import CategorySectionCreator from 'src/components/CategorySectionCreator'
import Carousel from 'src/components/carousel/Carousel'
import Light from 'src/components/icons/Light'
import ProductCard1 from 'src/components/product-cards/ProductCard1'
import useWindowSize from 'src/hooks/useWindowSize'
import { useTranslation } from 'next-i18next'
import { FC, useEffect, useState } from 'react'
import BazaarCard from 'src/components/BazaarCard'
import HoverBox from 'src/components/HoverBox'
import LazyImage from 'src/components/LazyImage'
import { H4 } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import Link from 'next/link'
import { IProductPreview } from 'src/shared/types/product.types'
import { getCurrency } from 'src/utils/getCurrency'

// =============================================================
type Props = { flashDeals: IProductPreview[] }
// =============================================================

const Section2: FC<Props> = ({ flashDeals }) => {
	const { t } = useTranslation('home')
	const [visibleSlides, setVisibleSlides] = useState(4)
	const width = useWindowSize()

	useEffect(() => {
		if (width < 500) setVisibleSlides(2)
		else if (width < 650) setVisibleSlides(2)
		else if (width < 950) setVisibleSlides(3)
		else setVisibleSlides(5)
	}, [width])

	return (
		<CategorySectionCreator
			icon={<Light color="primary" />}
			title={t('flashDeals')}
			seeMoreLink="/shop?ordering=-total_sales"
		>
			<Carousel totalSlides={9} visibleSlides={visibleSlides}>
				{flashDeals?.map((item) => (
					<Box
						py={0.5}
						key={item.id}
						sx={{
							height: '100%',
						}}
					>
						<BazaarCard sx={{ p: '1rem', height: '100%' }}>
							<Link href={`/product/${item.id}`}>
								<a
									style={{
										display: 'flex',
										flexDirection: 'column',
										height: '100%',
										justifyContent: 'space-around',
									}}
								>
									<HoverBox borderRadius="8px" mb={1}>
										<LazyImage
											width={100}
											height={100}
											src={item.thumbnail}
											layout="responsive"
											alt={item.name}
										/>
									</HoverBox>
									<Box>
										<H4 fontWeight="600" fontSize="14px" mb={0.5}>
											{item.name}
										</H4>

										<FlexBox gap={1}>
											<H4 fontWeight="600" fontSize="14px" color="primary.main">
												{getCurrency(item.discount_price || item.price)}
											</H4>

											<H4 fontWeight="600" fontSize="14px" color="grey.600">
												<del>{getCurrency(!!item.discount && item.price)}</del>
											</H4>
										</FlexBox>
									</Box>
								</a>
							</Link>
						</BazaarCard>
					</Box>
				))}
			</Carousel>
		</CategorySectionCreator>
	)
}

export default Section2
