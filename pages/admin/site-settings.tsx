import { Box } from '@mui/material'
import CreateForm from 'src/components/Form/CreateForm'
import Loading from 'src/components/Loading'
import { H3 } from 'src/components/Typography'
import VendorDashboardLayout from 'src/components/layouts/vendor-dashboard'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { NextPageAuth } from 'src/shared/types/auth.types'
import { siteSettingsFormEdit } from 'src/utils/constants/forms'
import { api_admin } from 'src/api/index.service'

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
const SiteSettings: NextPageAuth = () => {
	const { t } = useTranslation('admin')
	const { data, isLoading } = useQuery('site-settings admin get', () =>
		api_admin.siteSettings.SiteSettingsService.getList()
	)

	// site settings mutate
	const { mutateAsync } = useMutation(
		'site-settings admin update',
		(data: FormData) =>
			api_admin.siteSettings.SiteSettingsService.update('', data),
		{
			onSuccess: () => {
				toast.success('settings saved successfully')
			},
		}
	)

	// submiting
	const handleFormSubmit = (data: FormData) => {
		mutateAsync(data)
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<Box py={4}>
			<H3 mb={2}>{t('siteSetting')}</H3>
			<CreateForm
				defaultData={data}
				fields={siteSettingsFormEdit}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}
SiteSettings.isOnlyAdmin = true

SiteSettings.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default SiteSettings
