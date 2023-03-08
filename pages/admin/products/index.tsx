import { Box, Card, Pagination, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { AdminProductsService } from 'src/api/services-admin/products/products.service'
import Empty from 'src/components/Empty'
import Loading from 'src/components/Loading'
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
import { ProductRow } from 'src/pages-sections/admin'
import { ReactElement, useEffect, useState } from 'react'
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
const tableHeading = [
	{ id: 'name', label: 'name', align: 'left' },
	{ id: 'category', label: 'categories', align: 'left' },
	// { id: 'brand', label: 'Brand', align: 'left' },
	{ id: 'price', label: 'price', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

const ProductList: NextPageAuth = () => {
	const { t } = useTranslation('admin')
	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const {
		data: products,
		isLoading,
		refetch,
	} = useQuery([`products admin search=${searchValue}`, currentPage] , () =>
		AdminProductsService.getList({
			search: searchValue,
			page: currentPage,
			page_size: 10,
		}),
		{
			staleTime: 1000 * 60 * 1,
			keepPreviousData: true,
			enabled: !!currentPage,
		}
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: products?.results })


	return (
		<Box py={4}>
			<H3 mb={2}>{t('products')}</H3>

			<SearchArea
				handleSearch={(value: string) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				handleBtnClick={() => {}}
				searchPlaceholder={t('searchingFor')}
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
									rowCount={products?.count}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((product, index) => (
										<ProductRow
											refetch={refetch}
											product={product}
											key={index}
										/>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<Stack alignItems="center" my={4}>
						<Pagination variant="outlined" shape="rounded"  count={Math.ceil(products?.count / 10)} onChange={(e, page)=> handleChangePage(e, page)}/>
					</Stack>
				</Card>
			) : (
				<Empty />
			)}
		</Box>
	)
}

ProductList.isOnlyAdmin = true

ProductList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default ProductList
