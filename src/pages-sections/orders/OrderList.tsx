import { Pagination } from '@mui/material'
import { OrdersService } from 'src/api/services/orders/orders.service'
import TableRow from 'src/components/TableRow'
import { H5 } from 'src/components/Typography'
import { FlexBox } from 'src/components/flex-box'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'
import { useQuery } from 'react-query'
import { IOrder, IOrderShort } from 'src/shared/types/order.types'
import { ResponseList } from 'src/shared/types/response.types'

import OrderRow from './OrderRow'

// ============================================================
type OrderListProps = {}
// ============================================================

const OrderList: FC<OrderListProps> = () => {
	const { t } = useTranslation('common')
	const { query, push, pathname } = useRouter()

	const { isLoading, data: orders } = useQuery(
		`orders page=${query?.page}`,
		() =>
			OrdersService.getList({
				page: (query?.page as string) || 1,
				page_size: 20,
			})
	)

	return (
		!isLoading && (
			<Fragment>
				<TableRow
					elevation={0}
					sx={{
						padding: '0px 18px',
						background: 'none',
						display: { xs: 'none', md: 'flex' },
					}}
				>
					<H5 color="grey.600" my={0} mx={0.75} textAlign="left">
						{t('order')} #
					</H5>

					<H5 color="grey.600" my={0} mx={0.75} textAlign="left">
						{t('status')}
					</H5>

					<H5 color="grey.600" my={0} mx={0.75} textAlign="left">
						{t('datePurchased')}
					</H5>

					<H5 color="grey.600" my={0} mx={0.75} textAlign="left">
						{t('total')}
					</H5>
					<H5 flex="0 0 0 !important" color="grey.600" px={2.75} my={0} />
				</TableRow>

				{orders?.results?.map((item) => (
					<OrderRow {...item} key={item.id} />
				))}

				<FlexBox justifyContent="center" mt={5}>
					<Pagination
						page={+query?.page || 1}
						count={Math.ceil(orders?.count / 20)}
						color="primary"
						variant="outlined"
						onChange={(_, newValue) =>
							push({ pathname, query: { page: newValue } })
						}
					/>
				</FlexBox>
			</Fragment>
		)
	)
}

export default OrderList
