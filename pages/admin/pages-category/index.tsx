import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { AdminPageCategoryService } from 'api/services-admin/pages-categories/pagesCategories.service'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import useMuiTable from 'hooks/useMuiTable'
import { useRouter } from 'next/router'
import PageCategoryRow from 'pages-sections/admin/PageCategoryRow'
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'

const tableHeading = [
	{ id: 'title', label: 'Title', align: 'center' },
	{ id: 'action', label: 'Action', align: 'center' },
]

const PageCategoryList: NextPageAuth = () => {
	const { push } = useRouter()

	const {
		data: pageCategory,
		isLoading,
		refetch,
	} = useQuery<any>('page-category admin get', AdminPageCategoryService.getList)

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: pageCategory })

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Page Category</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText="Add page category"
				handleBtnClick={() => {
					push('/admin/pages-category/create')
				}}
				searchPlaceholder="Search page category..."
			/>

			<Card>
				<Scrollbar>
					<TableContainer sx={{ minWidth: 600 }}>
						<Table>
							<TableHeader
								order={order}
								hideSelectBtn
								orderBy={orderBy}
								heading={tableHeading}
								rowCount={pageCategory?.length}
								numSelected={selected.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList.map((size, index) => (
									<PageCategoryRow
										name={size}
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
						count={Math.ceil(pageCategory?.length / rowsPerPage)}
					/>
				</Stack>
			</Card>
		</Box>
	)
}
PageCategoryList.isOnlyUser = true

PageCategoryList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default PageCategoryList