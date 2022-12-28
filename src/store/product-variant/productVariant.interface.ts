import { IProductVariant } from 'shared/types/product-variant.types';


export interface IProductVariantInitialState {
    variants: {variants: IProductVariant, images: any[]}[]
}