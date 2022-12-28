import { CRUDservice } from 'api/crud.service'
import { getSiteSettingsUrlAdmin } from 'config/api.config'

export const SiteSettingsService = CRUDservice(
	getSiteSettingsUrlAdmin,
	'site-settings'
)
