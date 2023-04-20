import { InputAdornment, TextField, Typography } from '@mui/material'
import { FC, useEffect } from 'react'
import { IProductAttributeValue } from 'src/shared/types/product.types'

type Props = {
	attributes: any[]
	attributeValues: any
	setAttributeValues: any
	initialAttributes?: IProductAttributeValue[]
}

const AttributesForm: FC<Props> = ({
	attributes,
	setAttributeValues,
	attributeValues,
	initialAttributes = [],
}) => {
	console.log('attributeValues', attributeValues)
	return (
		<form
			style={{
				display: 'flex',
				flexDirection: 'column',
				rowGap: '1rem',
			}}
		>
			{!!attributes?.length &&
				attributes?.map((attribute) => {
					const currentAttribute =
						Object.values(initialAttributes).length &&
						initialAttributes.find(
							(attrValue) => attrValue.attribute.name === attribute.name
						)

					return (
						<TextField
							key={attribute.name}
							label={attribute.label}
							name={attribute.name}
							defaultValue={currentAttribute?.value || ''}
							onChange={(e) => {
								setAttributeValues((prev) => {
									return {
										...prev,
										[attribute.name]: {
											attribute: {
												id: attribute.id,
												name: attribute.name,
											},
											product_variant:
												currentAttribute?.product_variant || null,
											id: currentAttribute?.id || null,
											value: e.target.value,
										},
									}
								})
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Typography
											fontWeight="700"
											color="grey.800"
											textTransform="capitalize"
											fontSize="16"
										>
											{attribute.name}
										</Typography>
									</InputAdornment>
								),
							}}
							color="primary"
							size="medium"
						/>
					)
				})}
		</form>
	)
}

export default AttributesForm
