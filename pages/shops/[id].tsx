import FilterList from '@mui/icons-material/FilterList'
import { Container, Grid, IconButton } from '@mui/material'
import { ShopsService } from 'src/api/services/shop/shop.service'
import ShopLayout1 from 'src/components/layouts/ShopLayout1'
import ProductCardList from 'src/components/products/ProductCard1List'
import ProductFilterCard from 'src/components/products/ProductFilterCard'
import ShopIntroCard from 'src/components/shop/ShopIntroCard'
import Sidenav from 'src/components/sidenav/Sidenav'
import useWindowSize from 'src/hooks/useWindowSize'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { IShop } from 'src/shared/types/shop.types'

const Shop: FC<{ shop: IShop }> = ({ shop }) => {
	const width = useWindowSize()
	const isTablet = width < 1025

	// const { data: products } = useQuery(['shop products'], () =>
	// 	ShopsService.getShopProducts(shop.id)
	// )

	useEffect(()=>{
		console.log(shop)
	}, [])

	return (
		<ShopLayout1>
			<Container sx={{ mt: 4, mb: 6 }}>
				<ShopIntroCard {...shop} />

				<Grid container spacing={3}>
					<Grid item md={12} xs={12}>
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

						<ProductCardList products={shop.products} />
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
