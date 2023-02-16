import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { ProductsService } from 'api/services/products/product.service'
import Empty from 'components/Empty'
import Loading from 'components/Loading'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useMuiTable from 'hooks/useMuiTable'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ProductRow } from 'pages-sections/admin'
import ProductClientRow from 'pages-sections/admin/products/ProductClientRow'
import { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'

const tableHeading = [
	{ id: 'name', label: 'name', align: 'left' },
	{ id: 'category', label: 'category', align: 'left' },
	{ id: 'price', label: 'price', align: 'left' },
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

const ProductList: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: products, refetch } = useQuery(
		`products search=${searchValue} page=${currentPage}`,
		() =>
			ProductsService.getList({
				search: searchValue,
				page: currentPage,
				page_size: 20,
			})
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: products?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('products')}</H3>

			<SearchArea
				handleSearch={(value: string) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				buttonText={t('addNewProduct')}
				handleBtnClick={() => push('/vendor/products/create')}
				searchPlaceholder={t('searchingFor')}
			/>

			{products?.count ? (
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
										<ProductClientRow
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
						<TablePagination
							onChange={handleChangePage}
							count={Math.ceil(products?.count / 20)}
						/>
					</Stack>
				</Card>
			) : (
				<Empty />
			)}
		</Box>
	)
}

ProductList.isOnlySeller = true

ProductList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default ProductList
