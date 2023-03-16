import { IImage } from './../../shared/types/product.types'
import { IProductVariant } from 'src/shared/types/product.types'
import { IProductVariantInitialState } from './productVariant.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IProductVariantInitialState = {
	variants: [],
	newAttributes: [],
	idCounter: 0,
	imgIdCounter: 0,
	currentCategory: '',
}

const productVariantsSlice = createSlice({
	name: 'productVariants',
	initialState,
	reducers: {
		setVariants: (state, { payload }) => {
			state.variants = payload
		},
		addVariant: (state, { payload }) => {
			state.variants = [...state.variants, { ...payload, id: state.idCounter }]
			state.idCounter = state.idCounter + 1
		},
		updateVariant: (
			state,
			{
				payload,
			}: {
				payload: {
					data: { variant: IProductVariant; images: any[] }
					id: number | string
				}
			}
		) => {
			// задать id варианта и его обновленные данные
			state.variants = state.variants.map((variant) => {
				if (variant?.id == payload.id) {
					// что бы вытащить прошлый thumbnail если нету в пришедших данных
					const imgCheck = payload.data.variant?.thumbnail
						? payload.data.variant?.thumbnail
						: variant.variant.thumbnail
					return {
						...variant,
						attribute_values: variant.attribute_values,
						images: payload.data.images,
						variant: { ...payload.data.variant, thumbnail: imgCheck },
					}
				}
				return variant
			})
		},
		removeVariant: (state, { payload }: { payload: number | string }) => {
			// в payload указать id-variant
			const arr = []
			for (let variant of state.variants) {
				if (payload == variant?.id) {
					continue
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
			{
				payload,
			}: {
				payload: {
					images: { image: File | string; id?: string | number }[]
					variantId: number | string
				}
			}
		) => {
			// задать id варианта и новое изображение
			state.variants = state.variants.map((variant) => {
				if (variant?.id == payload.variantId) {
					return {
						...variant,
						images: payload.images,
					}
				}
				return variant
			})
		},

		setNewAttributes: (state, { payload }) => {
			state.newAttributes = payload
		},

		addAttributeValues: (
			state,
			{
				payload,
			}: {
				payload: { attribute: any; variantId: number | string }
			}
		) => {
			// задать id варианта и новый атрибут
			state.variants = state.variants.map((variant) => {
				if (variant?.id == payload.variantId) {
					return {
						...variant,
						attribute_values: variant?.attribute_values.map((attribute) => {
							if (payload.attribute.attributeId == attribute.attributeId) {
								return payload.attribute
							}
							return attribute
						}),
					}
				}
				return variant
			})
		},

		updateAttribute: (
			state,
			{
				payload,
			}: {
				payload: {
					variantId: string | number
					attributeId: number | string
					newValue: string | any
				}
			}
		) => {
			state.variants = state.variants.map((variant) => {
				if (variant?.id == payload.variantId) {
					return {
						...variant,
						attribute_values: variant.attribute_values.map((attribute) => {
							if (
								payload.attributeId == attribute.attributeId &&
								attribute.attributeValue != payload.newValue
							) {
								return { ...attribute, value: payload.newValue }
							}
							return attribute
						}),
					}
				}
				return variant
			})
		},

		setCurrentCategory: (state, { payload }) => {
			state.currentCategory = payload
			state.variants = state.variants.map((variant) => {
				return { ...variant, attribute_values: [] }
			})
		},
	},
})

export const { actions } = productVariantsSlice

export default productVariantsSlice.reducer
