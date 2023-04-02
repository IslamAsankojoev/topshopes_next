import {
	Box,
	Card,
	Pagination,
	Stack,
	Table,
	TableContainer,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { ProductsService } from 'src/api/services/products/product.service'
import Empty from 'src/components/Empty'
import Loading from 'src/components/Loading'
import Scrollbar from 'src/components/Scrollbar'
import { H3 } from 'src/components/Typography'
import SearchArea from 'src/components/dashboard/SearchArea'
import TableHeader from 'src/components/data-table/TableHeader'
import TablePagination from 'src/components/data-table/TablePagination'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useMuiTable from 'src/hooks/useMuiTable'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ProductRow } from 'src/pages-sections/admin'
import ProductClientRow from 'src/pages-sections/admin/products/ProductClientRow'
import { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import MemizeComponent from 'src/components/MemizeComponent/MemizeComponent'
import { ResponseList } from 'src/shared/types/response.types'
import { IProductPreview } from 'src/shared/types/product.types'
import lodash from 'lodash'
import { useAutoAnimate } from '@formkit/auto-animate/react'

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
	const [parent, enableAnimate] = useAutoAnimate()

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: products, refetch } = useQuery(
		[`products search=${searchValue}`, currentPage],
		() =>
			ProductsService.getList({
				search: searchValue,
				page: currentPage,
				page_size: 10,
			}),
		{
			enabled: !!currentPage,
			keepPreviousData: true,
			select: (data: ResponseList<IProductPreview>) => {
				return {
					...data,
					results: lodash.sortBy(
						data.results,
						(obj) => new Date(obj.created_at)
					),
				}
			},
		}
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: products?.results })

	return (
		<Box py={4} ref={parent}>
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

					<MemizeComponent
						component={
							<Stack alignItems="center" my={4}>
								<Pagination
									variant="outlined"
									shape="rounded"
									count={Math.ceil(products?.count / 10)}
									onChange={(e, page) => handleChangePage(e, page)}
								/>
							</Stack>
						}
					/>
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
