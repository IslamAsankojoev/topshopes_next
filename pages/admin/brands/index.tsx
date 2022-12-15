import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { BrandsService } from 'api/services-admin/brands/brand.service'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import useMuiTable from 'hooks/useMuiTable'
import { useRouter } from 'next/router'
import { BrandRow } from 'pages-sections/admin'
import React, { ReactElement, useEffect } from 'react'
import { useQuery } from 'react-query'

const tableHeading = [
	{ id: 'name', label: 'Name', align: 'center' },
	{ id: 'image', label: 'Image', align: 'center' },
	{ id: 'featured', label: 'Featured', align: 'center' },
	{ id: 'action', label: 'Action', align: 'center' },
]

// =============================================================================
BrandList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

type BrandListProps = { brands: any[] }

export default function BrandList() {
	const { push } = useRouter()

	const {
		data: brands,
		isLoading,
		refetch,
	} = useQuery<any>('get brands admin', () => BrandsService.getBrands())

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: brands })

	return !isLoading ? (
		<Box py={4}>
			<H3 mb={2}>Product Brands</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText="Add Brand"
				handleBtnClick={() => {
					push('/admin/brands/create')
				}}
				searchPlaceholder="Search Brand..."
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
								rowCount={brands.length}
								numSelected={selected.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList.map((brand, index) => (
									<BrandRow
										brand={brand}
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
						count={Math.ceil(brands.length / rowsPerPage)}
					/>
				</Stack>
			</Card>
		</Box>
	) : null
}
