import { Apps, FilterList, ViewList } from '@mui/icons-material'
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
import { ShopsProductsService } from 'api/services/shops-products/ShopsProducts.service'
import { H5, Paragraph } from 'components/Typography'
import { FlexBox } from 'components/flex-box'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import ProductCard1List from 'components/products/ProductCard1List'
import ProductCard9List from 'components/products/ProductCard9List'
import ProductFilterCard from 'components/products/ProductFilterCard'
import Sidenav from 'components/sidenav/Sidenav'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import React from 'react'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { IProductPreview } from 'shared/types/product.types'
import { ResponseList } from 'shared/types/response.types'

// ===================================================
export const getServerSideProps: GetServerSideProps = async ({
	query,
	locale,
}) => {
	try {
		const queryClient = new QueryClient()
		await queryClient.fetchQuery(['shop products'], () =>
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
	// fetching
	const router = useRouter()
	const { data: products } = useQuery(
		['shop products'],
		() => ShopsProductsService.getList(query),
		{
			enabled: !!query,
			select: (data: ResponseList<IProductPreview>) => data,
		}
	)

	const { t } = useTranslation('shop')

	// mui settings
	const [view, setView] = useState('grid')
	const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	// ordering
	const filterHandler = (params: Record<string, string | number>) => {
		router.push({
			pathname: router.pathname,
			query: { ...router.query, ...params, page: 1 },
		})
	}

	return (
		<ShopLayout1>
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
								value={router?.query?.ordering}
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
							<ProductCard9List products={products.results} />
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
	{ label: 'priceLow', value: 'overall_price' },
	{ label: 'priceHigh', value: '-overall_price' },
]

export default ShopPage
