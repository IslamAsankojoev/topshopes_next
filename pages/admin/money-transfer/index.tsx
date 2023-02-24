import { Box, Card, Stack, Table, TableContainer, Typography } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { MoneyTransferService } from 'src/api/services-admin/money-transfer/MoneyTransfer.service'
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
import MoneyTransferRow from 'src/pages-sections/admin/TransferMoneyRow'
import { ReactElement, useState } from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { makeRequest } from 'src/api/interceptor'
import { AxiosResponse } from 'axios'
import { getCurrency } from 'src/utils/getCurrency'
import SellIcon from '@mui/icons-material/Sell';



type ReportAdmin = {
	id: string
	name: string
	total_tax: number
	total_amount: number
}

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
	{ id: 'thumbnail', label: 'thumbnail', align: 'left' },
	{ id: 'amount', label: 'amount', align: 'left' },
	{ id: 'shop', label: 'shop', align: 'left' },
	{ id: 'tax', label: 'tax', align: 'left' },
]

const MoneyTransfer: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const {data: moneyStats} = useQuery('get money statistics', () => makeRequest(true).get<ReportAdmin>('report-admin/'),
	{
		select: (data: AxiosResponse<ReportAdmin>) => data.data[0],
	})

	const { data: moneyTransfer, refetch } = useQuery(
		`get moneyTransfer admin search=${searchValue} page=${currentPage}`,
		() =>
			MoneyTransferService.getList({
				search: searchValue,
				page: currentPage,
				page_size: 20,
			})
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: moneyTransfer?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('moneyTransfer')}</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				handleBtnClick={() => {}}
				searchPlaceholder={t('searchingFor')}
				sideComponent={
					<>
					<Box sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						gap: 2,
					}}>
					<Card sx={{
						backgroundColor: 'primary.100',
						p: 2,
					}}>
						<Box sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							gap: 2,
						}}>
							<SellIcon sx={{
								color: 'primary.800',
							}} />
							<Typography sx={{
								color: 'primary.900',
								fontWeight: 'bold',
							}}>{getCurrency(moneyStats?.total_amount)}</Typography>

						</Box>
					</Card>
					<Card sx={{
						backgroundColor: 'success.100',
						p: 2,
					}}>
						<Box sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							gap: 2,
						}}>
							<TrendingUpIcon sx={{
								color: 'success.800',
							}} />
							<Typography sx={{
								color: 'success.900',
								fontWeight: 'bold',
							}}>{getCurrency(moneyStats?.total_tax)}</Typography>
						</Box>
					</Card>
					</Box>
				</>
				}
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
									rowCount={moneyTransfer?.count}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((moneyTransfer, index) => (
										<MoneyTransferRow
											item={moneyTransfer}
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
							count={Math.ceil(moneyTransfer?.count / 20)}
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

MoneyTransfer.isOnlySeller = true

MoneyTransfer.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default MoneyTransfer
