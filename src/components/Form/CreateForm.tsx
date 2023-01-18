import { Button, Grid, TextField } from '@mui/material'
import Field from './Field'
import * as yup from 'yup'
import { ErrorMessage, Form, useFormik } from 'formik'
import { useEffect } from 'react'
import { formData } from 'utils/formData'
import React from 'react'

interface CreateFormProps {
	fields: Record<string, any>
	handleFormSubmit: (formData?: FormData, values?: Record<string, any>) => void
	defaultData: Record<string, any>
	getValues?: (values: Record<string, any>) => void
	children?: React.ReactNode
}
const CreateForm: React.FC<CreateFormProps> = ({
	fields,
	handleFormSubmit,
	defaultData,
	getValues,
	children,
}) => {
	// write validation schema for each field by iterating over fields
	const validate = yup.object().shape(
		fields.reduce((acc, field) => {
			if (field.type == 'text' && field.required) {
				acc[field.name] = yup.string().required('Required')
				return acc
			}
			if (field.type === 'number' && field.required) {
				acc[field.name] = yup.number().required('Required')
				return acc
			}
			if (field.type === 'email' && field.required) {
				acc[field.name] = yup
					.string()
					.email('Invalid email')
					.required('Required')
				return acc
			}
			if (field.type === 'date' && field.required) {
				acc[field.name] = yup.date().required('Required')
				return acc
			}
			if (field.type === 'file' && field.required) {
				acc[field.name] = yup.mixed().required('Required')
				return acc
			}
			if (field.type === 'color' && field.required) {
				acc[field.name] = yup.string().required('Required')
				return acc
			}
			if (field.type === 'textEditor' && field.required) {
				acc[field.name] = yup.string().required('Required')
				return acc
			}
			if (field.type === 'select' && field.required) {
				acc[field.name] = yup.string().required('Required')
				return acc
			}
			if (field.type === 'autocomplete' && field.required) {
				acc[field.name] = yup.object({
					id: yup.string().required('Required'),
				})
				return acc
			}
			if (field.type === 'autocomplete-multiple' && field.required) {
				acc[field.name] = yup.object().nullable(true)
				return acc
			}
			if (field.type === 'multiple-select' && field.required) {
				acc[field.name] = yup.array().min(1).required('required')
				return acc
			}
			return acc
		}, {})
	)

	const clearFileFlieds = (data) => {
		let dataDef = { ...data }
		for (let key in data) {
			if (fields.find((field) => field.type == 'file' && field.name == key)) {
				dataDef[key] = false
			}
		}
		return { ...dataDef }
	}

	const {
		errors,
		values,
		setFieldValue,
		handleBlur,
		handleChange,
		handleSubmit,
	} = useFormik({
		validationSchema: validate,
		initialValues: clearFileFlieds(defaultData || {}),
		onSubmit: () => handleFormSubmitForm(),
	})

	React.useEffect(() => {
		if (getValues) getValues(values)
	}, [values])

	const handleFormSubmitForm = () => {
		const formData = new FormData()
		Object.keys(values).forEach((key) => {
			if (!!values[key]) {
				formData.append(key, values[key])
			}
		}, formData)

		handleFormSubmit(formData, values)
	}

	return fields ? (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={3}>
				{fields?.map((field, id) =>
					!field.name.endsWith('_search') ? (
						<Grid item sm={field?.fullWidth ? 12 : 6} xs={12} key={id}>
							<Field
								type={field.type}
								fullWidth
								name={field.name}
								label={field.name}
								color="info"
								size="medium"
								placeholder={field.placeholder}
								value={values[field.name]}
								setFieldValue={setFieldValue}
								onBlur={handleBlur}
								onChange={handleChange}
								defaultData={defaultData || {}}
								allNames={field?.allNames || []}
							/>
							<span style={{ color: 'red', fontWeight: '600' }}>
								{!!errors[field.name] && 'required'}
							</span>
						</Grid>
					) : null
				)}
				<Grid
					sx={{
						p: 4,
					}}
				>
					{children}
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						p: 4,
						position: 'absolute',
						bottom: 0,
						right: 0,
						background: '#fff',
					}}
				>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						size="medium"
						sx={{
							padding: '0.5rem 1.4rem',
							fontSize: '1rem',
						}}
					>
						Save
					</Button>
				</Grid>
			</Grid>
		</form>
	) : null
}

export default CreateForm
