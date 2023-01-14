import { useQuery } from 'react-query'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import { ShopsService } from 'api/services-admin/shops/shops.service'

import { ICategory } from 'shared/types/product.types'
import { IShop } from 'shared/types/shop.types'
import { BrandsService } from 'api/services-admin/brands/brand.service'

import { IBrand } from 'shared/types/brand.types'

export interface ProductFetchTypes {
	categories: ICategory[]
	brands: IBrand[]
	shops?: IShop[]
	isLoading: boolean
}

interface ProductFetchProps {
	isAdmin: boolean
	search: {
		categoriesSearch: string
		brandsSearch: string
		shopsSearch?: string
	}
}
export const useProductFetch = (
	isAdmin = false, 
	{categoriesSearch, brandsSearch, shopsSearch}: Record<string, string>
	) => {

	const { data: categories, isLoading: categoriesLoading } = useQuery(
		`categories get search=${categoriesSearch}`,
		() => CategoriesService.getList({search: categoriesSearch || ''}),
		{ 
			refetchOnWindowFocus: false, 
			retry: 0,
			select: (data) => data?.results
		}
	)

	const { data: brands, isLoading: brandsLoading } = useQuery(
		`brands get search=${brandsSearch}`,
		() => BrandsService.getList({search: brandsSearch || ''}),
		{
			refetchOnWindowFocus: false,
			retry: 0,
			select: (data) => data?.results
		}
	)

	const { data: shops, isLoading: shopsLoading } = useQuery(
		`shops get search=${shopsSearch}`,
		isAdmin ? () => ShopsService.getList({search: shopsSearch || ''}) : null,
		{
			refetchOnWindowFocus: false,
			retry: 0,
			select: (data) => data?.results
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
