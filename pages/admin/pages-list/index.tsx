import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { PagesService } from 'api/services-admin/pages/pages.service'
import Loading from 'components/Loading'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useMuiTable from 'hooks/useMuiTable'
import { useRouter } from 'next/router'
import PagesRow from 'pages-sections/admin/PagesRow'
import { ReactElement } from 'react'
import React from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'

// table column list
const tableHeading = [
	{ id: 'title', label: 'Title', align: 'left' },
	{ id: 'image', label: 'Image', align: 'left' },
	{ id: 'dateUpdated', label: 'Date updated', align: 'left' },
	{ id: 'actions', label: 'actions', align: 'left' },
]

const PagesList: NextPageAuth = () => {
	const { push } = useRouter()
	const {
		data: pages,
		refetch,
		isLoading,
	} = useQuery(`categories admin`, () => PagesService.getList())

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: pages?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>Pages list</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText="Add Page"
				handleBtnClick={() => {
					push('/admin/pages-list/create')
				}}
				searchPlaceholder="Search pages..."
				searchOff={true}
			/>

			{isLoading ? <Loading /> : null}

			<Card>
				<Scrollbar>
					<TableContainer sx={{ minWidth: 900 }}>
						<Table>
							<TableHeader
								order={order}
								hideSelectBtn
								orderBy={orderBy}
								heading={tableHeading}
								rowCount={pages?.count}
								numSelected={selected?.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList?.map((page) => (
									<PagesRow
										item={page}
										key={page?.id}
										selected={selected}
										refetch={refetch}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Scrollbar>
			</Card>
		</Box>
	)
}

PagesList.isOnlyUser = true

PagesList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default PagesList
