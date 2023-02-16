import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { MoneyTransferService } from 'api/services-admin/money-transfer/MoneyTransfer.service'
import Empty from 'components/Empty'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useMuiTable from 'hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import MoneyTransferRow from 'pages-sections/admin/TransferMoneyRow'
import { ReactElement, useState } from 'react'

import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'

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

MoneyTransfer.isOnlyAuth = true

MoneyTransfer.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default MoneyTransfer
