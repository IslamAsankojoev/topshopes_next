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
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { ICategory, IProductPreview } from 'src/shared/types/product.types'
import { ResponseList } from 'src/shared/types/response.types'
import api from 'src/utils/api/market-1'

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
		}
	)
	return (
		<ShopLayout1>
			<SEO title="Topshopes - Home" description='
			Topshopes - Маркетплейс, где вы можете найти все, что вам нужно.
			' />

			{/* HERO SLIDER SECTION */}
			<Section1 carouselData={props.mainCarouselData} />

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
