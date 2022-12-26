import { RemoveRedEye } from '@mui/icons-material'
import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import currency from 'currency.js'
import useMuiTable from 'hooks/useMuiTable'
import { GetStaticProps } from 'next'
import {
	StyledIconButton,
	StyledTableCell,
	StyledTableRow,
} from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { NextPageAuth } from 'shared/types/auth.types'
import api from 'utils/api/dashboard'

const tableHeading = [
	{ id: 'no', label: 'No', align: 'left' },
	{ id: 'orderNo', label: 'Order No', align: 'left' },
	{ id: 'adminCommission', label: 'Admin Commission', align: 'center' },
	{ id: 'earning', label: 'Your Earning', align: 'center' },
	{ id: 'date', label: 'Date', align: 'left' },
	{ id: 'action', label: 'Action', align: 'center' },
]

type EarningHistoryProps = { earnings: any[] }

const EarningHistory: NextPageAuth<EarningHistoryProps> = ({ earnings }) => {
	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: earnings, defaultSort: 'no' })

	return (
		<Box py={4}>
			<H3 mb={2}>Earning History</H3>

			<Card>
				<Scrollbar>
					<TableContainer sx={{ minWidth: 1100 }}>
						<Table>
							<TableHeader
								order={order}
								hideSelectBtn
								orderBy={orderBy}
								heading={tableHeading}
								rowCount={earnings?.length}
								numSelected={selected?.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList?.map((item, index) => (
									<StyledTableRow role="checkbox" key={index}>
										<StyledTableCell align="left">{item.no}</StyledTableCell>
										<StyledTableCell align="left">
											{item.orderNo}
										</StyledTableCell>

										<StyledTableCell align="center">
											{currency(item.adminCommission, {
												separator: ',',
											}).format()}
										</StyledTableCell>

										<StyledTableCell align="center">
											{currency(item.sellerEarning, {
												separator: ',',
											}).format()}
										</StyledTableCell>

										<StyledTableCell align="left">{item.date}</StyledTableCell>

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
						count={Math.ceil(earnings?.length / rowsPerPage)}
					/>
				</Stack>
			</Card>
		</Box>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const earnings = await api.earningHistory()
	return { props: { earnings } }
}

EarningHistory.isOnlyUser = true

EarningHistory.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default EarningHistory
