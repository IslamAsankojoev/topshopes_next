import { IImage } from './../../shared/types/product.types';
import { IProductVariant } from 'shared/types/product.types';
import { IProductVariantInitialState } from './productVariant.interface';
import { createSlice } from '@reduxjs/toolkit'


const initialState: IProductVariantInitialState = {
	variants: [],
    idCounter: 0,
    imgIdCounter: 0
}

const productVariantsSlice = createSlice({
	name: 'productVariants',
	initialState,
	reducers: {
        setVariants: (state, {payload}) => {
            state.variants = payload
        },
        addVariant: (state, {payload}) => {
            state.variants = [...state.variants, {...payload, id: state.idCounter}]
            state.idCounter = state.idCounter + 1
        },
        updateVariant: (
            state, 
            {payload}: {payload: {data: {variant: IProductVariant, images: any[]}, id: number | string}}
            ) => {
            // задать id варианта и его обновленные данные
            state.variants = state.variants.map(variant => {
                if (variant?.id == payload.id) {
                    return {...variant, ...payload.data}
                }
                return variant
            })
        },
        removeVariant: (state, {payload}: {payload: number | string}) => {
            // в payload указать id-variant
            const arr = []
            for (let variant of state.variants) {
                if (payload == variant?.id) {
                    continue;
                }
                arr.push(variant)
            }
            state.variants = arr
        },

        // images
        imgIdCounterIncrement: (state) => {
            state.imgIdCounter = state.imgIdCounter + 1
        },

        setVariantImages: (
            state, 
            {payload}: {
                payload: {images: {image: File | string, id?: string | number}[], variantId: number | string}
            }) => {
            // задать id варианта и новое изображение
            state.variants = state.variants.map(variant => {
                if (variant?.id == payload.variantId) {
                    return {
                        ...variant, 
                        images: payload.images
                    }
                }
                return variant
            })
            // state.imgIdCounter = state.imgIdCounter + 1
        },

        // updateVariantImages: (
        //     state, 
        //     {payload}: {
        //         payload: {image: File, variantId: number | string, imgId: number | string}
        //     }) => {
        //     // задать id варианта и id изображение потом новое изображение
        //     state.variants = state.variants.map(variant => {
        //         if (variant?.id == payload.variantId) {
        //             return {
        //                 ...variant, 
        //                 images: variant.images.map(image => {
        //                     if (image.id == payload.imgId) return {...image, image: payload.image}
        //                     return image
        //                 })
        //             }
        //         }
        //         return variant
        //     })
        // },

        // removeVariantImages: (
        //     state, 
        //     {payload}: {
        //         payload: { variantId: number | string, imgId: number | string}
        //     }) => {
        //     const arr = []
        //     for (let variant of state.variants) {
        //         if (payload.variantId == variant?.id) {
        //             const images = []
        //             for (let img of variant.images) {
        //                 if (img.id == payload.imgId) continue;
        //                 images.push(img)
        //             }
        //             arr.push({...variant, images: images})
        //         }
        //         arr.push(variant)
        //     }
        //     state.variants = arr
        // }

    },
})

export const { actions } = productVariantsSlice

export default productVariantsSlice.reducer
