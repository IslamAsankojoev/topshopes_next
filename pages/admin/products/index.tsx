import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { AdminProductsService } from 'api/services-admin/products/products.service'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import useMuiTable from 'hooks/useMuiTable'
import { useRouter } from 'next/router'
import { ProductRow } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'

const tableHeading = [
	{ id: 'name', label: 'Name', align: 'left' },
	{ id: 'category', label: 'Category', align: 'left' },
	{ id: 'brand', label: 'Brand', align: 'left' },
	{ id: 'price', label: 'Price', align: 'left' },
	{ id: 'published', label: 'Published', align: 'left' },
	{ id: 'action', label: 'Action', align: 'center' },
]

const ProductList: NextPageAuth = () => {
	const [searchValue, setSearchValue] = React.useState('')
	const [currentPage, setCurrentPage] = React.useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const {
		data: products,
		isLoading,
		refetch,
	} = useQuery(`products admin search=${searchValue} page=${currentPage}`, () =>
		AdminProductsService.getList({
			search: searchValue,
			page: currentPage,
			page_size: 20,
		})
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: products?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>Product List</H3>

			<SearchArea
				handleSearch={(value: string) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				handleBtnClick={() => {}}
				searchPlaceholder="Search Product..."
			/>

			{isLoading ? <Loading /> : null}

			{products?.count ? (
				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 900 }}>
							<Table>
								<TableHeader
									order={order}
									hideSelectBtn
									orderBy={orderBy}
									heading={tableHeading}
									rowCount={products?.count}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((product, index) => (
										<ProductRow
											refetch={refetch}
											product={product}
											key={index}
										/>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<Stack alignItems="center" my={4}>
						<TablePagination
							onChange={handleChangePage}
							count={Math.ceil(products?.count / 20)}
							page={currentPage}
						/>
					</Stack>
				</Card>
			) : (
				<h2>Empty...</h2>
			)}
		</Box>
	)
}

ProductList.isOnlyAdmin = true

ProductList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default ProductList
