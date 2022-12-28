
import { CRUDservice } from "api/crud.service";
import { getProductVariantsUrlAdmin } from "config/api.config";


export const ProductVariantAdminService = CRUDservice(
	getProductVariantsUrlAdmin,
	'product variant admin'
)
