
import { CRUDservice } from "api/crud.service";
import { getProductVariantsUrl } from "config/api.config";


export const ProductVariantAdminService = CRUDservice(
	getProductVariantsUrl,
	'product variant'
)
