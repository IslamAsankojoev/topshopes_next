import { Container, Grid } from '@mui/material'
import CategorySectionHeader from 'src/components/CategorySectionHeader'
import ProductCard1 from 'src/components/product-cards/ProductCard1'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

type Props = { moreItems: any[] }

const Section11: FC<Props> = ({ moreItems }) => {
	const { t } = useTranslation('home')
	return (
		<Container sx={{ mb: '70px' }}>
			<CategorySectionHeader title={t('moreForYou')} seeMoreLink="/shop" />

			<Grid container spacing={3}>
				{moreItems?.map((item, ind) => (
					<Grid item lg={3} md={4} sm={6} xs={6} key={ind}>
						<ProductCard1 hoverEffect product={item} />
					</Grid>
				))}
			</Grid>
		</Container>
	)
}

export default Section11
