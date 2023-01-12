import {
	Box,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import {
	IProduct,
	IProductAttributeValue,
	IProductVariant,
} from 'shared/types/product.types'

import AttributeSelect from './AttributeSelect'

type VariablesProps = {
	product: IProduct
	setVariant: (product: IProductVariant) => void
	setImage?: (image: string) => void
	variant?: IProductVariant
}

type SelectedAttribute = {
	name: string
	value: any
}

const Variables: FC<VariablesProps> = ({
	product,
	setVariant,
	setImage,
	variant,
}) => {
	const [attributes, setAttributes] = useState<any>([])
	const [selectedAttributes, setSelectedAttributes] = useState<
		SelectedAttribute[]
	>([])

	useEffect(() => {
		const attributes = new Map()

		product.variants.forEach((variant) => {
			variant.attribute_values.forEach((attribute_value) => {
				if (!attributes.has(attribute_value.attribute.name)) {
					attributes.set(attribute_value.attribute.name, new Set())
				}
				attributes
					.get(attribute_value.attribute.name)
					.add(attribute_value.value)
			})
		})
		setAttributes(attributes)
	}, [])

	useEffect(() => {
		setVariant(
			product.variants.find((variant) =>
				selectedAttributes.every((attribute) =>
					variant.attribute_values.find(
						(attribute_value) =>
							attribute_value.attribute.name === attribute.name &&
							attribute_value.value === attribute.value
					)
				)
			)
		)
		setImage(
			product.variants.find((variant) =>
				selectedAttributes.every((attribute) =>
					variant.attribute_values.find(
						(attribute_value) =>
							attribute_value.attribute.name === attribute.name &&
							attribute_value.value === attribute.value
					)
				)
			)?.thumbnail
		)
	}, [selectedAttributes])

	useEffect(() => {
		console.log(product.variants)
	}, [product])
	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
			}}
		>
			{[...attributes.keys()].map((attribute) => {
				return (
					<FormControl
						key={attribute}
						sx={{ display: 'block', marginBottom: 1, marginRight: 1 }}
					>
						<AttributeSelect
							variants={product.variants}
							variant={variant}
							attribute_name={attribute}
							attribute_values={[...attributes.get(attribute)]}
							setSelectedAttributes={setSelectedAttributes}
						/>
					</FormControl>
				)
			})}
		</div>
	)
}

export default Variables
