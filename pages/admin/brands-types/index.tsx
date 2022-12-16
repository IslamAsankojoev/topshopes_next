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
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { BrandTypesService } from '../../../src/api/services-admin/brand-types/brandTypes.service'
import BrandsTypesRow from '../../../src/pages-sections/admin/BrandsTypesRow'

const tableHeading = [
	{ id: 'name', label: 'Name', align: 'center' },
	{ id: 'action', label: 'Action', align: 'center' },
]

// =============================================================================
BrandsTypesList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

type BrandsTypesListProps = { sizes: any[] }

export default function BrandsTypesList() {
	const { push } = useRouter()

	const {
		data: brandsTypes,
		isLoading,
		refetch,
	} = useQuery<any>('get brandsTypes admin', BrandTypesService.getBrandsTypes)

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: brandsTypes })

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Product Brands Types</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText="Add Brands Types"
				handleBtnClick={() => {
					push('/admin/brands-types/create')
				}}
				searchPlaceholder="Search Brands Types..."
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
								rowCount={brandsTypes?.length}
								numSelected={selected.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList.map((bt, index) => (
									<BrandsTypesRow
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
						count={Math.ceil(brandsTypes?.length / rowsPerPage)}
					/>
				</Stack>
			</Card>
		</Box>
	)
}
