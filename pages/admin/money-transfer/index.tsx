import {
	Box,
	Card,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Table,
	TableContainer,
	Typography,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
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
import { ReactElement, useEffect, useState } from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { makeRequest } from 'src/api/interceptor'
import  { AxiosResponse } from 'axios'
import { getCurrency } from 'src/utils/getCurrency'
import SellIcon from '@mui/icons-material/Sell'
import { useSession } from 'next-auth/react'
import { StyledTableCell, StyledTableRow } from 'src/pages-sections/admin'

export type ReportAdmin = {
	id: string
	name: string
	total_tax: number
	total_amount: number
}

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
	{ id: 'shop', label: 'shop', align: 'left' },
	{ id: 'amount', label: 'amount', align: 'left' },
	{ id: 'tax', label: 'tax', align: 'left' },
]

const month = [
	{ id: 1, label: 'January' },
	{ id: 2, label: 'February' },
	{ id: 3, label: 'March' },
	{ id: 4, label: 'April' },
	{ id: 5, label: 'May' },
	{ id: 6, label: 'June' },
	{ id: 7, label: 'July' },
	{ id: 8, label: 'August' },
	{ id: 9, label: 'September' },
	{ id: 10, label: 'October' },
	{ id: 11, label: 'November' },
	{ id: 12, label: 'December' },
]

const year = [
	{ id: 2022, label: '2022' },
	{ id: 2023, label: '2023' },
]

const MoneyTransfer: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')

	const currentDate = new Date()
	const monthNumber = currentDate.getMonth() + 1
	const yearNumber = currentDate.getFullYear()

	const [monthValue, setMonthValue] = useState(monthNumber)
	const [yearValue, setYearValue] = useState(yearNumber)

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const { data: session, status } = useSession()

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: moneyStats, refetch } = useQuery(
		'get money statistics',
		() =>
			makeRequest(true).post('report-admin/', {
				month: monthValue,
				year: yearValue,
			}),
		{
			select: (data: AxiosResponse<ReportAdmin[]>) =>
				data.data.filter((item) => item.total_amount),
		}
	)

	const allTotoalAmount = moneyStats?.reduce(
		(acc, cur) => acc + cur.total_amount,
		0
	)
	const allTotoalTax = moneyStats?.reduce((acc, cur) => acc + cur.total_tax, 0)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: moneyStats })

	const handleChangeMonth = (event: any) => {
		setMonthValue(event.target.value as number)
	}

	const handleChangeYear = (event: any) => {
		setYearValue(event.target.value as number)
	}

	useEffect(() => {
		refetch()
	}, [yearValue, monthValue])

	return (
		<Box py={4}>
			<H3 mb={2}>{adminT('moneyTransfer')}</H3>

			<SearchArea
				handleSearch={(value) => {
					setCurrentPage(1)
					setSearchValue(value)
				}}
				handleBtnClick={() => {}}
				searchPlaceholder={t('searchingFor')}
				sideComponent={
					<>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-around',
								gap: 2,
							}}
						>
							<FormControl>
								<InputLabel id="demo-simple-select-label">Month</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={monthValue}
									label="Month"
									onChange={handleChangeMonth}
                  sx={{
                    "&>div": {
                      p: '10px 20px 10px 10px',
                    }
                  }}
								>
									{month.map((item) => (
										<MenuItem value={item.id}>{item.label}</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl
              sx={{
                p: 0,
              }}
              >
								<InputLabel id="demo-simple-select-label">Year</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={yearValue}
									label="Year"
									onChange={handleChangeYear}
                  sx={{
                    "&>div": {
                      p: '10px 20px 10px 10px',
                    }
                  }}
								>
									{year.map((item) => (
										<MenuItem value={item.id}>{item.label}</MenuItem>
									))}
								</Select>
							</FormControl>
							<Card
								sx={{
									backgroundColor: 'primary.100',
									p: 2,
                  "@media (max-width: 600px)": {
                    p: .5,
                    py: 1.3,
                  }
								}}
							>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-around',
										gap: 2,
									}}
								>
									<SellIcon
										sx={{
											color: 'primary.800',
										}}
									/>
									<Typography
										sx={{
                      minWidth: '50px',
											color: 'primary.900',
											fontWeight: 'bold',
										}}
									>
										{getCurrency(allTotoalAmount, true)}
									</Typography>
								</Box>
							</Card>
							<Card
								sx={{
									backgroundColor: 'success.100',
									p: 2,
                  "@media (max-width: 600px)": {
                    p: .5,
                    py: 1.3,
                  }
								}}
							>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-around',
										gap: 2,
									}}
								>
									<TrendingUpIcon
										sx={{
											color: 'success.800',
										}}
									/>
									<Typography
										sx={{
                      minWidth: '50px',
											color: 'success.900',
											fontWeight: 'bold',
										}}
									>
										{getCurrency(allTotoalTax, true)}
									</Typography>
								</Box>
							</Card>
						</Box>
					</>
				}
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
									rowCount={moneyStats?.length}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((moneyStats, index) => (
										<StyledTableRow tabIndex={-1} role="checkbox">
											<StyledTableCell
												align="left"
												sx={{
													color: 'inherit',
													p: 2,
													display: 'flex',
													alignItems: 'center',
												}}
											>
											
												{moneyStats.name}
											</StyledTableCell>
											<StyledTableCell
												align="left"
												sx={{
													color: 'inherit',
													p: 2,
												}}
											>
												{getCurrency(moneyStats.total_amount)}
											</StyledTableCell>

											<StyledTableCell
												align="left"
												sx={{
													color: 'inherit',
												}}
											>
												{getCurrency(moneyStats.total_tax)}
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
							count={Math.ceil(moneyStats?.length / 20)}
							page={currentPage}
						/>
					</Stack>
				</Card>
			) : (
				<Empty />
			)}
		</Box>
	)
}

MoneyTransfer.isOnlySeller = true

MoneyTransfer.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default MoneyTransfer
