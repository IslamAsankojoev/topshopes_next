import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import Empty from 'src/components/Empty'
import Scrollbar from 'src/components/Scrollbar'
import { H3 } from 'src/components/Typography'
import TableHeader from 'src/components/data-table/TableHeader'
import TablePagination from 'src/components/data-table/TablePagination'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useMuiTable from 'src/hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReviewRow } from 'src/pages-sections/admin'
import { ReactElement } from 'react'
import { NextPageAuth } from 'src/shared/types/auth.types'
import api from 'src/utils/api/dashboard'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const tableHeading = [
	{ id: 'name', label: 'name', align: 'left' },
	{ id: 'customer', label: 'customer', align: 'left' },
	{ id: 'comment', label: 'review', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

type ProductReviewsProps = { reviews: any[] }

const ProductReviews: NextPageAuth<ProductReviewsProps> = ({ reviews }) => {
	const { t: adminT } = useTranslation('admin')
	const [parent, enableAnimate] = useAutoAnimate()
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

			<span ref={parent}>
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
			</span>
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
