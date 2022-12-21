import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { OrdersService } from 'api/services/orders/orders.service'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Loading from 'components/Loading'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import useMuiTable from 'hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { OrderRow } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import api from 'utils/api/dashboard'

// table column list
const tableHeading = [
	{ id: 'id', label: 'Order ID', align: 'left' },
	{ id: 'qty', label: 'Qty', align: 'left' },
	{ id: 'delivered_at', label: 'delivered_at', align: 'left' },
	{ id: 'billingAddress', label: 'Billing Address', align: 'left' },
	{ id: 'amount', label: 'Amount', align: 'left' },
	{ id: 'status', label: 'Status', align: 'left' },
	{ id: 'action', label: 'Action', align: 'center' },
]

const OrderList: NextPageAuth = () => {
	const { data: orders, isLoading } = useQuery(
		'orders admin get',
		OrdersService.getList,
		{
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
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({
		listData: orders,
		defaultSort: 'purchaseDate',
		defaultOrder: 'desc',
	})

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Orders</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText="Create Order"
				handleBtnClick={() => {}}
				searchPlaceholder="Search Order..."
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
								rowCount={orders.length}
								numSelected={selected.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList.map((order, index) => (
									<OrderRow order={order} key={index} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Scrollbar>

				<Stack alignItems="center" my={4}>
					<TablePagination
						onChange={handleChangePage}
						count={Math.ceil(orders.length / rowsPerPage)}
					/>
				</Stack>
			</Card>
		</Box>
	)
}

OrderList.isOnlyUser = true

OrderList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export const getStaticProps: GetStaticProps = async () => {
	const orders = await api.orders()

	return { props: { orders } }
}

export default OrderList
