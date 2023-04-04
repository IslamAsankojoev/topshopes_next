import { Button, Container, Grid } from '@mui/material'
import CategorySectionHeader from 'src/components/CategorySectionHeader'
import ProductCard1 from 'src/components/product-cards/ProductCard1'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { localize } from 'src/utils/Translate/localize'
import { useRouter } from 'next/router'

type Props = { moreItems: any[] }

const Section11: FC<Props> = ({ moreItems }) => {
	const { t } = useTranslation('home')
	const { push } = useRouter()
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
			<Button
				variant="contained"
				color="primary"
				sx={{ m: 'auto', mt: '50px', display: 'block', textTransform: 'none' }}
				onClick={() => {
					push('/shop')
				}}
			>
				{localize({
					en: 'See More',
					ru: 'Посмотреть больше',
					tr: 'Daha fazla göster',
				})}
			</Button>
		</Container>
	)
}

export default Section11
