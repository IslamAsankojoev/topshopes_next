import axios from 'axios'
import { makeRequest } from 'src/api/interceptor'
import { SITE_URL } from 'src/config/api.config'

const ThumbnailService = {
	download: async (variantID: string) => {
		const imageBlob = await makeRequest(true).get(
			`product-variants/${variantID}/thumbnail/`,
			{
				responseType: 'blob',
			}
		)

		return imageBlob
	},
}

export default ThumbnailService
