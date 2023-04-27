import { FormControl } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { IProduct, IProductVariant } from 'src/shared/types/product.types'

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
	}, [product])

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

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{[...attributes.keys()].map((attribute) => {
				return (
					<FormControl key={attribute} sx={{ display: 'inline-block' }}>
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
