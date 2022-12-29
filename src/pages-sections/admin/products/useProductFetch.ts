import { useQuery } from 'react-query'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import { SizesService } from 'api/services/sizes/sizes.service'
import { ColorsService } from 'api/services/colors/colors.service'
import { ShopsService } from 'api/services-admin/shops/shops.service'
import { ICategory, IColor, ISize } from 'shared/types/product.types'
import { IShop } from 'shared/types/shop.types'
import { BrandsService } from 'api/services-admin/brands/brand.service'
import { IBrand } from 'shared/types/brand.types'


export interface ProductFetchTypes {
	categories: ICategory[]
	brands: IBrand[]
	colors: IColor[]
	size: ISize[]
	shops?: IShop[]
	isLoading: boolean
}

export const useProductFetch = (isAdmin = false) => {
	const { data: categories, isLoading: categoriesLoading } = useQuery(
		'categories get',
		CategoriesService.getList,
		{ refetchOnWindowFocus: false, retry: 1 }
	)
	const { data: brands, isLoading: brandsLoading } = useQuery(
		'brands get',
		BrandsService.getList,
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)
	const { data: size, isLoading: sizeLoading } = useQuery(
		'sizes get',
		SizesService.getList,
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)
	const { data: colors, isLoading: colorsLoading } = useQuery(
		'colors get',
		ColorsService.getList,
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)

	
	const { data: shops, isLoading: shopsLoading } = useQuery(
		'shops get',
		() => {
			if (isAdmin){
				ShopsService.getList
			}
			return null
		},
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
		shops: isAdmin ?shops :null,
		isLoading:
			categoriesLoading ||
			brandsLoading ||
			sizeLoading ||
			colorsLoading ||
			shopsLoading,
	}

	return result
}
