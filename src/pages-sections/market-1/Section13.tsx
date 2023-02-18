import { Box } from '@mui/material'
import BazaarCard from 'src/components/BazaarCard'
import CategorySectionCreator from 'src/components/CategorySectionCreator'
import HoverBox from 'src/components/HoverBox'
import LazyImage from 'src/components/LazyImage'
import { H4 } from 'src/components/Typography'
import Carousel from 'src/components/carousel/Carousel'
import { FlexBox } from 'src/components/flex-box'
import GiftBox from 'src/components/icons/GiftBox'
import useWindowSize from 'src/hooks/useWindowSize'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

interface Props {
	bigDiscountList: any[]
}
const Section13: FC<Props> = ({ bigDiscountList }) => {
	const { t } = useTranslation('home')
	const width = useWindowSize()
	const [visibleSlides, setVisibleSlides] = useState(6)

	useEffect(() => {
		if (width < 370) setVisibleSlides(1)
		else if (width < 650) setVisibleSlides(2)
		else if (width < 950) setVisibleSlides(4)
		else setVisibleSlides(6)
	}, [width])

	return (
		<CategorySectionCreator
			icon={<GiftBox />}
			title={t('bigDiscounts')}
			seeMoreLink="/shop"
		>
			<Box my="-0.25rem">
				<Carousel totalSlides={9} visibleSlides={visibleSlides}>
					{bigDiscountList?.map((item) => (
						<Box py={0.5} key={item.id}>
							<BazaarCard sx={{ p: '1rem' }}>
								<Link
									href={{
										pathname: '/product/[id]',
										query: { trueID: item.id, id: item.slug },
									}}
								>
									<a>
										<HoverBox borderRadius="8px" mb={1}>
											<LazyImage
												width={100}
												height={100}
												src={item.thumbnail}
												layout="responsive"
												alt={item.name}
											/>
										</HoverBox>
										<H4 fontWeight="600" fontSize="14px" mb={0.5}>
											{item.name}
										</H4>

										<FlexBox gap={1}>
											<H4 fontWeight="600" fontSize="14px" color="primary.main">
												{Math.ceil(item.price).toLocaleString()}c
											</H4>

											<H4 fontWeight="600" fontSize="14px" color="grey.600">
												<del>{Math.ceil(item.price)}c</del>
											</H4>
										</FlexBox>
									</a>
								</Link>
							</BazaarCard>
						</Box>
					))}
				</Carousel>
			</Box>
		</CategorySectionCreator>
	)
}

export default Section13
