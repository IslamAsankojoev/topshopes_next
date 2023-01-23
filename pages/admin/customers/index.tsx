import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { UsersService } from 'api/services-admin/users/users.service'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useMuiTable from 'hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { CustomerRow } from 'pages-sections/admin'
import { ReactElement } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { IUser } from 'shared/types/user.types'
import api from 'utils/api/dashboard'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'adminActions',
			])),
		},
	}
}
const tableHeading = [
	{ id: 'first_name', label: 'firstName', align: 'left' },
	{ id: 'phone', label: 'phone', align: 'left' },
	{ id: 'email', label: 'Email', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

type CustomerListProps = { customers: IUser[] }

const CustomerList: NextPageAuth<CustomerListProps> = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
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
			<H3 mb={2}>{adminT('members')}</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				handleBtnClick={() => {
					push('/admin/customers/create')
				}}
				searchPlaceholder={t('editUser')}
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
