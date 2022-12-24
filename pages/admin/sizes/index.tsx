import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import useMuiTable from 'hooks/useMuiTable'
import { useRouter } from 'next/router'
import SizeRow from 'pages-sections/admin/SizeRow'
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { SizesService } from '../../../src/api/services/sizes/sizes.service'

const tableHeading = [
	{ id: 'name', label: 'Name', align: 'center' },
	{ id: 'action', label: 'Action', align: 'center' },
]

const SizesList: NextPageAuth = () => {
	const { push } = useRouter()

	const {
		data: sizes,
		isLoading,
		refetch,
	} = useQuery<any>('colors admin get', SizesService.getList)

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: sizes })

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Product Sizes</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText="Add sizes"
				handleBtnClick={() => {
					push('/admin/sizes/create')
				}}
				searchPlaceholder="Search Sizes..."
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
								rowCount={sizes.length}
								numSelected={selected.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList?.map((size, index) => (
									<SizeRow
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
						count={Math.ceil(sizes.length / rowsPerPage)}
					/>
				</Stack>
			</Card>
		</Box>
	)
}
SizesList.isOnlyUser = true

SizesList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default SizesList
