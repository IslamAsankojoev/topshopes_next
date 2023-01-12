import { Box, Container, Tab, Tabs, styled } from '@mui/material'
import { axiosClassic } from 'api/interceptor'
import { ShopsProductsService } from 'api/services/products/product.service'
import { H2 } from 'components/Typography'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import Navbar from 'components/navbar/Navbar'
import AvailableShops from 'components/products/AvailableShops'
import FrequentlyBought from 'components/products/FrequentlyBought'
import ProductDescription from 'components/products/ProductDescription'
import ProductIntro from 'components/products/ProductIntro'
import ProductReview from 'components/products/ProductReview'
import RelatedProducts from 'components/products/RelatedProducts'
import { getAllProductsUrl, getProductsUrl } from 'config/api.config'
import bazaarReactDatabase from 'data/bazaar-react-database'
import { GetServerSideProps } from 'next'
import { FC, useEffect, useState } from 'react'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { IProduct } from 'shared/types/product.types'
import {
	getFrequentlyBought,
	getRelatedProducts,
} from 'utils/api/related-products'
import { useRouter } from 'next/router'

const StyledTabs = styled(Tabs)(({ theme }) => ({
	minHeight: 0,
	marginTop: 80,
	marginBottom: 24,
	borderBottom: `1px solid ${theme.palette.text.disabled}`,
	'& .inner-tab': {
		minHeight: 40,
		fontWeight: 600,
		textTransform: 'capitalize',
	},
}))

// ===============================================================
type ProductDetailsProps = {
	product?: IProduct
}
// ===============================================================

const ProductDetails: FC<ProductDetailsProps> = (props) => {
	const { product } = props

	// const {
	// 	data: product,
	// 	refetch,
	// 	isLoading,
	// } = useQuery(['product detail'], () => ShopsProductsService.get(id as string))


	// const [product, setProduct] = useState(bazaarReactDatabase[2])
	const [selectedOption, setSelectedOption] = useState(0)
	// const [relatedProducts, setRelatedProducts] = useState([]);
	// const [frequentlyBought, setFrequentlyBought] = useState([]);

	/**
	 * Note:
	 * ==============================================================
	 * 1. We used client side rendering with dummy fake data for related products and frequently product
	 * 2. Product details data is static data, we didn't call any rest api
	 * 3. If you fetch data from server we recommended you to call getStaticProps function in below.
	 *    The code is commented if want to call it just uncomment code and put the server url
	 */
	// useEffect(() => {
	//   getRelatedProducts().then((data) => setRelatedProducts(data));
	//   getFrequentlyBought().then((data) => setFrequentlyBought(data));
	// }, []);

	const handleOptionClick = (_, value: number) => setSelectedOption(value)

	return (
		<ShopLayout1>
			<Container sx={{ my: 4 }}>
				{product ? <ProductIntro product={product} /> : <H2>Loading...</H2>}

				<StyledTabs
					textColor="primary"
					value={selectedOption}
					indicatorColor="primary"
					onChange={handleOptionClick}
				>
					<Tab className="inner-tab" label="Description" />
					<Tab className="inner-tab" label="Review (3)" />
				</StyledTabs>

				<Box mb={6}>
					{selectedOption === 0 && <ProductDescription />}
					{selectedOption === 1 && (
						<ProductReview product={product} refetch={() => null} />
					)}
				</Box>

				{/* {frequentlyBought && <FrequentlyBought productsData={frequentlyBought} />}

        <AvailableShops />

        {relatedProducts && <RelatedProducts productsData={relatedProducts} />} */}
			</Container>
		</ShopLayout1>
	)
}

// export const getStaticPaths: GetStaticPaths = async () => {
// 	const paths = bazaarReactDatabase
// 		.slice(0, 2)
// 		?.map((pro) => ({ params: { id: pro.id } }))

// 	return {
// 		paths: [], //indicates that no page needs be created at build time
// 		fallback: 'blocking', //indicates the type of fallback
// 	}
// }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const { trueID } = ctx.query
		const data = ShopsProductsService.get(trueID as string)
		// const queryClient = new QueryClient()
		// await queryClient.fetchQuery(['product detail'], () =>

		// )


		return {
			props: {
				id: trueID,
				// =========
				// dehydratedState: dehydrate(queryClient),
				product: data,
				// =========
			},
		}
	} catch {
		return { props: {} }
	}
}

export default ProductDetails
