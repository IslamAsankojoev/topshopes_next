import {
	Box,
	Card,
	Pagination,
	Stack,
	Table,
	TableContainer,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import Empty from 'src/components/Empty'
import Scrollbar from 'src/components/Scrollbar'
import { H3 } from 'src/components/Typography'
import SearchArea from 'src/components/dashboard/SearchArea'
import TableHeader from 'src/components/data-table/TableHeader'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useMuiTable from 'src/hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import BrandsTypesRow from 'src/pages-sections/admin/BrandsTypesRow'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { api_admin } from 'src/api/index.service'

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
	const [parent, enableAnimate] = useAutoAnimate()

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: brandsTypes, refetch } = useQuery(
		[`get brandsTypes admin search=${searchValue}`, currentPage],
		() =>
			api_admin.brandTypes.BrandTypesService.getList({
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
							<Pagination
								variant="outlined"
								shape="rounded"
								count={Math.ceil(brandsTypes?.count / 10)}
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

BrandsTypesList.isOnlyAdmin = true

BrandsTypesList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default BrandsTypesList
