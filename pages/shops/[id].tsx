import { Container, Grid } from '@mui/material'
import { ShopsService } from 'src/api/services/shop/shop.service'
import ShopLayout1 from 'src/components/layouts/ShopLayout1'
import ShopIntroCard from 'src/components/shop/ShopIntroCard'
import useWindowSize from 'src/hooks/useWindowSize'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FC, useEffect } from 'react'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { IShop } from 'src/shared/types/shop.types'
import { useRouter } from 'next/router'
import ProductCard1List from 'src/components/products/ProductCard1List'
import { api } from 'src/api/index.service'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({
	query,
	locale,
}) => {
	try {
		const queryClient = new QueryClient()
		await queryClient.fetchQuery(['shop'], () =>
			api.shops.ShopsService.get(query.id as string, {
				...query,
				page_size: 18,
			})
		)

		return {
			props: {
				query,
				dehydratedState: dehydrate(queryClient),
				...(await serverSideTranslations(locale as string, ['common', 'shop'])),
			},
		}
	} catch {
		return {
			props: {
				...(await serverSideTranslations(locale as string, ['common', 'shop'])),
			},
		}
	}
}

const Shop: FC<{ shop: IShop }> = (props) => {
	const width = useWindowSize()
	const isTablet = width < 1025
	const router = useRouter()

	const {
		data: shop,
		isLoading,
		error,
	} = useQuery('shop', () =>
		api.shops.ShopsService.get(router.query.id as string, {
			...router.query,
			page_size: 18,
		})
	)

	const paginationHandler = (page: number) => {
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, page },
			},
			undefined,
			{ scroll: false }
		)
	}

	useEffect(() => {
		console.log(props)
	}, [])

	return (
		<ShopLayout1>
			<Container sx={{ mt: 4, mb: 6 }}>
				<ShopIntroCard {...shop} />

				<Grid container spacing={3}>
					<Grid item md={12} xs={12}>
						{/* {isTablet && (
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
						)} */}

						<Grid container spacing={3}>
							{/* <Grid item md={3} sx={{ display: { md: 'block', xs: 'none' } }}>
								<ProductFilterCard />
							</Grid> */}

							<Grid item md={12} xs={12}>
								{shop?.products?.length ? (
									<ProductCard1List
										xs={6}
										sm={4}
										lg={3}
										products={shop?.products}
										count={shop?.products?.length}
										handleChange={paginationHandler}
									/>
								) : null}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</ShopLayout1>
	)
}

export default Shop
