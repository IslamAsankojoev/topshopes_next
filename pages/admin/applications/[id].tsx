import { Box, Card, Divider, MenuItem, Select } from '@mui/material'
import { ApplicationServices } from 'api/services-admin/applications/applications.service'
import { AttributesServiceAdmin } from 'api/services-admin/attributes/attributes.service'
import Loading from 'components/Loading'
import { H3, H6, Paragraph } from 'components/Typography'
import { FlexBetween, FlexBox } from 'components/flex-box'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { StatusWrapper } from 'pages-sections/admin'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'shared/types/auth.types'
import { IProductAttribute } from 'shared/types/product.types'

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

const UpdateApplication: NextPageAuth = () => {
	const { t } = useTranslation('adminActions')

	const {
		push,
		query: { id },
	} = useRouter()

	// application fetch
	const { data: application, refetch } = useQuery(
		'get application',
		() => ApplicationServices.getApplication((id as string) + '/'),
		{
			enabled: !!id,
		}
	)

	// application update
	const { mutateAsync } = useMutation(
		'application admin update',
		(data: any) =>
			ApplicationServices.updateApplication((id as string) + '/', data),
		{
			onError: (e: any) => {
				toast.error(e.message)
			},
			onSuccess: async () => {
				await refetch()
			},
		}
	)

	return (
		<Box py={4}>
			<H3 mb={2}>{t('application')}</H3>
			<Card
				sx={{
					p: 4,
					height: '100%',
					width: '100%',
				}}
			>
				<FlexBox
					sx={{
						height: '100%',
						justifyContent: 'space-evenly',
						flexDirection: 'column',
					}}
				>
					{applicationData.map((app, ind) => (
						<div key={ind}>
							<FlexBetween my={1.5}>
								<Paragraph color="grey.900">{t(app)}:</Paragraph>
								<H6>{application?.[app]}</H6>
							</FlexBetween>
							<Divider />
						</div>
					))}
					<FlexBetween my={1.5}>
						<Paragraph color="grey.900">status:</Paragraph>
						<Select
							className="order-status-admin"
							sx={{
								'& .MuiSelect-select': {
									padding: '0px!important',
									fontSize: '1rem',
									fontWeight: 400,
									color: 'text.primary',
									backgroundColor: 'background.paper',
									border: '0px solid!important',
									borderColor: 'divider',
									'& fieldset': {
										display: 'none!important',
									},
								},
							}}
							onChange={(e) => mutateAsync({ status: e.target.value })}
							disableUnderline={true}
							value={application?.status}
						>
							{statuses.map((status) => (
								<MenuItem value={status}>
									<StatusWrapper status={status as any}>{status}</StatusWrapper>
								</MenuItem>
							))}
						</Select>
					</FlexBetween>
				</FlexBox>
			</Card>
		</Box>
	)
}

const applicationData = [
	// 'id',
	// 'document',
	'INN',
	'short_name',
	'full_name',
	'registration_form',
	'address',
	'owner',
	'bank_account',
	'bik',
	'shop_name',
	'comment',
	// 'user',
]

const statuses = ['moderation', 'approved', 'rejected']

UpdateApplication.isOnlyAuth = true

UpdateApplication.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdateApplication
