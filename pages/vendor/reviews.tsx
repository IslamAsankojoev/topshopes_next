import { RemoveRedEye } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Card,
	Rating,
	Stack,
	Table,
	TableContainer,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import Scrollbar from 'components/Scrollbar'
import { H3, Paragraph, Small } from 'components/Typography'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import { FlexBox } from 'components/flex-box'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useMuiTable from 'hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { NextPageAuth } from 'shared/types/auth.types'

const tableHeading = [
	{ id: 'name', label: 'name', align: 'left' },
	{ id: 'customer', label: 'customer', align: 'left' },
	{ id: 'comment', label: 'review', align: 'left' },
	{ id: 'rating', label: 'rating', align: 'left' },
	{ id: 'action', label: 'action', align: 'center' },
]

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common', 'store'])),
		},
	}
}

const Reviews: NextPageAuth = () => {
	const { t } = useTranslation('store')

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData })

	return (
		<Box py={4}>
			<H3 mb={2}>{t('productReviews')}</H3>

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
								{filteredList?.map((review, index) => (
									<StyledTableRow tabIndex={-1} role="checkbox" key={index}>
										<StyledTableCell align="left">
											<FlexBox alignItems="center" gap={1.5}>
												<Avatar
													src={review.image}
													sx={{ borderRadius: '8px' }}
												/>
												<Paragraph>{review.name}</Paragraph>
											</FlexBox>
										</StyledTableCell>

										<StyledTableCell align="left">
											{review.customer}
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

										<StyledTableCell align="center">
											<StyledIconButton>
												<RemoveRedEye />
											</StyledIconButton>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Scrollbar>

				<Stack alignItems="center" my={4}>
					<TablePagination
						onChange={handleChangePage}
						count={Math.ceil(listData?.length / rowsPerPage)}
					/>
				</Stack>
			</Card>
		</Box>
	)
}

Reviews.isOnlyUser = true

Reviews.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default Reviews

// list data
const listData = [
	{
		rating: 5,
		name: 'Samsung Galaxy-M1',
		customer: 'Gage Pequette',
		image: '/assets/images/products/samsung.png',
		comment: '“But I must explain to you how all this of denouncing pleasure.”',
	},
	{
		rating: 4,
		name: 'Tomatto',
		customer: 'Zachary Taylor',
		image: '/assets/images/products/tomato.png',
		comment: '“But I must explain to you how all this of denouncing pleasure.”',
	},
	{
		rating: 5,
		name: 'Boston Round Cream Pack',
		customer: 'Ollie Casper',
		image: '/assets/images/products/beauty-cream.png',
		comment: '“But I must explain to you how all this of denouncing pleasure.”',
	},
	{
		rating: 5,
		name: 'Woman Party Dress',
		customer: 'Tony Richardson',
		image: '/assets/images/products/red-dress.png',
		comment: '“But I must explain to you how all this of denouncing pleasure.”',
	},
	{
		rating: 4,
		name: 'White Tops',
		customer: 'Zach Marshall',
		image: '/assets/images/products/white-tops.png',
		comment: '“But I must explain to you how all this of denouncing pleasure.”',
	},
	{
		rating: 3,
		name: 'Casual Shirt for Man',
		customer: 'Ken Matthews',
		image: '/assets/images/products/formal-shirt.png',
		comment: '“But I must explain to you how all this of denouncing pleasure.”',
	},
	{
		rating: 5,
		name: 'Blue Premium T-shirt',
		customer: 'Nathan Clark',
		image: '/assets/images/products/blu-tshirt.png',
		comment: '“But I must explain to you how all this of denouncing pleasure.”',
	},
	{
		rating: 5,
		name: 'Man Trowzer Pant',
		customer: 'Bruce Reynolds',
		image: '/assets/images/products/pnat.png',
		comment: '“But I must explain to you how all this of denouncing pleasure.”',
	},
]
