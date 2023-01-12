import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { AttributesServiceAdmin } from 'api/services-admin/attributes/attributes.service'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import useMuiTable from 'hooks/useMuiTable'
import { useRouter } from 'next/router'
import AttributesRow from 'pages-sections/admin/AttributesRow'
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'

// IProductAttribute

const tableHeading = [
	{ id: 'name', label: 'Name', align: 'center' },
	{ id: 'action', label: 'Action', align: 'center' },
]

const AttributesList: NextPageAuth = () => {
	const { push } = useRouter()

	const {
		data: attributes,
		isLoading,
		refetch,
	} = useQuery<any>('get attributes admin', AttributesServiceAdmin.getList)

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: attributes })

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Product Attributes</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText="Add attributes"
				handleBtnClick={() => {
					push('/admin/attributes/create')
				}}
				searchPlaceholder="Search Attributes..."
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
								rowCount={attributes?.length}
								numSelected={selected?.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList?.map((bt, index) => (
									<AttributesRow
										name={bt}
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
						count={Math.ceil(attributes?.length / rowsPerPage)}
					/>
				</Stack>
			</Card>
		</Box>
	)
}

AttributesList.isOnlyUser = true

AttributesList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default AttributesList
