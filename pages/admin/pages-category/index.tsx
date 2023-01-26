import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { PageCategoryService } from 'api/services-admin/pages-categories/pagesCategories.service'
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
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import PageCategoryRow from 'pages-sections/admin/PageCategoryRow'
import React, { ReactElement } from 'react'
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
const tableHeading = [
	{ id: 'title', label: 'name', align: 'center' },
	{ id: 'action', label: 'action', align: 'center' },
]

const PageCategoryList: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()

	const {
		data: pageCategory,
		isLoading,
		refetch,
	} = useQuery<any>(`page-category admin get`, () =>
		PageCategoryService.getList()
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: pageCategory?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('pagesCategory')}</H3>
			{isLoading ? <Loading /> : null}
			<SearchArea
				handleSearch={() => {}}
				buttonText={t('addNewPageCategory')}
				handleBtnClick={() => {
					push('/admin/pages-category/create')
				}}
				searchPlaceholder={t('searchingFor')}
				searchOff={true}
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
									rowCount={pageCategory?.count}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((size, index) => (
										<PageCategoryRow
											name={size}
											key={index}
											selected={selected}
											refetch={refetch}
										/>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				</Card>
			) : (
				<Empty />
			)}
		</Box>
	)
}
PageCategoryList.isOnlyUser = true

PageCategoryList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default PageCategoryList
