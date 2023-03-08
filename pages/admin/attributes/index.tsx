import { Box, Card, Pagination, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { AttributesServiceAdmin } from 'src/api/services-admin/attributes/attributes.service'
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
import { useRouter } from 'next/router'
import AttributesRow from 'src/pages-sections/admin/AttributesRow'
import { ReactElement, useState } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'

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
// IProductAttribute

const tableHeading = [
	{ id: 'name', label: 'name', align: 'center' },
	{ id: 'action', label: 'action', align: 'center' },
]

const AttributesList: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: attributes, refetch } = useQuery<any>(
		[`get attributes admin search=${searchValue}`, currentPage],
		() =>
			AttributesServiceAdmin.getList({
				search: searchValue,
				page: currentPage,
				page_size: 10,
			}),{
				keepPreviousData: true,
				enabled: !!currentPage,
			}
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: attributes?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('attributes')}</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				buttonText={t('addNewAttribute')}
				handleBtnClick={() => {
					push('/admin/attributes/create')
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
									rowCount={attributes?.length}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((bt, index) => (
										<AttributesRow
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
						{/* <TablePagination
							onChange={handleChangePage}
							count={Math.ceil(attributes?.count / 20)}
							page={currentPage}
						/> */}
						<Pagination variant="outlined" shape="rounded"  count={Math.ceil(attributes?.count / 10)} onChange={(e, page)=> handleChangePage(e, page)}/>
					</Stack>
				</Card>
			) : (
				<Empty />
			)}
		</Box>
	)
}

AttributesList.isOnlyAdmin = true

AttributesList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default AttributesList
