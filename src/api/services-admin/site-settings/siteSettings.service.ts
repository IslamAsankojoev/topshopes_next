import { CRUDservice } from 'src/api/crud.service'
import { getSiteSettingsUrlAdmin } from 'src/config/api.config'

export const SiteSettingsService = CRUDservice(
	getSiteSettingsUrlAdmin,
	'site-settings'
)
