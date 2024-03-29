import { Container, Grid, Pagination } from '@mui/material'
import { ShopsService } from 'src/api/services/shop/shop.service'
import { H2, Span } from 'src/components/Typography'
import { FlexBetween } from 'src/components/flex-box'
import ShopLayout1 from 'src/components/layouts/ShopLayout1'
import ShopCard1 from 'src/components/shop/ShopCard1'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useQuery } from 'react-query'
import { ResponseList } from 'src/shared/types/response.types'
import { IShop } from 'src/shared/types/shop.types'
import { api } from 'src/api/index.service'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const ShopList = () => {
	const { data: shops, isLoading } = useQuery(
		'get all shops',
		() => api.shops.ShopsService.getList(),
		{
			select: (data: ResponseList<IShop>) => data.results,
		}
	)

	return (
		<ShopLayout1>
			<Container sx={{ mt: 4, mb: 6 }}>
				<H2 mb={3}>All Shops</H2>

				<Grid container spacing={3}>
					{shops?.length > 0 &&
						shops?.map((item, ind) => (
							<Grid item lg={4} sm={6} xs={12} key={ind}>
								<ShopCard1 {...item} />
							</Grid>
						))}
				</Grid>

				<FlexBetween flexWrap="wrap" mt={4}>
					<Span color="grey.600">Showing 1-9 of 300 Shops</Span>
					<Pagination
						count={shopList?.length}
						variant="outlined"
						color="primary"
					/>
				</FlexBetween>
			</Container>
		</ShopLayout1>
	)
}

const shopList = [
	{
		rating: 5,
		name: 'Scarlett Beauty',
		phone: '(613) 343-9004',
		shopUrl: '/shops/53244445',
		imgUrl: '/assets/images/faces/propic.png',
		coverImgUrl: '/assets/images/banners/cycle.png',
		address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
	},
	{
		rating: 5,
		name: 'Scroll Through',
		phone: '(613) 343-9004',
		shopUrl: '/shops/53244445',
		imgUrl: '/assets/images/faces/propic(1).png',
		coverImgUrl: '/assets/images/banners/banner.png',
		address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
	},
	{
		rating: 4.5,
		name: 'Coveted Clicks',
		phone: '(613) 343-9004',
		shopUrl: '/shops/53244445',
		imgUrl: '/assets/images/faces/propic(2).png',
		coverImgUrl: '/assets/images/banners/banner-3.png',
		address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
	},
	{
		rating: 4,
		phone: '(613) 343-9004',
		name: 'Constant Shoppers',
		shopUrl: '/shops/53244445',
		imgUrl: '/assets/images/faces/propic(3).png',
		coverImgUrl: '/assets/images/banners/banner-4.png',
		address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
	},
	{
		rating: 5,
		name: 'Keyboard Kiosk',
		phone: '(613) 343-9004',
		shopUrl: '/shops/53244445',
		imgUrl: '/assets/images/faces/propic(4).png',
		coverImgUrl: '/assets/images/banners/banner-5.png',
		address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
	},
	{
		rating: 5,
		name: 'Anytime Buys',
		phone: '(613) 343-9004',
		shopUrl: '/shops/53244445',
		imgUrl: '/assets/images/faces/propic(5).png',
		coverImgUrl: '/assets/images/banners/banner-6.png',
		address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
	},
	{
		rating: 4,
		phone: '(613) 343-9004',
		name: 'Word Wide Wishes',
		shopUrl: '/shops/53244445',
		imgUrl: '/assets/images/faces/propic(6).png',
		coverImgUrl: '/assets/images/banners/banner-7.png',
		address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
	},
	{
		rating: 5,
		name: 'Cybershop',
		phone: '(613) 343-9004',
		shopUrl: '/shops/53244445',
		imgUrl: '/assets/images/faces/propic(7).png',
		coverImgUrl: '/assets/images/banners/banner-8.png',
		address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
	},
	{
		rating: 5,
		name: 'Scarlett Beauty',
		phone: '(613) 343-9004',
		shopUrl: '/shops/53244445',
		imgUrl: '/assets/images/faces/propic(8).png',
		coverImgUrl: '/assets/images/banners/banner-9.png',
		address: '845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark',
	},
]

export default ShopList
