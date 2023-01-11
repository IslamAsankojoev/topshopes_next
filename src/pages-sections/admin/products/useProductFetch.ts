import { useQuery } from 'react-query'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import { ShopsService } from 'api/services-admin/shops/shops.service'

import { ICategory, IColor, ISize } from 'shared/types/product.types'
import { IShop } from 'shared/types/shop.types'
import { BrandsService } from 'api/services-admin/brands/brand.service'

import { IBrand } from 'shared/types/brand.types'

export interface ProductFetchTypes {
	categories: ICategory[]
	brands: IBrand[]
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

	if (isAdmin) {
	}
	const { data: shops, isLoading: shopsLoading } = useQuery(
		'shops get',
		isAdmin ? ShopsService.getList : null,
		{
			refetchOnWindowFocus: false,
			retry: 1,
		}
	)

	const result: ProductFetchTypes = {
		categories,
		brands,
		shops,
		isLoading:
			categoriesLoading &&
			brandsLoading &&
			shopsLoading,
	}

	return result
}
