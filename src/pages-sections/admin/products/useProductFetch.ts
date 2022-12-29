import { useQuery } from 'react-query'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import { SizesService } from 'api/services/sizes/sizes.service'
import { ColorsService } from 'api/services/colors/colors.service'
import { ShopsService } from 'api/services-admin/shops/shops.service'
import { ICategory, IColor } from 'shared/types/product.types'
import { IShop } from 'shared/types/shop.types'
import { BrandsService } from 'api/services-admin/brands/brand.service'
import { ISize } from 'shared/types/product.types'
import { IBrand } from 'shared/types/brand.types'

export interface ProductFetchTypes {
	categories: ICategory[]
	brands: IBrand[]
	colors: IColor[]
	size: ISize[]
	shops?: IShop[]
	isLoading: boolean
}

export const useProductFetch = () => {
	const { data: categories, isLoading: categoriesLoading } = useQuery(
		'admin-categories',
		CategoriesService.getList,
		{ refetchOnWindowFocus: false, retry: 1 }
	)
	const { data: brands, isLoading: brandsLoading } = useQuery(
		'admin-brands',
		BrandsService.getList,
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)
	const { data: size, isLoading: sizeLoading } = useQuery(
		'sizes',
		SizesService.getList,
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)
	const { data: colors, isLoading: colorsLoading } = useQuery(
		'colors',
		ColorsService.getList,
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)
	const { data: shops, isLoading: shopsLoading } = useQuery(
		'shops',
		ShopsService.getList,
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
			categoriesLoading ||
			brandsLoading ||
			sizeLoading ||
			colorsLoading ||
			shopsLoading,
	}

	return result
}
