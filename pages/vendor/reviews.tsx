import {
	Avatar,
	Box,
	Card,
	Pagination,
	Rating,
	Stack,
	Table,
	TableContainer,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { ShopsService } from 'src/api/services/shop/shop.service'
import Empty from 'src/components/Empty'
import Scrollbar from 'src/components/Scrollbar'
import { H3, Paragraph, Small } from 'src/components/Typography'
import TableHeader from 'src/components/data-table/TableHeader'
import { FlexBox } from 'src/components/flex-box'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useMuiTable from 'src/hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	StyledTableCell,
	StyledTableRow,
} from 'src/pages-sections/admin'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { IReview } from 'src/shared/types/product.types'

const tableHeading = [
	{ id: 'name', label: 'name', align: 'left' },
	{ id: 'customer', label: 'customer', align: 'left' },
	{ id: 'comment', label: 'review', align: 'left' },
	{ id: 'rating', label: 'rating', align: 'left' },
]

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'store',
				'admin',
			])),
		},
	}
}

const Reviews: NextPageAuth = () => {
	const { t } = useTranslation('store')

	const { data: listData } = useQuery(
		'get shop reviews',
		() => ShopsService.getShopReviews(),
		{
			keepPreviousData: true,
			select: (data: IReview[]) => data,
		}
	)

	const {
		order,
		orderBy,
		selected,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData })

	return (
		<Box py={4}>
			<H3 mb={2}>{t('productReviews')}</H3>

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
									rowCount={listData?.length}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((review: IReview, index) => (
										<StyledTableRow tabIndex={-1} role="checkbox" key={index}>
											<StyledTableCell align="left">
												<FlexBox alignItems="center" gap={1.5}>
													<Avatar
														src={
															review?.user?.avatar ||
															'/assets/images/avatars/001-man.svg'
														}
														sx={{ borderRadius: '8px' }}
													/>
													<Paragraph>
														{review?.user?.first_name || review?.user?.email}
													</Paragraph>
												</FlexBox>
											</StyledTableCell>

											<StyledTableCell align="left">
												{review?.product}
											</StyledTableCell>

											<StyledTableCell align="left">
												<Small>{review.comment}</Small>
											</StyledTableCell>

											<StyledTableCell align="left">
												<Rating
													value={review.rating}
													size="small"
													color="warning"
													readOnly
												/>
											</StyledTableCell>

											{/* <StyledTableCell align="center">
												<StyledIconButton>
													<RemoveRedEye />
												</StyledIconButton>
											</StyledTableCell> */}
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<Stack alignItems="center" my={4}>
						<Pagination variant="outlined" shape="rounded"  count={Math.ceil(listData?.length / 10)} onChange={(e, page)=> handleChangePage(e, page)}/>
					</Stack>
				</Card>
			) : (
				<Empty />
			)}
		</Box>
	)
}

Reviews.isOnlySeller = true

Reviews.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default Reviews
