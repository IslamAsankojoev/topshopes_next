import { IProductVariant } from 'shared/types/product.types';


export interface IProductVariantInitialState {
    variants: {
        id: number
        variant: IProductVariant, 
        images: {image: File | string, product_variant?: number, id?: string | number}[]
    }[]
    imgIdCounter: number
    idCounter: number
}

