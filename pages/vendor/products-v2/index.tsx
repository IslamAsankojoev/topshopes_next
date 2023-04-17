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
import Scrollbar from 'src/components/Scrollbar'
import { H3 } from 'src/components/Typography'
import SearchArea from 'src/components/dashboard/SearchArea'
import TableHeader from 'src/components/data-table/TableHeader'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useMuiTable from 'src/hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { Fragment, ReactElement, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import MemizeComponent from 'src/components/MemizeComponent/MemizeComponent'
import ProductClientRowV2 from 'src/pages-sections/admin/products/ProductClientRowV2'
import { localize } from 'src/utils/Translate/localize'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const tableHeading = [
	{ id: 'name', label: 'name', align: 'left' },
	{ id: 'category', label: 'categories', align: 'center' },
	{ id: 'shop', label: 'shop', align: 'center' },
	{ id: 'price', label: 'price', align: 'center' },
	{
		id: 'publish',
		label: localize({
			ru: 'Опубликовано',
			tr: 'Yayınlandı',
			en: 'Published',
			kg: 'Опубликовано',
			kz: 'Опубликовано',
		}),
		align: 'center',
	},
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
	const { push, replace, asPath, query } = useRouter()
	const [parent, enableAnimate] = useAutoAnimate()

	const queryClient = useQueryClient()

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(Number(query?.page) || 1)

	const { data: products, refetch } = useQuery(
		[`products`, searchValue + currentPage],
		() =>
			ProductsService.getList({
				search: searchValue,
				page: currentPage.toString(),
				page_size: 10,
			}),
		{
			enabled: !!currentPage,
			keepPreviousData: true,
		}
	)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: products?.results })

	const handleChangePage = (_: unknown, newPage: number) => {
		replace({
			pathname: asPath.split('?')[0],
			query: { ...query, page: newPage },
		})
	}

	const switchPublish = async (id: string, is_published: boolean) => {
		await ProductsService.update(id, { is_published: is_published })
		queryClient
			.invalidateQueries([`products`, searchValue + currentPage])
			.then(() => refetch())
	}

	useEffect(() => {
		setCurrentPage(Number(query?.page) || 1)
	}, [query?.page])

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('products')}</H3>

			<SearchArea
				handleSearch={(value: string) => {
					// handleChangePage(null, 1)
					setSearchValue(value)
				}}
				buttonText={t('addNewProduct')}
				handleBtnClick={() => push('/vendor/products-v2/createV2')}
				searchPlaceholder={t('searchingFor')}
			/>

			<span ref={parent}>
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
											<ProductClientRowV2
												refetch={refetch}
												product={product}
												key={index}
												switchPublish={switchPublish}
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
										page={currentPage}
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
			</span>
		</Box>
	)
}

ProductList.isOnlySeller = true

ProductList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default ProductList
