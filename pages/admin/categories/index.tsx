import {
	Box,
	Card,
	Pagination,
	Stack,
	Table,
	TableContainer,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { CategoriesService } from 'src/api/services-admin/categories/category.service'
import Empty from 'src/components/Empty'
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
import { useRouter } from 'next/router'
import { CategoryRow } from 'src/pages-sections/admin'
import { ReactElement, useState } from 'react'

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
// table column list
const tableHeading = [
	{ id: 'name', label: 'name', align: 'left' },
	{ id: 'category', label: 'categories', align: 'left' },
	{ id: 'Icon', label: 'icon', align: 'left' },
	{ id: 'Image', label: 'thumbnail', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

const CategoryList: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: categories, refetch } = useQuery(
		[`get categories admin search=${searchValue}`, currentPage],
		() =>
			CategoriesService.getList({
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
		useMuiTable({ listData: categories?.results })

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('categories')}</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				buttonText={t('addNewCategory')}
				handleBtnClick={() => {
					push('/admin/categories/create')
				}}
				searchPlaceholder={t('searchingFor')}
			/>

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
									rowCount={categories?.count}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((category, index) => (
										<CategoryRow
											item={category}
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
							count={Math.ceil(categories?.count / 10)}
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

CategoryList.isOnlyAdmin = true

CategoryList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CategoryList
