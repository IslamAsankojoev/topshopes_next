import styled from '@emotion/styled'
import { Box, Card, Divider, MenuItem, Select } from '@mui/material'
import { ApplicationServices } from 'src/api/services-admin/applications/applications.service'
import Loading from 'src/components/Loading'
import { H3, H6, Paragraph } from 'src/components/Typography'
import { FlexBetween, FlexBox } from 'src/components/flex-box'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { Pdf } from 'src/components/pdf-viewer/Pdf'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { StatusWrapper } from 'src/pages-sections/admin'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'

export const getServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				'common',
				'admin',
				'application',
			])),
		},
	}
}

const UpdateApplication: NextPageAuth = () => {
	const { t } = useTranslation('admin')
	const { t: applicationT } = useTranslation('application')

	const getTranslate = (word: string) => {
		// если нету в admin то возьмет из common
		return t(word) === word ? applicationT(word) : t(word)
	}

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
	const { mutateAsync, isLoading } = useMutation(
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
			<H3 mb={2} sx={{ textTransform: 'uppercase' }}>
				{getTranslate('application')}
			</H3>
			{isLoading ? <Loading /> : null}
			<CardsWrapper>
				<Card
					sx={{
						p: 4,
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
									<Paragraph
										sx={{ textTransform: 'uppercase' }}
										color="grey.900"
									>
										{getTranslate(app.name)}:
									</Paragraph>
									<H6>{application?.[app.id]}</H6>
								</FlexBetween>
								<Divider />
							</div>
						))}
						<FlexBetween my={1.5}>
							<Paragraph color="grey.900" sx={{ textTransform: 'uppercase' }}>
								{getTranslate('status')}:
							</Paragraph>

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
										<StatusWrapper status={status as any}>
											{getTranslate(status)}
										</StatusWrapper>
									</MenuItem>
								))}
							</Select>
						</FlexBetween>
					</FlexBox>
				</Card>
				<Card>
					<Pdf document={application?.document} />
				</Card>
			</CardsWrapper>
		</Box>
	)
}
const CardsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-content: center;
	align-items: center;
	grid-gap: 20px;

	@media (max-width: 730px) {
		grid-template-columns: 1fr;
	}
`
const applicationData = [
	// 'id',
	// 'document',
	{ id: 'INN', name: 'inn' },
	{ id: 'short_name', name: 'shortName' },
	{ id: 'full_name', name: 'fullName' },
	{ id: 'registration_form', name: 'registrationForm' },
	{ id: 'address', name: 'address' },
	{ id: 'owner', name: 'owner' },
	{ id: 'bank_account', name: 'bankAccount' },
	{ id: 'bik', name: 'bik' },
	{ id: 'shop_name', name: 'shopName' },
	{ id: 'comment', name: 'review' },
	// 'user',
]

const statuses = ['moderation', 'approved', 'rejected']

UpdateApplication.isOnlyAuth = true

UpdateApplication.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default UpdateApplication
