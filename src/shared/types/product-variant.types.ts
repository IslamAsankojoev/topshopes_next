import { ISize } from 'shared/types/size.types';
import { IColors } from 'shared/types/product.types';

export interface IProductVariant {
    color: IColors
    discount: number
    discount_price: string
    id: number
    price: string
    size: ISize
    status: string
    stock: number
    thumbnail: string
    images: any[]
}