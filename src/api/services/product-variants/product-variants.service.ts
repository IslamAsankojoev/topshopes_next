
import { CRUDservice } from "src/api/crud.service";
import { getProductVariantsUrl } from "src/config/api.config";


export const ProductVariantService = CRUDservice(
	getProductVariantsUrl,
	'product variant'
)
