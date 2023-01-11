import { IProductVariant } from 'shared/types/product.types';


export interface IProductVariantInitialState {
    variants: {
        id: number
        variant: IProductVariant, 
        images: {image: File | string, product_variant?: number, id?: string | number}[]
        attribute_values: {
            available: boolean
            attributeId: string | number, 
            attributeNameId: string | number,
            attributeName: string,
            attributeValue: string,
        }[]
    }[]
    newAttributes: any[]
    imgIdCounter: number
    idCounter: number
    currentCategory: string
}

