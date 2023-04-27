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
// table column list
const tableHeading = [
	{ id: 'name', label: 'name', align: 'left' },
	// { id: 'category', label: 'categories', align: 'left' },
	{ id: 'Tax', label: 'tax', align: 'center' },
	{ id: 'Image', label: 'thumbnail', align: 'center' },
	{ id: 'action', label: 'action', align: 'center' },
]

const CategoryList: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const { push } = useRouter()
	const [parent, enableAnimate] = useAutoAnimate()

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: categories, refetch } = useQuery(
		[`get categories admin search=${searchValue}`, currentPage],
		() =>
			api_admin.categories.CategoriesService.getList({
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
			<span ref={parent}>
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
										{filteredList?.map((category) => (
											<CategoryRow
												item={category}
												key={category.id}
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
			</span>
		</Box>
	)
}

CategoryList.isOnlyAdmin = true

CategoryList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default CategoryList
