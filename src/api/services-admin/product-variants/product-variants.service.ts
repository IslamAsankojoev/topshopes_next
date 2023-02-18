
import { CRUDservice } from "src/api/crud.service";
import { getProductVariantsUrl } from "src/config/api.config";


export const ProductVariantAdminService = CRUDservice(
	getProductVariantsUrl,
	'product variant'
)
