import { Box } from '@mui/material'
import { SiteSettingsService } from 'api/services-admin/site-settings/siteSettings.service'
import CreateForm from 'components/Form/CreateForm'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'

import React, { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { NextPageAuth } from 'shared/types/auth.types'
import { ISiteSettings } from 'shared/types/site-settings.types'
import { siteSettingsFormEdit } from 'utils/constants/forms'

const SiteSettings: NextPageAuth = () => {
	// site settings mutate
	const { mutateAsync } = useMutation(
		'site-settings admin update',
		(data: ISiteSettings) => SiteSettingsService.update(null, data)
	)

	// submiting
	const handleFormSubmit = (_: any, data: ISiteSettings) => {
		mutateAsync(data)
	}

	return (
		<Box py={4}>
			<H3 mb={2}>Site settings</H3>
			<CreateForm
				defaultData={{}}
				fields={siteSettingsFormEdit}
				handleFormSubmit={handleFormSubmit}
			/>
		</Box>
	)
}
SiteSettings.isOnlyUser = true

SiteSettings.getLayout = function getLayout(page: ReactElement) {
	return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default SiteSettings
