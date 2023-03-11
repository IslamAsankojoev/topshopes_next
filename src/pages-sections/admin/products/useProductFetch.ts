import { useQuery } from 'react-query'
import { ShopsService } from 'src/api/services-admin/shops/shops.service'

import { ICategory } from 'src/shared/types/product.types'
import { IShop } from 'src/shared/types/shop.types'

import { IBrand } from 'src/shared/types/brand.types'
import { CategoriesService } from 'src/api/services/categories/category.service'
import { BrandsService } from 'src/api/services/brands/brand.service'

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
		() => CategoriesService.getList({search: categoriesSearch || '', page_size: 200}),
		{ 
			refetchOnWindowFocus: false, 
			retry: 0,
			select: (data) => data?.results
		}
	)

	const { data: brands, isLoading: brandsLoading } = useQuery(
		`brands get search=${brandsSearch}`,
		() => BrandsService.getList({search: brandsSearch || '', page_size: 200}),
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
