import {
	Box,
	Button,
	Card,
	Pagination,
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
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import useMuiTable from 'src/hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement, useEffect, useRef, useState } from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

import { useQuery } from 'react-query'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { getCurrency } from 'src/utils/getCurrency'
import SellIcon from '@mui/icons-material/Sell'
import { StyledTableCell, StyledTableRow } from 'src/pages-sections/admin'
import LightModeIcon from '@mui/icons-material/LightMode'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation'
import ApexChart from 'src/components/ApexChart/ApexChart'
import { IReport } from 'src/shared/types/report.types'
import { localize } from 'src/utils/Translate/localize'
import getMonthMultilang from 'src/utils/constants/getMonthMultilang'
import { useRouter } from 'next/router'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { v4 } from 'uuid'
import { api } from 'src/api/index.service'

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
	{ id: 'days', label: 'days', align: 'left' },
	{ id: 'amount', label: 'amount', align: 'left' },
	{ id: 'profit', label: 'profit', align: 'left' },
]

type RangeDate = {
	startDate: Date
	endDate: Date
	key: string
}

const newDate = new Date()
const prevMonth: Date = new Date(newDate)
prevMonth.setDate(prevMonth.getDate() - 7)
const today = new Date()
const tomorrow: Date = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const SellerReports: NextPageAuth = () => {
	const { t: adminT } = useTranslation('admin')
	const { t } = useTranslation('adminActions')
	const rangeModalRef = useRef()
	const [parent, enableAnimate] = useAutoAnimate()

	const [rangeDate, setRangeDate] = useState<RangeDate[]>([
		{
			startDate: prevMonth,
			endDate: new Date(),
			key: 'selection',
		},
	])

	const [rangeOpen, setRangeOpen] = useState(false)

	const currentDate = new Date()
	const dayOfMonth = currentDate.getDate()
	const monthNumber = currentDate.getMonth() + 1
	const yearNumber = currentDate.getFullYear()

	const [monthValue, setMonthValue] = useState(monthNumber)
	const [yearValue, setYearValue] = useState(yearNumber)

	const [searchValue, setSearchValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [restart, setRestart] = useState(v4())

	const router = useRouter()

	const handleChangePage = (_, newPage: number) => setCurrentPage(newPage)

	const { data: reportsPaid, refetch } = useQuery(
		['get reports paid', restart],
		() =>
			api.reports.ReportsService.getPaidList(
				rangeDate[0].startDate,
				rangeDate[0].endDate
			),
		{
			enabled: !!rangeDate[0].startDate,
			keepPreviousData: true,
			select: (data: IReport[]) =>
				data.map((item) => {
					return {
						...item,
						profit: Number(item.profit),
						total_price: Number(item.total_price),
					}
				}),
		}
	)

	const allTotoalAmount = reportsPaid?.reduce(
		(acc, cur) => acc + cur.total_price,
		0
	)
	const allTotoalProfit = reportsPaid?.reduce((acc, cur) => acc + cur.profit, 0)

	const { order, orderBy, selected, filteredList, handleRequestSort } =
		useMuiTable({ listData: reportsPaid })

	useOnClickOutside(rangeModalRef, () => setRangeOpen(false))

	const handleRangeChange = () => {
		setRestart(v4())
		setRangeOpen(false)
	}

	useEffect(() => {
		refetch()
	}, [restart])

	return (
		<Box py={4} ref={parent}>
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
								gap: 1,
								position: 'relative',
							}}
						>
							<Box ref={parent}>
								<Button
									onClick={() => setRangeOpen(!rangeOpen)}
									sx={{
										borderRadius: 2,
										backgroundColor: 'grey.700',
										p: 2,
										color: 'white',
										'&:hover': {
											backgroundColor: 'grey.800',
										},
										'@media (max-width: 600px)': {
											p: 0.7,
											py: 1.3,
										},
									}}
								>
									<InsertInvitationIcon
										sx={{
											marginRight: 1,
										}}
									/>
									{localize({
										ru: `${rangeDate[0].startDate.toLocaleDateString()} - ${rangeDate[0].endDate?.toLocaleDateString()}`,
										tr: `${rangeDate[0].startDate.toLocaleDateString()} - ${rangeDate[0].endDate?.toLocaleDateString()}`,
										en: `${rangeDate[0].startDate.toLocaleDateString()} - ${rangeDate[0].endDate?.toLocaleDateString()}`,
										kg: `${rangeDate[0].startDate.toLocaleDateString()} - ${rangeDate[0].endDate?.toLocaleDateString()}`,
										kz: `${rangeDate[0].startDate.toLocaleDateString()} - ${rangeDate[0].endDate?.toLocaleDateString()}`,
									})}
								</Button>
								{!!rangeOpen && (
									<Card
										ref={rangeModalRef}
										sx={{
											position: 'absolute',
											top: '120%',
											zIndex: 1,
											boxShadow: 3,
											border: '1.5px solid #E4E9EE',
										}}
									>
										<DateRange
											rangeColors={['#4F576A']}
											editableDateInputs={true}
											onChange={(item) => setRangeDate([item.selection])}
											moveRangeOnFirstSelection={false}
											ranges={rangeDate}
											maxDate={new Date(tomorrow)}
										/>
										<Button
											onClick={handleRangeChange}
											fullWidth
											color="secondary"
											sx={{
												backgroundColor: '#4F576A',
											}}
											variant="contained"
										>
											{localize({
												ru: 'Применить',
												tr: 'Uygula',
												en: 'Apply',
											})}
										</Button>
									</Card>
								)}
							</Box>
							<Card
								sx={{
									backgroundColor: 'primary.100',
									p: 2,
									'@media (max-width: 600px)': {
										p: 0.7,
										py: 1.3,
									},
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
									'@media (max-width: 600px)': {
										p: 0.7,
										py: 1.3,
									},
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
										{getCurrency(allTotoalProfit, true)}
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
									rowCount={reportsPaid?.length}
									numSelected={selected?.length}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredList?.map((reportPaid: IReport, index) => (
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
												<LightModeIcon
													sx={{
														color: 'primary.main',
														marginRight: 2,
													}}
												/>
												{dayOfMonth ===
												new Date(reportPaid.created_at).getDate()
													? `${getMonthMultilang(
															new Date(reportPaid.created_at),
															router.locale
													  )} (${localize({
															ru: 'Сегодня',
															tr: 'Bugün',
															en: 'Today',
															kg: 'Бүгүн',
															kz: 'Бүгін',
													  })})`
													: getMonthMultilang(
															new Date(reportPaid.created_at),
															router.locale
													  )}
											</StyledTableCell>
											<StyledTableCell
												align="left"
												sx={{
													color: 'inherit',
													p: 2,
												}}
											>
												{getCurrency(reportPaid.total_price)}
											</StyledTableCell>

											<StyledTableCell
												align="left"
												sx={{
													color: 'inherit',
												}}
											>
												{getCurrency(reportPaid.profit)}
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<Stack alignItems="center" my={4}>
						<Pagination
							variant="outlined"
							shape="rounded"
							count={Math.ceil(reportsPaid?.length / 10)}
							onChange={(e, page) => handleChangePage(e, page)}
						/>
					</Stack>
				</Card>
			) : (
				<Empty />
			)}

			{!!window && (
				<Card
					sx={{
						mt: 4,
					}}
				>
					<ApexChart
						categories={
							!!reportsPaid?.length
								? reportsPaid.map((item) => item.created_at)
								: []
						}
						series={[
							{
								name: localize({
									ru: 'Продажи',
									tr: 'Satışlar',
									en: 'Sales',
									kg: 'Продажи',
									kz: 'Продажи',
								}),
								data: !!reportsPaid?.length
									? reportsPaid.map((item) => item.total_price)
									: [],
							},
							{
								name: localize({
									ru: 'Прибыль',
									tr: 'Kâr',
									en: 'Profit',
									kg: 'Прибыль',
									kz: 'Прибыль',
								}),
								data: !!reportsPaid?.length
									? reportsPaid.map((item) => item.profit)
									: [],
							},
						]}
					/>
				</Card>
			)}
		</Box>
	)
}

SellerReports.isOnlySeller = true

SellerReports.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default SellerReports
