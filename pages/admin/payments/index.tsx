import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Avatar, Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { PaymentServices } from 'api/services-admin/payments/payments.service'
import Scrollbar from 'components/Scrollbar'
import { H3 } from 'components/Typography'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useMuiTable from 'hooks/useMuiTable'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { StyledTableCell, StyledTableRow } from 'pages-sections/admin'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { IPayment } from 'shared/types/order.types'
import { ResponseList } from 'shared/types/response.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'adminActions',
				'payments',
			])),
		},
	}
}

// =============================================================================
Payouts.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

// =============================================================================

export default function Payouts() {
	const { t } = useTranslation('payments')
	// table column list
	const tableHeading = [
		{
			id: 'cardPhone',
			label: t('cardPhone'),
			align: 'center',
		},
		{ id: 'Payments Method', label: t('paymentMethod'), align: 'center' },
		{ id: 'Phone number', label: t('phone'), align: 'center' },
		{ id: 'Payed', label: t('payed'), align: 'center' },
	]

	const { data, refetch } = useQuery(
		'payouts',
		() => PaymentServices.getPayments(),
		{
			retry: 0,
			select: (data: ResponseList<IPayment>) => data,
		}
	)

	const { mutateAsync } = useMutation(
		'update payment',
		({ id, data }: { id: string; data: any }) =>
			PaymentServices.updatePayment(id, data),
		{
			onSuccess: () => {
				refetch()
			},
		}
	)

	const handlePayment = async (id: string, is_verified) => {
		await mutateAsync({ id, data: { is_verified: !is_verified } })
	}

	const {
		order,
		orderBy,
		selected,
		rowsPerPage,
		filteredList,
		handleChangePage,
		handleRequestSort,
	} = useMuiTable({ listData: data?.results, defaultSort: 'no' })

	return (
		<Box py={4}>
			<H3 mb={2}>{t('payouts')}</H3>

			<Card>
				<Scrollbar>
					<TableContainer sx={{ minWidth: 600 }}>
						<Table>
							<TableHeader
								order={order}
								hideSelectBtn
								orderBy={orderBy}
								heading={tableHeading}
								rowCount={data?.results?.length}
								numSelected={selected.length}
								onRequestSort={handleRequestSort}
							/>

							<TableBody>
								{filteredList.map((payout: IPayment) => (
									<Link href={`/admin/payments/${payout.id}`}>
										<StyledTableRow
											role="checkbox"
											key={payout.id}
											sx={{
												cursor: 'pointer!important',
											}}
										>
											<StyledTableCell align="center">
												{payout.bank_account}
											</StyledTableCell>
											<StyledTableCell align="center">
												{payout.payment_type}
											</StyledTableCell>
											<StyledTableCell align="center">
												{payout.phone_number}
											</StyledTableCell>
											{/* <StyledTableCell align="center">
											<Avatar src={payout.confirm_photo} />
										</StyledTableCell> */}
											<StyledTableCell align="center">
												<CheckBoxIcon
													color={payout.is_verified ? 'success' : 'disabled'}
												/>
											</StyledTableCell>
										</StyledTableRow>
									</Link>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Scrollbar>

				<Stack alignItems="center" my={4}>
					<TablePagination onChange={handleChangePage} count={data?.count} />
				</Stack>
			</Card>
		</Box>
	)
}
