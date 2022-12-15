import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import useMuiTable from 'hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { ProductRow } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import api from 'utils/api/dashboard'
import { instance } from '../../../src/api/interceptor'
import { getProductsUrlAdmin } from '../../../src/config/api.config'
import { useQuery } from 'react-query'
import { CategoriesService } from '../../../src/api/services-admin/categories/category.service'
import { AdminProductsService } from '../../../src/api/services-admin/products/products.service'
import Loading from '../../../src/components/Loading'
import { useRouter } from 'next/router'

const tableHeading = [
	{ id: 'title', label: 'Title', align: 'left' },
	{ id: 'categories', label: 'Categories', align: 'left' },
	// { id: 'thumbnail', label: 'Thumbnail', align: 'left' },
	{ id: 'brand', label: 'Brand', align: 'left' },
	{ id: 'price', label: 'Price', align: 'left' },
	{ id: 'published', label: 'Published', align: 'left' },
	{ id: 'action', label: 'Action', align: 'center' },
]

// =============================================================================
ProductList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

type ProductListProps = { products: any[] }
// =============================================================================

export default function ProductList() {
	const { push } = useRouter()
	const { data: products, isLoading } = useQuery(
		'admin-products',
		AdminProductsService.getProducts
	)

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: products })

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Product List</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText="Add Product"
				handleBtnClick={() => push('/admin/products/create')}
				searchPlaceholder="Search Product..."
			/>

			{products?.length ? (
				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 900 }}>
							<Table>
								<TableHeader
									order={order}
									hideSelectBtn
									orderBy={orderBy}
									heading={tableHeading}
									rowCount={products.length}
									numSelected={selected.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList.map((product, index) => (
										<ProductRow product={product} key={index} />
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<Stack alignItems="center" my={4}>
						<TablePagination
							onChange={handleChangePage}
							count={Math.ceil(products.length / rowsPerPage)}
						/>
					</Stack>
				</Card>
			) : null}
		</Box>
	)
}
