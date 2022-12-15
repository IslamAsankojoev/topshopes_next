import { useQuery } from 'react-query'
import { CategoriesService } from '../../../api/services-admin/categories/category.service'
import { BrandService } from '../../../api/services-admin/brand/brand.service'
import { SizesService } from '../../../api/services/sizes/sizes.service'
import { ColorsService } from '../../../api/services/colors/colors.service'
import { ShopsService } from '../../../api/services-admin/shops/shops.service'
import { ICategory } from '../../../shared/types/product.types'
import { IShop } from '../../../shared/types/shop.types'

export interface ProductFetchTypes {
	categories: ICategory[]
	brands: { id: string; name: string; image: string }[]
	colors: { id: string; name: string }[]
	size: { id: string; name: string }[]
	shops: IShop[]
	isLoading: boolean
}

export const useProductFetch = () => {
	const { data: categories, isLoading: categoriesLoading } = useQuery(
		'admin-categories',
		CategoriesService.getCategories,
		{ refetchOnWindowFocus: false, retry: 1 }
	)
	const { data: brands, isLoading: brandsLoading } = useQuery(
		'admin-brands',
		BrandService.getBrands,
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)
	const { data: size, isLoading: sizeLoading } = useQuery(
		'sizes',
		SizesService.getSizes,
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)
	const { data: colors, isLoading: colorsLoading } = useQuery(
		'colors',
		ColorsService.getColors,
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)
	const { data: shops, isLoading: shopsLoading } = useQuery(
		'shops',
		ShopsService.getShops,
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)

	const result: ProductFetchTypes = {
		categories,
		brands,
		size,
		colors,
		shops,
		isLoading:
			categoriesLoading &&
			brandsLoading &&
			sizeLoading &&
			colorsLoading &&
			shopsLoading,
	}

	return result
}
