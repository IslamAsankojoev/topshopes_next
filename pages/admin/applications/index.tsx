import {
	Box,
	Card,
	Pagination,
	Stack,
	Table,
	TableContainer,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { ApplicationServices } from 'src/api/services-admin/applications/applications.service'
import Empty from 'src/components/Empty'
import Scrollbar from 'src/components/Scrollbar'
import { H3 } from 'src/components/Typography'
import SearchArea from 'src/components/dashboard/SearchArea'
import TableHeader from 'src/components/data-table/TableHeader'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useMuiTable from 'src/hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import ApplicationsRow from 'src/pages-sections/admin/ApplicationsRow'
import { ReactElement, useState } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'adminActions',
				'application',
			])),
		},
	}
}
// IProductAttribute

const tableHeading = [
	{ id: 'short_name', label: 'shop', align: 'center' },
	{ id: 'status', label: 'status', align: 'center' },
	// { id: 'action', label: 'action', align: 'center' },
]

const Applications: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()
	const [parent, enableAnimate] = useAutoAnimate()

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: applications, refetch } = useQuery<any>(
		[`get applications admin search=${searchValue}`, currentPage],
		() =>
			ApplicationServices.getApplications({
				search: searchValue,
				page: currentPage,
				page_size: 10,
			}),
		{
			keepPreviousData: true,
			enabled: !!currentPage,
		}
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: applications?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('applications')}</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				// buttonText={adminT('add')}
				handleBtnClick={() => {}}
				searchPlaceholder={t('searchingFor')}
			/>

			<span ref={parent}>
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
										rowCount={applications?.length}
										numSelected={selected?.length}
										onRequestSort={handleRequestSort}
									/>

									<TableBody>
										{filteredList?.map((bt, index) => (
											<ApplicationsRow
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
							<Pagination
								variant="outlined"
								shape="rounded"
								count={Math.ceil(applications?.count / 10)}
								onChange={(e, page) => handleChangePage(e, page)}
							/>
						</Stack>
					</Card>
				) : (
					<Empty />
				)}
			</span>
		</Box>
	)
}

Applications.isOnlyAdmin = true

Applications.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default Applications
