import { Box, Container, Grid } from '@mui/material'
import BazaarCard from 'src/components/BazaarCard'
import CategorySectionHeader from 'src/components/CategorySectionHeader'
import DottedStar from 'src/components/icons/DottedStar'
import RankBadge from 'src/components/icons/RankBadge'
import ProductCard4 from 'src/components/product-cards/ProductCard4'
import ProductCard5 from 'src/components/product-cards/ProductCard5'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'
import { IProductPreview } from 'src/shared/types/product.types'

// ==========================================================
type Props = {
	topRatedList: IProductPreview[]
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
							seeMoreLink="/shop?ordering=-rating"
						/>

						<BazaarCard sx={{ p: 2 }}>
							<Grid container spacing={4}>
								{topRatedList
									?.map((item) => (
										<Grid item md={3} sm={6} xs={6} key={item.name}>
											<Link href={`/product/${item.id}`} passHref>
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
				</Grid>
			</Container>
		</Box>
	)
}

export default Section4
