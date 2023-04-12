import {
	Box,
	Card,
	Pagination,
	Stack,
	Table,
	TableContainer,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { OrdersService } from 'src/api/services-admin/orders/order.service'
import Empty from 'src/components/Empty'
import Scrollbar from 'src/components/Scrollbar'
import { H3 } from 'src/components/Typography'
import SearchArea from 'src/components/dashboard/SearchArea'
import TableHeader from 'src/components/data-table/TableHeader'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useMuiTable from 'src/hooks/useMuiTable'
import sortBy from 'lodash-es/sortBy'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { OrderRow } from 'src/pages-sections/admin'
import { ReactElement, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IOrder } from 'src/shared/types/order.types'
import { ResponseList } from 'src/shared/types/response.types'
import useSorter from 'src/hooks/useSorter'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { localize } from 'src/utils/Translate/localize'

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
	{ id: 'id', label: 'id', align: 'center', sortable: true },
	{
		id: 'quantity',
		label: localize({
			ru: 'Количество',
			tr: 'Miktar',
			en: 'Quantity',
		}),
		align: 'center',
		sortable: true,
	},
	{ id: 'created_at', label: 'createdAt', align: 'center', sortable: true },
	{
		id: 'billingAddress',
		label: 'billingAddress',
		align: 'center',
		sortable: false,
	},
	{ id: 'price', label: 'price', align: 'center', sortable: true },
	{ id: 'profit', label: 'profit', align: 'center', sortable: true },
	{ id: 'status', label: 'status', align: 'center', sortable: true },
	// { id: 'action', label: 'action', align: 'center' },
]

const OrderList: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const { order, orderBy, ordering, handleSorting } = useSorter()
	const [parent, enableAnimate] = useAutoAnimate()

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const {
		data: orders,
		isLoading,
		refetch,
	} = useQuery(
		[`orders admin get search=`, searchValue + currentPage + order + orderBy],
		() =>
			OrdersService.getList({
				search: searchValue,
				page: currentPage,
				page_size: 10,
				ordering: ordering,
			}),
		{
			keepPreviousData: true,
			enabled: !!currentPage,
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
				console.error(e.message)
			},
		}
	)

	const { selected, rowsPerPage, filteredList, handleRequestSort } =
		useMuiTable({
			listData: orders?.results,
			defaultSort: 'purchaseDate',
			defaultOrder: 'desc',
		})

	useEffect(() => {
		refetch()
	}, [order, orderBy])

	return (
		<Box py={4} ref={parent}>
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
									onRequestSort={handleSorting}
								/>

								<TableBody>
									{sortBy(filteredList, 'created_at')?.map((order, index) => (
										<OrderRow
											isAdmin={true}
											order={order}
											key={index}
											refetch={refetch}
										/>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<Stack alignItems="center" my={4}>
						<Pagination
							variant="outlined"
							shape="rounded"
							count={Math.ceil(orders?.count / 10)}
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

OrderList.isOnlyAdmin = true

OrderList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default OrderList
