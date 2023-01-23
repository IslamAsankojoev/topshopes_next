import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { BrandsService } from 'api/services-admin/brands/brand.service'
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
import { BrandRow } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { IBrand } from 'shared/types/product.types'

const tableHeading = [
	{ id: 'name', label: 'name', align: 'center' },
	{ id: 'image', label: 'thumbnail', align: 'center' },
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

const BrandsList: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')
	const { t: adminT } = useTranslation('admin')

	const { push } = useRouter()

	const [searchValue, setSearchValue] = React.useState('')
	const [currentPage, setCurrentPage] = React.useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: brands, refetch } = useQuery(
		`get brands admin search=${searchValue} page=${currentPage}`,
		() =>
			BrandsService.getList({
				search: searchValue,
				page: currentPage,
				page_size: 20,
			})
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: brands?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('brands')}</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				buttonText={t('addNewBrand')}
				handleBtnClick={() => {
					push('/admin/brands/create')
				}}
				searchPlaceholder={t('searchingFor')}
			/>

			<Card>
				<Scrollbar>
					<TableContainer sx={{ minWidth: 600 }}>
						<Table>
							<TableHeader
								order={order}
								hideSelectBtn
								orderBy={orderBy}
								heading={tableHeading}
								rowCount={brands?.length}
								numSelected={selected?.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList?.map((brand, index) => (
									<BrandRow
										brand={brand}
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
						count={Math.ceil(brands?.count / 20)}
						page={currentPage}
					/>
				</Stack>
			</Card>
		</Box>
	)
}

BrandsList.isOnlyUser = true

BrandsList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default BrandsList
