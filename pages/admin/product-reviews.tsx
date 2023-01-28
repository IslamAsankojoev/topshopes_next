import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import Empty from 'components/Empty'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useMuiTable from 'hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReviewRow } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { NextPageAuth } from 'shared/types/auth.types'
import api from 'utils/api/dashboard'

const tableHeading = [
	{ id: 'name', label: 'name', align: 'left' },
	{ id: 'customer', label: 'customer', align: 'left' },
	{ id: 'comment', label: 'review', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

type ProductReviewsProps = { reviews: any[] }

const ProductReviews: NextPageAuth<ProductReviewsProps> = ({ reviews }) => {
	const { t: adminT } = useTranslation('admin')
	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: reviews })

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('reviews')}</H3>

			{filteredList?.length ? (
				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 1000 }}>
							<Table>
								<TableHeader
									order={order}
									hideSelectBtn
									orderBy={orderBy}
									heading={tableHeading}
									rowCount={reviews?.length}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((review, index) => (
										<ReviewRow review={review} key={index} />
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<Stack alignItems="center" my={4}>
						<TablePagination
							onChange={handleChangePage}
							count={Math.ceil(reviews?.length / rowsPerPage)}
						/>
					</Stack>
				</Card>
			) : (
				<Empty />
			)}
		</Box>
	)
}

ProductReviews.isOnlyAuth = true

ProductReviews.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const reviews = await api.reviews()
	return {
		props: {
			reviews,
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'adminActions',
			])),
		},
	}
}

export default ProductReviews
