
import { CRUDservice } from "api/crud.service";
import { getProductVariantsUrl } from "config/api.config";


export const ProductVariantService = CRUDservice(
	getProductVariantsUrl,
	'product variant'
)
