import { FilterList } from '@mui/icons-material'
import {
	Box,
	Card,
	Container,
	Grid,
	IconButton,
	MenuItem,
	TextField,
	Theme,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ShopsProductsService } from 'src/api/services/shops-products/ShopsProducts.service'
import { H5, Paragraph } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import ShopLayout1 from 'src/components/layouts/ShopLayout1'
import ProductCard1List from 'src/components/products/ProductCard1List'
import ProductFilterCard from 'src/components/products/ProductFilterCard'
import Sidenav from 'src/components/sidenav/Sidenav'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { IProductPreview } from 'src/shared/types/product.types'
import { ResponseList } from 'src/shared/types/response.types'
import SEO from 'src/components/SEO'
import { useState } from 'react'

// ===================================================
export const getServerSideProps: GetServerSideProps = async ({
	query,
	locale,
}) => {
	try {
		const queryClient = new QueryClient()
		await queryClient.fetchQuery(['shop products page', query], () =>
			ShopsProductsService.getList(query as Record<string, string | number>)
		)

		return {
			props: {
				query,
				dehydratedState: dehydrate(queryClient),
				...(await serverSideTranslations(locale as string, ['common', 'shop'])),
			},
		}
	} catch {
		return {
			props: {
				...(await serverSideTranslations(locale as string, ['common', 'shop'])),
			},
		}
	}
}
// ===================================================

const ShopPage = ({ query }) => {
	const router = useRouter()
	const { data: products } = useQuery(
		['shop products page', query],
		() => ShopsProductsService.getList({ ...query, page_size: 21 }),
		{
			enabled: !!query,
			select: (data: ResponseList<IProductPreview>) => {
				return {
					...data,
					results: data.results.filter((product: IProductPreview) => {
						return product.is_published === true
					}),
				}
			},
		}
	)

	const { t } = useTranslation('shop')

	const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	const paginationHandler = (page: number) => {
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, page },
			},
			undefined,
			{ scroll: false }
		)
	}

	const filterHandler = (params: Record<string, string | number>) => {
		router.push({
			pathname: router.pathname,
			query: { ...router.query, ...params, page: 1 },
		})
	}

	return (
		<ShopLayout1>
			<SEO title={'Магазин'} description="Topshopes - Магазин" />
			<Container sx={{ mt: 4, mb: 6 }}>
				<Card
					elevation={1}
					sx={{
						mb: '55px',
						display: 'flex',
						flexWrap: 'wrap',
						alignItems: 'center',
						justifyContent: 'space-between',
						p: {
							sm: '1rem 1.25rem',
							md: '0.5rem 1.25rem',
							xs: '1.25rem 1.25rem 0.25rem',
						},
					}}
				>
					<Box>
						<H5>{t('shopPage')}</H5>
						{/* <Paragraph color="grey.600">48 results found</Paragraph> */}
					</Box>

					<FlexBox
						alignItems="center"
						columnGap={4}
						flexWrap="wrap"
						my="0.5rem"
					>
						<FlexBox alignItems="center" gap={1} flex="1 1 0">
							<Paragraph color="grey.600" whiteSpace="pre">
								{t('sort')}:
							</Paragraph>

							<TextField
								select
								fullWidth
								size="small"
								variant="outlined"
								value={router?.query?.ordering || sortOptions[0].value}
								defaultValue={sortOptions[0].value}
								sx={{ flex: '1 1 0', minWidth: '150px' }}
								onChange={({ target }) =>
									filterHandler({ ordering: target.value })
								}
							>
								{sortOptions?.map((item) => (
									<MenuItem value={item.value} key={item.value}>
										{t(item.label)}
									</MenuItem>
								))}
							</TextField>
						</FlexBox>

						<FlexBox alignItems="center" my="0.25rem">
							{downMd && (
								<Sidenav
									handle={
										<IconButton>
											<FilterList fontSize="small" />
										</IconButton>
									}
								>
									<ProductFilterCard />
								</Sidenav>
							)}
						</FlexBox>
					</FlexBox>
				</Card>

				<Grid container spacing={3}>
					<Grid item md={3} sx={{ display: { md: 'block', xs: 'none' } }}>
						<ProductFilterCard />
					</Grid>

					<Grid item md={9} xs={12}>
						{products?.count ? (
							<ProductCard1List
								products={products.results}
								count={products.count}
								handleChange={paginationHandler}
							/>
						) : null}
					</Grid>
				</Grid>
			</Container>
		</ShopLayout1>
	)
}

const sortOptions = [
	{ label: 'all', value: '#' },
	{ label: 'novelties', value: '-created_at' },
	{ label: 'priceLow', value: 'price' },
	{ label: 'priceHigh', value: '-price' },
]

export default ShopPage
