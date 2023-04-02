import {
	Box,
	Card,
	Pagination,
	Stack,
	Table,
	TableContainer,
} from '@mui/material'
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
import ProductClientRowV2 from 'src/pages-sections/admin/products/ProductClientRowV2'
import { useTypedSelector } from 'src/hooks/useTypedSelector'
import { localize } from 'src/utils/Translate/localize'
import useSorter from 'src/hooks/useSorter'
import { useAutoAnimate } from '@formkit/auto-animate/react'

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
	{ id: 'name', label: 'name', align: 'left', sortable: true },
	{ id: 'category', label: 'categories', align: 'center', sortable: false },
	{ id: 'shop', label: 'shop', align: 'center', sortable: false },
	{ id: 'price', label: 'price', align: 'center', sortable: false },
	{
		id: 'publish',
		label: localize({ ru: 'Опубликовано', tr: 'Yayınlandı', en: 'Published' }),
		align: 'center',
		sortable: false,
	},
	{ id: 'action', label: 'action', align: 'center', sortable: false },
]

type Order = 'asc' | 'desc'

const ProductList: NextPageAuth = () => {
	const { t } = useTranslation('admin')
	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [parent, enableAnimate] = useAutoAnimate()

	const { order, orderBy, ordering, handleSorting } = useSorter()

	const {
		data: products,
		isLoading,
		refetch,
	} = useQuery(
		[`products admin search=`, searchValue + currentPage + orderBy + order],
		() =>
			AdminProductsService.getList({
				search: searchValue,
				page: currentPage,
				page_size: 10,
				ordering: ordering,
			}),
		{
			keepPreviousData: true,
			enabled: !!currentPage,
		}
	)

	const { selected, filteredList, handleRequestSort } = useMuiTable({
		listData: products?.results,
	})

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)
	const user = useTypedSelector((state) => state.userStore.user)

	const handleSwitchPublish = async (id: string, is_published: boolean) => {
		await AdminProductsService.update(id, { is_published: is_published })
		refetch()
	}

	useEffect(() => {
		refetch()
	}, [order, orderBy])

	return (
		<Box py={4} ref={parent}>
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
									onRequestSort={handleSorting}
								/>

								<TableBody>
									{filteredList?.map((product, index) => (
										<ProductClientRowV2
											refetch={refetch}
											product={product}
											key={index}
											is_superuser={user?.is_superuser}
											handleSwitchPublish={handleSwitchPublish}
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
							count={Math.ceil(products?.count / 10)}
							onChange={(e, page) => handleChangePage(e, page)}
						/>
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
