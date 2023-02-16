import { Box } from '@mui/material'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { OrderDetail } from 'pages-sections/admin'
import { ReactElement } from 'react'
import { NextPageAuth } from 'shared/types/auth.types'

export const getServerSideProps = async ({ locale }) => {
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

const OrderEdit: NextPageAuth = () => {
	const { t } = useTranslation('common')

	return (
		<Box py={4}>
			<H3 mb={2}>{t('orderDetails')}</H3>

			<OrderDetail />
		</Box>
	)
}

OrderEdit.isOnlySeller = true

OrderEdit.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default OrderEdit
