import SEO from 'src/components/SEO'
import ShopLayout1 from 'src/components/layouts/ShopLayout1'
import Models from 'src/models'
import { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Section1 from 'src/pages-sections/market-1/Section1'
import Section2 from 'src/pages-sections/market-1/Section2'
import Section3 from 'src/pages-sections/market-1/Section3'
import Section4 from 'src/pages-sections/market-1/Section4'
import Section5 from 'src/pages-sections/market-1/Section5'
import Section11 from 'src/pages-sections/market-1/Section11'
import Section13 from 'src/pages-sections/market-1/Section13'
import { QueryClient, dehydrate, useQuery, useQueries } from 'react-query'
import { ICategory, IProductPreview } from 'src/shared/types/product.types'
import { ResponseList } from 'src/shared/types/response.types'
import staticApi from 'src/utils/api/market-1'
import { api } from 'src/api/index.service'
import { useEffect } from 'react'

type MarketProps = {
	carList?: any[]
	carBrands?: any[]
	moreItems?: any[]
	mobileList?: any[]
	opticsList?: any[]
	serviceList?: any[]
	opticsShops?: any[]
	mobileShops?: any[]
	mobileBrands?: any[]
	opticsBrands?: any[]
	topCategories?: any[]
	flashDealsData?: any[]
	topRatedBrands?: any[]
	newArrivalsList?: any[]
	bigDiscountList?: any[]
	mainCarouselData?: [Models['MainCarouselItem']]
	topRatedProducts?: any[]
	bottomCategories?: any[]
}

const MarketShop: NextPage<MarketProps> = (props) => {
	const {
		'0': newArrivalsList,
		'1': topRatedProducts,
		'2': bigDiscountList,
		'3': flashDealsData,
	} = useQueries([
		{
			queryKey: 'newArrivalsList',
			queryFn: () =>
				api.products.ShopsProductsService.getList({
					page_size: 6,
					ordering: '-created_at',
				}),
		},
		{
			queryKey: 'topRatedProducts',
			queryFn: () =>
				api.products.ShopsProductsService.getList({
					page_size: 6,
					ordering: '-rating',
				}),
		},
		{
			queryKey: 'bigDiscountList',
			queryFn: () =>
				api.products.ShopsProductsService.getList({
					page_size: 9,
					ordering: '-discount_price',
				}),
		},
		{
			queryKey: 'flashDealsData',
			queryFn: () =>
				api.products.ShopsProductsService.getList({
					page_size: 9,
					ordering: '-total_sales',
				}),
		},
	])

	const { data: products } = useQuery(
		['shop products main'],
		() =>
			api.products.ShopsProductsService.getList({
				page: 1,
				page_size: 8,
			}),
		{
			select: (data: ResponseList<IProductPreview>) => data.results,
		}
	)

	const { data: categories = [] } = useQuery(
		'categories',
		() => api.categories.CategoriesService.getList(),
		{
			select: (data: ResponseList<ICategory>) => data.results,
			staleTime: 1000 * 60 * 10,
			cacheTime: 1000 * 60 * 10,
		}
	)

	return (
		<ShopLayout1>
			<SEO
				title="Topshopes - Home"
				description="
			Topshopes - Маркетплейс, где вы можете найти все, что вам нужно.
			"
			/>

			{/* HERO SLIDER SECTION */}
			<Section1 carouselData={props.mainCarouselData} />

			{/* FLASH DEALS SECTION */}
			<Section2 flashDeals={flashDealsData?.data?.results.slice(0, 9)} />

			{/* TOP CATEGORIES */}
			<Section3 categoryList={categories} />

			{/* TOP RATED PRODUCTS */}
			<Section4
				topRatedList={topRatedProducts?.data?.results}
				topRatedBrands={products}
			/>

			{/* NEW ARRIVAL LIST */}
			<Section5 newArrivalsList={newArrivalsList?.data?.results} />

			{/* BIG DISCOUNTS */}
			<Section13 bigDiscountList={bigDiscountList?.data?.results} />

			{/* CAR LIST
			<Section6 carBrands={props.carBrands} carList={products} /> */}

			{/* MOBILE PHONES
			<Section7
				shops={props.mobileShops}
				brands={props.mobileBrands}
				title="Mobile Phones"
				productList={products}
			/>

			{/* PROMO BANNERS */}
			{/* <Section8 /> */}

			{/* OPTICS / WATHCH */}
			{/* <Section7
				title="Optics / Watch"
				shops={props.opticsShops}
				brands={props.opticsBrands}
				productList={products}
			/> */}

			{/* CATEGORIES */}
			{/* <Section10 categories={props.bottomCategories} /> */}

			{/* MORE FOR YOU */}
			<Section11 moreItems={products} />

			{/* SERVICE CARDS
			<Section12 serviceList={props.serviceList} /> */}
		</ShopLayout1>
	)
}

export async function getStaticProps({ locale }) {
	try {
		const queryClient = new QueryClient()
		await queryClient.fetchQuery(['shop products main'], () =>
			api.products.ShopsProductsService.getList({
				page: 1,
				page_size: 9,
			})
		)

		const carList = await staticApi.getCarList()
		const carBrands = await staticApi.getCarBrands()
		const moreItems = await staticApi.getMoreItems()
		const mobileList = await staticApi.getMobileList()
		const opticsList = await staticApi.getOpticsList()
		const mobileShops = await staticApi.getMobileShops()
		const opticsShops = await staticApi.getOpticsShops()
		const serviceList = await staticApi.getServiceList()
		const mobileBrands = await staticApi.getMobileBrands()
		const flashDealsData = await staticApi.getFlashDeals()
		const opticsBrands = await staticApi.getOpticsBrands()
		const bottomCategories = await staticApi.getCategories()
		const topCategories = await staticApi.getTopCategories()
		const topRatedBrands = await staticApi.getTopRatedBrand()
		const mainCarouselData = await staticApi.getMainCarousel()
		const bigDiscountList = await staticApi.getBigDiscountList()

		return {
			props: {
				carList,
				carBrands,
				moreItems,
				mobileList,
				opticsList,
				serviceList,
				mobileShops,
				opticsShops,
				mobileBrands,
				opticsBrands,
				topCategories,
				flashDealsData,
				topRatedBrands,
				// newArrivalsList,
				bigDiscountList,
				mainCarouselData,
				// topRatedProducts,
				bottomCategories,
				// =========
				dehydratedState: dehydrate(queryClient),
				...(await serverSideTranslations(locale as string, ['common', 'home'])),
				// =========
			},
			revalidate: 1000,
		}
	} catch {
		return {
			props: {
				...(await serverSideTranslations(locale as string, ['common', 'home'])),
				revalidate: 1000,
			},
		}
	}
}

export default MarketShop
