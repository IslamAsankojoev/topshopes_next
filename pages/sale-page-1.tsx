import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { Box, Chip, styled } from '@mui/material'
import SaleLayout from 'src/components/layouts/SaleLayout'
import { FlexRowCenter } from 'src/components/flex-box'
import useScroller from 'src/hooks/useScroller'
import Product from 'src/models/product.model'
import Category from 'src/models/category.model'
import api from 'src/utils/__api__/sales'

// import productsList from "data/product-database";

//  custom styled components
const CategoryBoxWrapper = styled(FlexRowCenter)<{ selected: number }>(
	({ selected, theme }) => ({
		flex: '1 1 0',
		height: '175px',
		margin: '0.75rem',
		minWidth: '200px',
		cursor: 'pointer',
		borderRadius: '8px',
		position: 'relative',
		flexDirection: 'column',
		transition: 'all 250ms ease-in-out',
		border: `1px solid ${theme.palette.grey[400]}`,
		background: selected ? 'white' : 'transparent',
	})
)

const StyledChip = styled(Chip)<{ selected: number }>(
	({ selected, theme }) => ({
		top: '1rem',
		right: '1rem',
		fontWeight: 600,
		fontSize: '10px',
		padding: '5px 10px',
		position: 'absolute',
		color: selected ? 'white' : 'inherit',
		boxShadow: selected
			? '0px 8px 20px -5px rgba(255, 103, 128, 0.9)'
			: 'inherit',
		backgroundColor: selected
			? theme.palette.primary.main
			: theme.palette.grey[300],
	})
)

const CategoryWrapper = styled(Box)<{ show: number }>(({ show, theme }) => ({
	left: 0,
	zIndex: 99,
	width: '100%',
	position: 'fixed',
	top: show ? 0 : -90,
	boxShadow: theme.shadows[2],
	transition: 'top 0.3s ease-in-out',
}))

const SalePage1: NextPage = () => {
	const PRODUCT_PER_PAGE = 28
	const categoryRef = useRef<HTMLDivElement>(null)

	const [page, setPage] = useState(1)
	const [categories, setCategories] = useState<Category[]>([])
	const [productList, setProductList] = useState<Product[]>([])
	const [selectedCategory, setSelectedCategory] = useState('women')
	const { isFixedHeader } = useScroller(categoryRef)

	// HANDLE CHANGE PAGE
	const handlePageChange = (_, page: number) => setPage(page)
	// HANDLE THE CHANGE CATEGORY
	const handleCategoryChange = (category: string) => () =>
		setSelectedCategory(category)

	// FETCH CATEGORIES FROM SERVER
	useEffect(() => {
		api.getCategories().then((data) => setCategories(data))
	}, [])

	// FETCH PRODUCTS FROM SERVER
	useEffect(() => {
		api.getProducts(page).then((data) => setProductList(data))
	}, [page])

	return (
		<SaleLayout>
			{/* <SEO title="Sale page v1" />

			<Container sx={{ mt: '2rem' }}>
				<CategoryWrapper show={isFixedHeader ? 1 : 0}>
					<SaleNavbar
						// @ts-ignore
						categories={categories}
						selected={selectedCategory}
						onChangeCategory={handleCategoryChange}
					/>
				</CategoryWrapper>

				<FlexBox mb={4} flexWrap="wrap">
					<H1 color="primary.main" mr={1} lineHeight="1">
						Flash Deals,
					</H1>

					<H1 color="grey.600" lineHeight="1">
						Enjoy Upto 80% discounts
					</H1>
				</FlexBox>

				<Box mb={4} overflow="hidden" ref={categoryRef}>
					<FlexBox m={-1.5} flexWrap="wrap">
						{categories.map((item) => {
							const selectedItem = item.slug === selectedCategory ? 1 : 0
							const Icon = appIcons[item.icon]

							return (
								<CategoryBoxWrapper
									key={item.slug}
									selected={selectedItem}
									onClick={handleCategoryChange(item.slug)}
								>
									<Icon
										fontSize="inherit"
										sx={{ fontSize: 44 }}
										color={selectedItem ? 'primary' : 'secondary'}
									/>

									<H5 color={selectedItem ? 'primary.main' : 'inherit'}>
										{item.name}
									</H5>

									<StyledChip
										size="small"
										color="primary"
										label="Upto 40% off"
										selected={selectedItem}
									/>
								</CategoryBoxWrapper>
							)
						})}
					</FlexBox>
				</Box>

				<Grid container spacing={3} minHeight={500}>
					{productList.map((item) => {
						const id = v4()
						return (
							<Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
								<ProductCard1
									// @ts-ignore
									id={id}
									slug={item.slug}
									title={item.title}
									price={item.price}
									rating={item.rating}
									imgUrl={item.thumbnail}
									discount={item.discount}
								/>
							</Grid>
						)
					})}
				</Grid>

				<FlexBetween flexWrap="wrap" my={8}>
					<Span>
						{renderProductCount(page, PRODUCT_PER_PAGE, productDB.length)}
					</Span>
					<Pagination
						page={page}
						color="primary"
						variant="outlined"
						onChange={handlePageChange}
						count={Math.ceil(productDB.length / PRODUCT_PER_PAGE)}
					/>
				</FlexBetween>
			</Container> */}
		</SaleLayout>
	)
}

export default SalePage1
