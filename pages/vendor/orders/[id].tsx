import { Box } from '@mui/material'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { OrderDetails } from 'pages-sections/admin'
import React, { ReactElement } from 'react'
import { NextPageAuth } from 'shared/types/auth.types'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, ['common'])),
		},
	}
}

const OrderEdit: NextPageAuth = () => {
	return (
		<Box py={4}>
			<H3 mb={2}>Order Details</H3>

			<OrderDetails />
		</Box>
	)
}

OrderEdit.isOnlyUser = true

OrderEdit.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default OrderEdit
