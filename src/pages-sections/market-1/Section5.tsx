import { Grid } from '@mui/material'
import BazaarCard from 'src/components/BazaarCard'
import CategorySectionCreator from 'src/components/CategorySectionCreator'
import NewArrival from 'src/components/icons/NewArrival'
import ProductCard2 from 'src/components/product-cards/ProductCard2'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

interface Props {
	newArrivalsList: any[]
}

const Section5: FC<Props> = ({ newArrivalsList }) => {
	const { t } = useTranslation('home')
	return (
		<CategorySectionCreator
			icon={<NewArrival />}
			title={t('newArrivals')}
			seeMoreLink="shop"
		>
			<BazaarCard sx={{ p: 2 }}>
				<Grid container spacing={3}>
					{newArrivalsList?.map((item) => (
						<Grid item lg={2} md={3} sm={4} xs={6} key={item.name}>
							<ProductCard2 {...item} />
						</Grid>
					))}
				</Grid>
			</BazaarCard>
		</CategorySectionCreator>
	)
}

export default Section5
