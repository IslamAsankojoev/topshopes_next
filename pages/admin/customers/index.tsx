import {
	Box,
	Card,
	Pagination,
	Stack,
	Table,
	TableContainer,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { UsersService } from 'src/api/services-admin/users/users.service'
import Empty from 'src/components/Empty'
import Scrollbar from 'src/components/Scrollbar'
import { H3 } from 'src/components/Typography'
import SearchArea from 'src/components/dashboard/SearchArea'
import TableHeader from 'src/components/data-table/TableHeader'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useMuiTable from 'src/hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { CustomerRow } from 'src/pages-sections/admin'
import { ReactElement, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IUser } from 'src/shared/types/user.types'
import { useAutoAnimate } from '@formkit/auto-animate/react'

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
	{ id: 'email', label: 'Email', align: 'left' },
	{ id: 'first_name', label: 'firstName', align: 'left' },
	{ id: 'phone', label: 'phone', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

type CustomerListProps = { customers: IUser[] }

const CustomerList: NextPageAuth<CustomerListProps> = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()
	const [parent, enableAnimate] = useAutoAnimate()

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: users, refetch } = useQuery(
		[`get users all search=${searchValue}`, currentPage],
		() =>
			UsersService.getList({
				search: searchValue,
				page: currentPage,
				page_size: 10,
			}),
		{
			keepPreviousData: true,
			enabled: !!currentPage,
		}
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: users?.results })

	return (
		<Box py={4} ref={parent}>
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
									{
										// @ts-ignore
										orderBy(filteredList, ['email'])?.map((customer, index) => (
											<CustomerRow
												refetch={refetch}
												customer={customer}
												key={index}
											/>
										))
									}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<Stack alignItems="center" my={4}>
						<Pagination
							variant="outlined"
							shape="rounded"
							count={Math.ceil(users?.count / 10)}
							onChange={(e, page) => handleChangePage(e, page)}
						/>
					</Stack>
				</Card>
			) : (
				<Empty />
			)}
		</Box>
	)
}

CustomerList.isOnlyAdmin = true

CustomerList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CustomerList
