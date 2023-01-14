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
import { CustomerRow } from 'pages-sections/admin'
import { ReactElement } from 'react'
import { NextPageAuth } from 'shared/types/auth.types'
import api from 'utils/api/dashboard'
import { IUser } from 'shared/types/user.types'
import { useQuery } from 'react-query'
import { UsersService } from 'api/services-admin/users/users.service'
import { useRouter } from 'next/router'
import React from 'react'

const tableHeading = [
	{ id: 'first_name', label: 'First name', align: 'left' },
	{ id: 'phone', label: 'Phone', align: 'left' },
	{ id: 'email', label: 'Email', align: 'left' },
	{ id: 'verified', label: 'Verified', align: 'left' },
	{ id: 'action', label: 'Action', align: 'center' },
]

type CustomerListProps = { customers: IUser[] }

const CustomerList: NextPageAuth<CustomerListProps> = () => {
	const { push } = useRouter()

	const [searchValue, setSearchValue] = React.useState('')
	const [currentPage, setCurrentPage] = React.useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: users, refetch } = useQuery(
		`get users all search=${searchValue} page=${currentPage}`,
		() =>
			UsersService.getList({
				search: searchValue,
				page: currentPage,
				page_size: 20,
			})
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: users?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>Users</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				// buttonText="Add Users"
				handleBtnClick={() => {
					push('/admin/customers/create')
				}}
				searchPlaceholder="Search Users..."
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
								rowCount={users?.count}
								numSelected={selected?.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList?.map((customer, index) => (
									<CustomerRow
										refetch={refetch}
										customer={customer}
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
						count={Math.ceil(users?.count / 20)}
						page={currentPage}
					/>
				</Stack>
			</Card>
		</Box>
	)
}

CustomerList.isOnlyUser = true

CustomerList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CustomerList
