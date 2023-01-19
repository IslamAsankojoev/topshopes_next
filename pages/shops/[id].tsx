import FilterList from '@mui/icons-material/FilterList'
import { Container, Grid, IconButton } from '@mui/material'
import { axiosClassic } from 'api/interceptor'
import { ShopsService } from 'api/services/shop/shop.service'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import Navbar from 'components/navbar/Navbar'
import ProductCardList from 'components/products/ProductCard1List'
import ProductFilterCard from 'components/products/ProductFilterCard'
import ShopIntroCard from 'components/shop/ShopIntroCard'
import Sidenav from 'components/sidenav/Sidenav'
import useWindowSize from 'hooks/useWindowSize'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { IShop } from 'shared/types/shop.types'

const Shop: FC<{ shop: IShop }> = ({ shop }) => {
	const width = useWindowSize()
	const isTablet = width < 1025

	const { data: products, isLoading } = useQuery(['shop products'], () =>
		ShopsService.getShopProducts(shop.id)
	)

	return (
		<ShopLayout1>
			<Container sx={{ mt: 4, mb: 6 }}>
				<ShopIntroCard {...shop} />

				<Grid container spacing={3}>
					<Grid
						item
						md={3}
						xs={12}
						sx={{ display: { md: 'block', xs: 'none' } }}
					>
						<ProductFilterCard />
					</Grid>

					<Grid item md={9} xs={12}>
						{isTablet && (
							<Sidenav
								position="left"
								handle={
									<IconButton sx={{ float: 'right' }}>
										<FilterList fontSize="small" />
									</IconButton>
								}
							>
								<ProductFilterCard />
							</Sidenav>
						)}

						<ProductCardList products={products} />
					</Grid>
				</Grid>
			</Container>
		</ShopLayout1>
	)
}

export default Shop

export const getServerSideProps = async (context) => {
	const { id } = context.query
	const shop = await ShopsService.get(id)

	return {
		props: {
			shop,
			...(await serverSideTranslations(context.locale as string, [
				'common',
				'shop',
			])),
		},
	}
}
