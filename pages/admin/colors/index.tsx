import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { ColorsService } from 'api/services/colors/colors.service'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import useMuiTable from 'hooks/useMuiTable'
import { useRouter } from 'next/router'
import ColorRow from 'pages-sections/admin/ColorRow'
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'

const tableHeading = [
	{ id: 'name', label: 'Name', align: 'center' },
	{ id: 'color', label: 'Color', align: 'center' },
	{ id: 'action', label: 'Action', align: 'center' },
]

const ColorList: NextPageAuth = () => {
	const { push } = useRouter()

	const {
		data: colors,
		isLoading,
		refetch,
	} = useQuery<any>('colors admin get', ColorsService.getColors)

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: colors })

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Product Colors</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText="Add Color"
				handleBtnClick={() => {
					push('/admin/colors/create')
				}}
				searchPlaceholder="Search Color..."
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
								rowCount={colors.length}
								numSelected={selected.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList.map((color, index) => (
									<ColorRow
										color={color}
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
						count={Math.ceil(colors.length / rowsPerPage)}
					/>
				</Stack>
			</Card>
		</Box>
	)
}

ColorList.isOnlyUser = true

ColorList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default ColorList
