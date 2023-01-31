import { Box, Container, Grid } from '@mui/material'
import BazaarCard from 'components/BazaarCard'
import CategorySectionHeader from 'components/CategorySectionHeader'
import DottedStar from 'components/icons/DottedStar'
import RankBadge from 'components/icons/RankBadge'
import ProductCard4 from 'components/product-cards/ProductCard4'
import ProductCard5 from 'components/product-cards/ProductCard5'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

// ==========================================================
type Props = {
	topRatedList: any[]
	topRatedBrands: any[]
}
// ==========================================================

const Section4: FC<Props> = (props) => {
	const { t } = useTranslation('home')
	const { topRatedBrands, topRatedList } = props
	return (
		<Box mb={7.5}>
			<Container>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<CategorySectionHeader
							icon={<RankBadge />}
							title={t('topRatings')}
							seeMoreLink="/shop"
						/>

						<BazaarCard sx={{ p: 2 }}>
							<Grid container spacing={4}>
								{topRatedList
									?.map((item) => (
										<Grid item md={3} sm={6} xs={6} key={item.name}>
											<Link
												href={{
													pathname: '/product/[id]',
													query: { trueID: item.id, id: item.slug },
												}}
												passHref
											>
												<a>
													<ProductCard4 {...item} />
												</a>
											</Link>
										</Grid>
									))
									.slice(0, 4)}
							</Grid>
						</BazaarCard>
					</Grid>

					{/* <Grid item md={6} xs={12}>
						<CategorySectionHeader
							icon={<DottedStar />}
							title={t('featuredBrands')}
							seeMoreLink="/shop"
						/>

						<BazaarCard sx={{ p: 2 }}>
							<Grid container spacing={4}>
								{topRatedBrands
									?.map((item) => (
										<Grid item sm={6} xs={6} key={item.name}>
											<Link
												href={{
													pathname: '/product/[id]',
													query: { trueID: item.id, id: item.slug },
												}}
												passHref
											>
												<a>
													<ProductCard5 {...item} />
												</a>
											</Link>
										</Grid>
									))
									.slice(0, 2)}
							</Grid>
						</BazaarCard>
					</Grid> */}
				</Grid>
			</Container>
		</Box>
	)
}

export default Section4
