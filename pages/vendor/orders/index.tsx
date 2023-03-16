import {
	Box,
	Card,
	Pagination,
	Stack,
	Table,
	TableContainer,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { ShopsService } from 'src/api/services/shop/shop.service'
import Empty from 'src/components/Empty'
import Scrollbar from 'src/components/Scrollbar'
import { H3 } from 'src/components/Typography'
import SearchArea from 'src/components/dashboard/SearchArea'
import TableHeader from 'src/components/data-table/TableHeader'
import TablePagination from 'src/components/data-table/TablePagination'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useMuiTable from 'src/hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { OrderRow } from 'src/pages-sections/admin'
import { ReactElement, useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import MemizeComponent from 'src/components/MemizeComponent/MemizeComponent'

// table column list
const tableHeading = [
	{ id: 'id', label: 'orderId', align: 'left' },
	{ id: 'qty', label: 'qty', align: 'left' },
	{ id: 'Created at', label: 'createdAt', align: 'left' },
	{ id: 'city', label: 'city', align: 'left' },
	{ id: 'amount', label: 'price', align: 'left' },
	{ id: 'profit', label: 'profit', align: 'left' },
	{ id: 'status', label: 'status', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

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

const OrderList: NextPageAuth = () => {
	const { t } = useTranslation('common')
	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const {
		data: orders,
		isLoading,
		refetch,
	} = useQuery(
		[`orders get search=${searchValue}`, currentPage],
		() =>
			ShopsService.getShopOrders({
				search: searchValue,
				page: currentPage,
				page_size: 10,
			}),
		{
			enabled: !!currentPage,
			keepPreviousData: true,
			onError: (e: any) => {
				toast.error(e.message)
			},
		}
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({
			listData: orders?.results,
			defaultSort: 'purchaseDate',
			defaultOrder: 'desc',
		})

	return (
		<Box py={4}>
			<H3 mb={2}>{t('orders')}</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				handleBtnClick={() => {}}
				searchPlaceholder={t('searchOrder')}
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
									rowCount={orders?.length}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((order, index) => (
										<OrderRow order={order} key={index} refetch={refetch} />
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<MemizeComponent
						component={
							<Stack alignItems="center" my={4}>
								<Pagination
									variant="outlined"
									shape="rounded"
									count={Math.ceil(orders?.count / 10)}
									onChange={(e, page) => handleChangePage(e, page)}
								/>
							</Stack>
						}
					/>
				</Card>
			) : (
				<Empty />
			)}
		</Box>
	)
}

OrderList.isOnlySeller = true

OrderList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default OrderList
