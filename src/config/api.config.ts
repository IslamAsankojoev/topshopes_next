export const API_URL = `${process.env.SERVER_URL}/api/`

// Client
export const getAuthUrl = (string: string) => `auth/${string}`
export const getProfilePaymentUrl = (string: string) =>
	`profile/payments/${string}`
export const getProductsUrl = (string: string) => `products/${string}`
export const getProductVariantsUrl = (string: string) =>
	`products/variants/${string}`
export const getColorsUrl = (string: string) =>
	`products/variants/colors/${string}`
export const getSizeUrl = (string: string) =>
	`products/variants/sizes/${string}`
export const getCategoriesUrl = (string: string) => `shops/categories/${string}`
export const getPostsUrl = (string: string) => `posts/${string}`
export const getOrdersUrl = (string: string) => `orders/${string}`
export const getShopOrdersUrl = (string: string) =>
	`shop/orders${string ? `/${string}` : ''}/`
export const getBrandsUrl = (string: string) => `shops/brand/${string}`
export const getAddressesUrl = (string: string) => `profile/address/${string}`
export const getAttrubutesUrl = (string: string) =>
	`products/variants/attributes/${string}`
export const getShopUrl = (string: string) => `shop/${string}`

export const getImagesUrl = (string: string) =>
	`products/variants/images/${string}`

export const getShopProductsUrl = (string: string) =>
	`shops/${string}/products/`

export const getAllProductsUrl = (string: string) => `shops/products/${string}`
export const getShopsUrl = (string: string) => `shops/${string}`
export const getReviewUrl = (string: string) =>
	`shops/products/${string}/review/`

// Admin
export const getBrandsUrlAdmin = (string: string) => `admin/brand/${string}`
export const getBrandsTypesUrlAdmin = (string: string) =>
	`admin/brand/type/${string}`
export const getCategoriesUrlAdmin = (string: string) =>
	`admin/categories/${string}`
export const getProductsUrlAdmin = (string: string) =>
	`admin/products/${string}`
export const getProductVariantsUrlAdmin = (string: string) =>
	`admin/products/variants/${string}`
export const getShopsUrlAdmin = (string: string) => `admin/shops/${string}`
export const getPagesUrlAdmin = (string: string) => `admin/pages/${string}`
export const getPageCategoryUrlAdmin = (string: string) =>
	`admin/page/categories/${string}`
export const getUsersUrlAdmin = (string: string) => `admin/users/${string}`
export const getSiteSettingsUrlAdmin = (string: string) =>
	`admin/settings/${string}`
export const getAttributesUrlAdmin = (string: string) =>
	`admin/attributes/${string}`
