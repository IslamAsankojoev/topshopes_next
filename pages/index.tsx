import { CategoriesService } from 'api/services/categories/category.service'
import { ShopsProductsService } from 'api/services/shops-products/ShopsProducts.service'
import SEO from 'components/SEO'
import Setting from 'components/Setting'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import Models from 'models'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Section1 from 'pages-sections/market-1/Section1'
import Section2 from 'pages-sections/market-1/Section2'
import Section3 from 'pages-sections/market-1/Section3'
import Section4 from 'pages-sections/market-1/Section4'
import Section5 from 'pages-sections/market-1/Section5'
import Section6 from 'pages-sections/market-1/Section6'
import Section7 from 'pages-sections/market-1/Section7'
import Section8 from 'pages-sections/market-1/Section8'
import Section10 from 'pages-sections/market-1/Section10'
import Section11 from 'pages-sections/market-1/Section11'
import Section12 from 'pages-sections/market-1/Section12'
import Section13 from 'pages-sections/market-1/Section13'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { ICategory, IProductPreview } from 'shared/types/product.types'
import { ResponseList } from 'shared/types/response.types'
import api from 'utils/api/market-1'

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

const slider = [
	{
		title: 'новый аромат',
		description: 'хорошие ароматы создают настроение, лучшие говорят без слов',
		imgUrl: 'assets/images/banner1.webp',
	},
	{
		title: 'новый аромат',
		description: 'хорошие ароматы создают настроение, лучшие говорят без слов',
		imgUrl: 'assets/images/баннер4.webp',
	},
]
const MarketShop: NextPage<MarketProps> = (props) => {
	const { data: products } = useQuery(
		['shop products'],
		() =>
			ShopsProductsService.getList({
				page: 1,
				page_size: 6,
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
		}
	)
	return (
		<ShopLayout1>
			<SEO title="Home" />

			{/* HERO SLIDER SECTION */}
			<Section1 carouselData={slider} />

			{/* FLASH DEALS SECTION */}
			<Section2 flashDeals={products} />

			{/* TOP CATEGORIES */}
			<Section3 categoryList={categories} />

			{/* TOP RATED PRODUCTS */}
			<Section4 topRatedList={products} topRatedBrands={products} />

			{/* NEW ARRIVAL LIST */}
			<Section5 newArrivalsList={products} />

			{/* BIG DISCOUNTS */}
			<Section13 bigDiscountList={products} />

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
		await queryClient.fetchQuery(['shop products'], () =>
			ShopsProductsService.getList({
				page: 1,
				page_size: 6,
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
		const newArrivalsList = await api.getNewArrivalList()
		const bigDiscountList = await api.getBigDiscountList()
		const topRatedProducts = await api.getTopRatedProduct()

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
				newArrivalsList,
				bigDiscountList,
				mainCarouselData,
				topRatedProducts,
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
