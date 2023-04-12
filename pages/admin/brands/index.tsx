import {
	Box,
	Card,
	Pagination,
	Stack,
	Table,
	TableContainer,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { BrandsService } from 'src/api/services-admin/brands/brand.service'
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
import { BrandRow } from 'src/pages-sections/admin'
import { ReactElement, useState } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { useAutoAnimate } from '@formkit/auto-animate/react'

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
	const [parent, enableAnimate] = useAutoAnimate()

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: brands, refetch } = useQuery(
		[`get brands admin search=${searchValue}`, currentPage],
		() =>
			BrandsService.getList({
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
		useMuiTable({ listData: brands?.results })

	return (
		<Box py={4} ref={parent}>
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
						<Pagination
							variant="outlined"
							shape="rounded"
							count={Math.ceil(brands?.count / 10)}
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

BrandsList.isOnlyAdmin = true

BrandsList.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default BrandsList
