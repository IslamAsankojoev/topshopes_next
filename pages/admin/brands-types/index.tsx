import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import Empty from 'components/Empty'
import Loading from 'components/Loading'
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
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'

import { BrandTypesService } from '../../../src/api/services-admin/brand-types/brandTypes.service'
import BrandsTypesRow from '../../../src/pages-sections/admin/BrandsTypesRow'

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
	{ id: 'name', label: 'name', align: 'center' },
	{ id: 'action', label: 'action', align: 'center' },
]

const BrandsTypesList: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const { t: adminT } = useTranslation('admin')

	const { push } = useRouter()

	const [searchValue, setSearchValue] = React.useState('')
	const [currentPage, setCurrentPage] = React.useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: brandsTypes, refetch } = useQuery(
		`get brandsTypes admin search=${searchValue} page=${currentPage}`,
		() =>
			BrandTypesService.getList({
				search: searchValue,
				page: currentPage,
				page_size: 20,
			})
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: brandsTypes?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('brandType')}</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				buttonText={t('addNewBrandType')}
				handleBtnClick={() => {
					push('/admin/brands-types/create')
				}}
				searchPlaceholder={t('searchingFor')}
			/>

			{filteredList?.length ? (
				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 600 }}>
							<Table>
								<TableHeader
									order={order}
									hideSelectBtn
									orderBy={orderBy}
									heading={tableHeading}
									rowCount={brandsTypes?.count}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((bt, index) => (
										<BrandsTypesRow
											name={bt}
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
							count={Math.ceil(brandsTypes?.count / 20)}
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

BrandsTypesList.isOnlyAuth = true

BrandsTypesList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default BrandsTypesList
