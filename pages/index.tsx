import { CategoriesService } from 'src/api/services/categories/category.service'
import { ShopsProductsService } from 'src/api/services/shops-products/ShopsProducts.service'
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
import api from 'src/utils/api/market-1'
import { axiosClassic } from 'src/api/interceptor'
import { useEffect, useLayoutEffect, useState } from 'react'
import useScrollToSavedPosition from 'src/hooks/useScrollToSavedPosition'

// =================================================================
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
// =================================================================

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
				axiosClassic.get<ResponseList<IProductPreview>>('/latest-products/', {
					params: {
						page: 1,
						page_size: 6,
					},
				}),
		},
		{
			queryKey: 'topRatedProducts',
			queryFn: () =>
				axiosClassic.get<ResponseList<IProductPreview>>('/top-rated-products/'),
		},
		{
			queryKey: 'bigDiscountList',
			queryFn: () =>
				axiosClassic.get<ResponseList<IProductPreview>>(
					'/discounted-products/'
				),
		},
		{
			queryKey: 'flashDealsData',
			queryFn: () =>
				axiosClassic.get<ResponseList<IProductPreview>>(
					'/best-selling-products/'
				),
		},
	])

	const { data: products } = useQuery(
		['shop products main'],
		() =>
			ShopsProductsService.getList({
				page: 1,
				page_size: 8,
			}),
		{
			select: (data: ResponseList<IProductPreview>) => data.results,
		}
	)

	const { data: categories = [] } = useQuery(
		'categories',
		() => CategoriesService.getList(),
		{
			select: (data: ResponseList<ICategory>) => data.results,
			staleTime: 1000 * 60 * 10,
			cacheTime: 1000 * 60 * 10,
		}
	)

	useScrollToSavedPosition()

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
			<Section2 flashDeals={flashDealsData?.data?.data?.results.slice(0, 9)} />

			{/* TOP CATEGORIES */}
			<Section3 categoryList={categories} />

			{/* TOP RATED PRODUCTS */}
			<Section4
				topRatedList={topRatedProducts?.data?.data?.results}
				topRatedBrands={products}
			/>

			{/* NEW ARRIVAL LIST */}
			<Section5 newArrivalsList={newArrivalsList?.data?.data?.results} />

			{/* BIG DISCOUNTS */}
			<Section13 bigDiscountList={bigDiscountList?.data?.data?.results} />

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
		// =========
		const queryClient = new QueryClient()
		await queryClient.fetchQuery(['shop products main'], () =>
			ShopsProductsService.getList({
				page: 1,
				page_size: 9,
			})
		)
		// =========

		const carList = await api.getCarList()
		const carBrands = await api.getCarBrands()
		const moreItems = await api.getMoreItems()
		const mobileList = await api.getMobileList()
		const opticsList = await api.getOpticsList()
		const mobileShops = await api.getMobileShops()
		const opticsShops = await api.getOpticsShops()
		const serviceList = await api.getServiceList()
		const mobileBrands = await api.getMobileBrands()
		const flashDealsData = await api.getFlashDeals()
		const opticsBrands = await api.getOpticsBrands()
		const bottomCategories = await api.getCategories()
		const topCategories = await api.getTopCategories()
		const topRatedBrands = await api.getTopRatedBrand()
		const mainCarouselData = await api.getMainCarousel()

		// const newArrivalsList = await axiosClassic
		// 	.get<ResponseList<IProductPreview>>('/latest-products/')
		// 	.then((data) => data.data.results)

		const bigDiscountList = await api.getBigDiscountList()

		// const topRatedProducts = await axiosClassic
		// 	.get<ResponseList<IProductPreview>>('/top-rated-products/')
		// 	.then((data) => data.data.results)

		// const topRatedProducts = await api

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
