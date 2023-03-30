import axios from 'axios'
import Product from 'src/models/product.model'

// get all product slug
const getSlugs = async (): Promise<{ params: { slug: string } }[]> => {
	const response = await axios.get('/api/products/slug-list')
	return response.data
}

// get product based on slug
const getProduct = async (slug: string): Promise<Product[]> => {
	const response = await axios.get('/api/products/slug', { params: { slug } })
	return response.data
}

export default { getSlugs, getProduct }
