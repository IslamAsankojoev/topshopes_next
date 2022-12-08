export const API_URL = `${process.env.SERVER_URL}/api/`

export const getAuthUrl = (string: string) => `auth/${string}`
export const getUsersUrl = (string: string) => `users/${string}`
export const getProductsUrl = (string: string) => `products/${string}`
export const getCategoriesUrl = (string: string) => `categories/${string}`
export const getPostsUrl = (string: string) => `posts/${string}`
export const getOrdersUrl = (string: string) => `orders/${string}`
export const getAddressesUrl = (string: string) => `profile/address/${string}`
