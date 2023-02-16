import { Box, Card, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { PagesService } from 'api/services-admin/pages/pages.service'
import Empty from 'components/Empty'
import Loading from 'components/Loading'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import useMuiTable from 'hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import PagesRow from 'pages-sections/admin/PagesRow'
import { ReactElement } from 'react'

import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'

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
	{ id: 'title', label: 'name', align: 'left' },
	{ id: 'image', label: 'thumbnail', align: 'left' },
	{ id: 'dateUpdated', label: 'date', align: 'left' },
	{ id: 'actions', label: 'action', align: 'left' },
]

const PagesList: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()
	const {
		data: pages,
		refetch,
		isLoading,
	} = useQuery(`categories admin`, () => PagesService.getList())

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: pages?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('pageList')}</H3>

			<SearchArea
				handleSearch={() => {}}
				buttonText={t('addNewPage')}
				handleBtnClick={() => {
					push('/admin/pages-list/create')
				}}
				searchPlaceholder={t('searhingFor')}
				searchOff={true}
			/>

			{isLoading ? <Loading /> : null}

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
									rowCount={pages?.count}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((page) => (
										<PagesRow
											item={page}
											key={page?.id}
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

PagesList.isOnlyAuth = true

PagesList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default PagesList
