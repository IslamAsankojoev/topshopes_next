import { IProductVariant } from 'shared/types/product.types'

export interface IProductVariantInitialState {
	variants: { variants: IProductVariant; images: any[] }[]
}
