import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { OrdersService } from 'api/services/orders/orders.service'
import Empty from 'components/Empty'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useMuiTable from 'hooks/useMuiTable'
import lodash from 'lodash'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { OrderRow } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IOrder } from 'shared/types/order.types'
import { ResponseList } from 'shared/types/response.types'

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
// table column list
const tableHeading = [
	{ id: 'id', label: 'orderId', align: 'left' },
	{ id: 'qty', label: 'qty', align: 'left' },
	{ id: 'created_at', label: 'createdAt', align: 'left' },
	{ id: 'billingAddress', label: 'billingAddress', align: 'left' },
	{ id: 'price', label: 'price', align: 'left' },
	{ id: 'status', label: 'status', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

const OrderList: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const [searchValue, setSearchValue] = React.useState('')
	const [currentPage, setCurrentPage] = React.useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: orders, isLoading } = useQuery(
		`orders admin get search=${searchValue} page=${currentPage}`,
		() =>
			OrdersService.getList({
				search: searchValue,
				page: currentPage,
				page_size: 20,
			}),
		{
			select: (data: ResponseList<IOrder>) => {
				return {
					...data,
					results: data.results.map((order: any) => ({
						...order,
						created_at: new Date(order.created_at).getTime(),
					})),
				}
			},
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleRequestSort,
	} = useMuiTable({
		listData: orders?.results,
		defaultSort: 'purchaseDate',
		defaultOrder: 'desc',
	})

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('orders')}</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				handleBtnClick={() => {}}
				searchPlaceholder={t('searchingFor')}
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
									rowCount={orders?.count}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{lodash
										.sortBy(filteredList, 'created_at')
										?.map((order, index) => (
											<OrderRow order={order} key={index} />
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<Stack alignItems="center" my={4}>
						<TablePagination
							onChange={handleChangePage}
							count={Math.ceil(orders?.count / 20)}
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

OrderList.isOnlyUser = true

OrderList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default OrderList
