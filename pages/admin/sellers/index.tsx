import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { UsersService } from 'api/services-admin/users/users.service'
import Empty from 'components/Empty'
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
import SellerRow from 'pages-sections/admin/SellerRow'
import { ReactElement, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { ResponseList } from 'shared/types/response.types'
import { IUser } from 'shared/types/user.types'

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
	{ id: 'first_name', label: 'FirstName', align: 'left' },
	{ id: 'phone', label: 'Phone', align: 'left' },
	{ id: 'email', label: 'Email', align: 'left' },
	{ id: 'shop', label: 'Shop', align: 'left' },
]

type CustomerListProps = { customers: IUser[] }

const SellersList: NextPageAuth<CustomerListProps> = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: users, refetch } = useQuery(
		`get users all sellers search=${searchValue} page=${currentPage}`,
		() =>
			UsersService.getList({
				search: searchValue,
				page: currentPage,
				page_size: 100,
			}),
		{
			select: (data: ResponseList<IUser>) => {
				return {
					...data,
					results: [...data.results].filter((user) => user.is_seller),
				}
			},
		}
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: users?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>Sellers</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				handleBtnClick={() => push('/admin/sellers')}
				searchPlaceholder={t('editUser')}
			/>

			{filteredList?.length ? (
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
										<SellerRow
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
			) : (
				<Empty />
			)}
		</Box>
	)
}

SellersList.isOnlyAdmin = true

SellersList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default SellersList
