import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { CategoriesService } from 'api/services-admin/categories/category.service'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import useMuiTable from 'hooks/useMuiTable'
import { useRouter } from 'next/router'
import { CategoryRow } from 'pages-sections/admin'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { ICategory } from 'shared/types/product.types'

// table column list
const tableHeading = [
	{ id: 'name', label: 'Name', align: 'left' },
	{ id: 'category', label: 'Category', align: 'left' },
	{ id: 'Icon', label: 'Icon', align: 'left' },
	{ id: 'Image', label: 'Image', align: 'left' },
	{ id: 'featured', label: 'Featured', align: 'left' },
	{ id: 'action', label: 'Action', align: 'center' },
]

const CategoryList: NextPageAuth = () => {
	const { push } = useRouter()
	const {
		data: categories,
		refetch,
		isLoading,
	} = useQuery('get categories admin', CategoriesService.getList)

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: categories })

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Product Categories</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText="Add Category"
				handleBtnClick={() => {
					push('/admin/categories/create')
				}}
				searchPlaceholder="Search Category..."
			/>

			<Card>
				<Scrollbar>
					<TableContainer sx={{ minWidth: 900 }}>
						<Table>
							<TableHeader
								order={order}
								hideSelectBtn
								orderBy={orderBy}
								heading={tableHeading}
								rowCount={categories.length}
								numSelected={selected.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList?.map((category, index) => (
									<CategoryRow
										item={category}
										key={index}
										selected={selected}
										refetch={refetch}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Scrollbar>

				<Stack alignItems="center" my={4}>
					<TablePagination
						onChange={handleChangePage}
						count={Math.ceil(categories.length / rowsPerPage)}
					/>
				</Stack>
			</Card>
		</Box>
	)
}

CategoryList.isOnlyUser = true

CategoryList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CategoryList
