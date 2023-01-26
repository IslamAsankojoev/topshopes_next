import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
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
import { SellerRow } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { NextPageAuth } from 'shared/types/auth.types'
import api from 'utils/api/dashboard'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const sellers = await api.sellers()
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'adminActions',
			])),
			sellers,
		},
	}
}
// table column list
const tableHeading = [
	{ id: 'name', label: 'sellerName', align: 'left' },
	{ id: 'shopName', label: 'shopName', align: 'left' },
	{ id: 'package', label: 'currentPackage', align: 'left' },
	{ id: 'balance', label: 'currentBalance', align: 'left' },
	{ id: 'published', label: 'published', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

type SellerListProps = { sellers: any[] }
// =============================================================================

const SellerList: NextPageAuth<SellerListProps> = ({ sellers }) => {
	const { t } = useTranslation('admin')
	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: sellers })

	return (
		<Box py={4}>
			<H3 mb={2}>{t('sellers')}</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText={t('add')}
				handleBtnClick={() => {}}
				searchPlaceholder={t('searchingFor')}
			/>

			{filteredList?.length ? (
				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 1100 }}>
							<Table>
								<TableHeader
									order={order}
									hideSelectBtn
									orderBy={orderBy}
									heading={tableHeading}
									rowCount={sellers?.length}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((seller, index) => (
										<SellerRow seller={seller} key={index} />
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<Stack alignItems="center" my={4}>
						<TablePagination
							onChange={handleChangePage}
							count={Math.ceil(sellers?.length / rowsPerPage)}
						/>
					</Stack>
				</Card>
			) : (
				<Empty />
			)}
		</Box>
	)
}

SellerList.isOnlyUser = true

SellerList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default SellerList
