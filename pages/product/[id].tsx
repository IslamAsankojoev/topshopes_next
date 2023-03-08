import { Box, Container, Tab, Tabs, styled, Button } from '@mui/material'
import { ShopsProductsService } from 'src/api/services/products/product.service'
import { H2 } from 'src/components/Typography'
import ShopLayout1 from 'src/components/layouts/ShopLayout1'
import ProductDescription from 'src/components/products/ProductDescription'
import ProductIntro from 'src/components/products/ProductIntro'
import ProductReview from 'src/components/products/ProductReview'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FC, useState } from 'react'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { IProduct } from 'src/shared/types/product.types'
import SEO from 'src/components/SEO'


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
	data?: IProduct
	id?: string
	queryClient: QueryClient
}
// ===============================================================

const ProductDetails: FC<ProductDetailsProps> = (props) => {
	const { t } = useTranslation('common')
	const { id, queryClient } = props

	const { data: product, refetch } = useQuery(
		[`product detail`, id],
		() => ShopsProductsService.get(id as string),
		{
			enabled: !!id,
			select: (data: IProduct) => data,
		}
	)

	const [selectedOption, setSelectedOption] = useState(0)

	const handleOptionClick = (_, value: number) => setSelectedOption(value)

	return (
		<ShopLayout1>
			<SEO title={`Topshopes - ${product.name}`} />
			<Container sx={{ my: 4 }}>
				{product ? <ProductIntro product={product} /> : <H2>Loading...</H2>}

				<StyledTabs
					textColor="primary"
					value={selectedOption}
					indicatorColor="primary"
					onChange={handleOptionClick}
				>
					<Tab className="inner-tab" label={t('description')} />
					<Tab
						className="inner-tab"
						label={`${t('review')} ${product?.reviews.length}`}
					/>
				</StyledTabs>

				<Box mb={6}>
					{selectedOption === 0 && <ProductDescription  desc={product.description}/>}
					{selectedOption === 1 && (
						<ProductReview product={product} refetch={refetch} queryClient={queryClient} />
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

// =

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const { id } = ctx.query
		const queryClient = new QueryClient()
		await queryClient.fetchQuery([`product detail`, id], () =>
			ShopsProductsService.get(id as string)
		)

		return {
			props: {
				id,
				// =========
				dehydratedState: dehydrate(queryClient),
				...(await serverSideTranslations(ctx.locale as string, [
					'common',
					'review',
				])),
				// =========
			},
		}
	} catch {
		return {
			props: {
				...(await serverSideTranslations(ctx.locale as string, [
					'common',
					'review',
				])),
			},
		}
	}
}

export default ProductDetails
