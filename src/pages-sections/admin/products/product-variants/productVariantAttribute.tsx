import { Button, Card, Grid, TextField } from '@mui/material'
import { useActions } from 'hooks/useActions'
import * as yup from 'yup'
import React from 'react'
import { IProductAttributeValue } from 'shared/types/product.types'
import { useFormik } from 'formik'
import { useTypedSelector } from 'hooks/useTypedSelector'

interface ProductAttributesProps {
	attributes: IProductAttributeValue[] | any
	handleFormSubmit: () => void
	variantId: string | number
}

const ProductAttributes: React.FC<ProductAttributesProps> = ({
	attributes,
	handleFormSubmit,
	variantId,
}) => {
	// states
	const [attributeFields, setAttributeFields] = React.useState([])
	const [defaultData, setDefaultData] = React.useState({})

	// redux
	const { setNewAttributes, addAttributeValues, updateAttribute } = useActions()
	const { newAttributes, variants } = useTypedSelector(
		(state) => state.productVariantsStore
	)

	// validation schema
	const validate = yup.object().shape(
		attributeFields.reduce((acc, field) => {
			acc[field.name] = yup
				.string()
				.max(30, 'maximum input number of characters 40')
			return acc
		}, {})
	)

	// formik
	const { values, handleChange, handleSubmit } = useFormik({
		validationSchema: validate,
		initialValues: defaultData,
		onSubmit: handleFormSubmit,
	})

	// data processing
	React.useEffect(() => {
		if (!attributes || Object.keys(defaultData).length) return

		for (let attribute of attributes) {
			if (attribute?.attribute) {
				setDefaultData((prev) => ({
					...prev,
					[attribute.attribute.name]: attribute.value,
				}))

				addAttributeValues({
					attribute: {
						attributeId: attribute.id || attribute.attribute.id,
						attributeName: attribute.attribute.name,
						attributeNameId: attribute?.attribute?.id || attribute.id,
						available: true,
					},
					variantId,
				})
			} else {
				setDefaultData((prev) => ({
					...prev,
					[attribute?.name]: attribute?.value || '',
				}))

				addAttributeValues({
					attribute: {
						...attribute,
						attributeName: attribute.name,
						available: false,
					},
					variantId,
				})
			}

			setAttributeFields((prev) => [
				...prev,
				{
					name: attribute?.attribute
						? attribute?.attribute.name
						: attribute?.name,
					label: attribute?.attribute
						? attribute?.attribute.name
						: attribute?.name,
					type: 'text',
					placeholder: 'Enter attribute',
					required: true,
					fullWidth: true,
				},
			])
		}
	}, [])

	const onBlurHandler: any = (e: React.FormEvent<HTMLInputElement>) => {
		if (!Object.keys(values).length) return

		const attrValues = attributes.map((attribute) => {
			for (let key in values) {
				const name = attribute?.attribute?.name || attribute.name
				if (key === name) {
					updateAttribute({
						variantId,
						attributeId:
							attribute?.attribute?.id ||
							attribute.id ||
							attribute?.attributeId,
						newValue: values[key],
					})
					return {
						name: key,
						value: values[key],
						available: !!attribute?.attribute?.id,
						attributeNameId: attribute?.attribute?.id || attribute.id,
						attributeId: attribute.id,
					}
				}
			}
		})
		console.log(variants)
		setNewAttributes(attrValues)
	}

	return (
		<Card sx={{ p: 6, mt: 2 }}>
			<h3>Attributes</h3>

			<form onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					{attributeFields?.map((field, id) => (
						<Grid item sm={12} xs={12} key={id}>
							<TextField
								fullWidth
								name={field.name}
								label={field.name}
								color="info"
								size="medium"
								placeholder={'Enter attribute'}
								value={values[field.name]}
								defaultValue={defaultData[field.name]}
								onBlur={onBlurHandler}
								onChange={handleChange}
							/>
						</Grid>
					))}
				</Grid>
			</form>
		</Card>
	)
}

export default ProductAttributes