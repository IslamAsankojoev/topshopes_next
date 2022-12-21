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

const tableHeading = [
	{ id: 'first_name', label: 'First name', align: 'left' },
	{ id: 'phone', label: 'Phone', align: 'left' },
	{ id: 'email', label: 'Email', align: 'left' },
	{ id: 'verified', label: 'Verified', align: 'left' },
	{ id: 'action', label: 'Action', align: 'center' },
]

type CustomerListProps = { customers: IUser[] }

const CustomerList: NextPageAuth<CustomerListProps> = ({ customers }) => {
	const { push } = useRouter()
	const {
		data: Users,
		isLoading,
		refetch,
	} = useQuery('get users all', UsersService.getList)

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: Users })

	return !isLoading ? (
		<Box py={4}>
			<H3 mb={2}>Users</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText="Add Users"
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
								rowCount={customers.length}
								numSelected={selected.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList.map((customer, index) => (
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
						count={Math.ceil(customers.length / rowsPerPage)}
					/>
				</Stack>
			</Card>
		</Box>
	) : null
}

CustomerList.isOnlyUser = true

CustomerList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export const getStaticProps: GetStaticProps = async () => {
	const customers = await api.customers()
	return { props: { customers } }
}

export default CustomerList
