import { Button, Card, Grid, TextField } from '@mui/material'
import Field from './Field'
import * as yup from 'yup'
import { ErrorMessage, Form, useFormik } from 'formik'
import { useEffect } from 'react'
import { formData } from 'utils/formData'
import React from 'react'
import { FlexBox } from 'components/flex-box'
import Card1 from 'components/Card1'

interface CreateFormProps {
	fields: Record<string, any>
	handleFormSubmit: (formData?: FormData, values?: Record<string, any>) => void
	defaultData: Record<string, any>
	getValues?: (values: Record<string, any>) => void
	children?: React.ReactNode
	maxFormWidth?: string
	actionButtons?: React.ReactNode
}
const CreateForm: React.FC<CreateFormProps> = ({
	fields,
	handleFormSubmit,
	defaultData,
	getValues,
	children,
	maxFormWidth = '600px',
	actionButtons,
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
		touched,
		errors,
		values,
		setFieldValue,
		handleBlur,
		handleChange,
		handleSubmit,
		setFieldTouched,
	} = useFormik({
		initialValues: clearFileFlieds(defaultData || {}),
		onSubmit: () => handleFormSubmitForm(),
		validationSchema: validate,
	})

	const handleFormSubmitForm = () => {
		const formData = new FormData()

		Object.keys(values).forEach((key) => {
			if (!!values[key]) {
				formData.append(key, values[key])
			}
		}, formData)

		handleFormSubmit(formData, values)
	}

	React.useEffect(() => {
		if (getValues) getValues(values)
	}, [values])

	return fields ? (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Card1
				sx={{
					px: 6,
					py: 3,
					mt: 3,
					width: '100%',
					maxWidth: maxFormWidth,
					'@media (max-width: 600px)': {
						px: 1,
					},
				}}
			>
				<form>
					<Grid container spacing={3}>
						{fields?.map((field, id) =>
							!field.name.endsWith('_search') ? (
								<Grid item xs={12} key={id}>
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
										error={!!touched[field.name] && !!errors[field.name]}
										helperText={touched[field.name] && errors[field.name]}
										defaultData={defaultData || {}}
										allNames={field?.allNames || []}
										isValidating={true}
									/>
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
						<Grid item xs={12}>
							<Card
								sx={{
									border: '1px solid #E4E7EB',
									position: 'fixed',
									display: 'flex',
									bottom: 10,
									right: 10,
									zIndex: 100,
									justifyContent: 'space-evenly',
									padding: '10px!important',
									backgroundColor: '#F7F9FC',
									'@media (max-width: 600px)': {
										width: '95%',
										justifyContent: 'space-evenly',
									},
								}}
							>
								<FlexBox
									flexWrap={'wrap'}
									justifyContent={'flex-end'}
									sx={{ gridGap: '10px' }}
								>
									{actionButtons}
									<Button
										variant="contained"
										color="primary"
										sx={{
											px: 4,
										}}
										onClick={() => {
											handleSubmit()
											Object.keys(fields).forEach((key) => {
												setFieldTouched(fields[key].name, true)
											})
										}}
										size="medium"
									>
										Save
									</Button>
								</FlexBox>
							</Card>
						</Grid>
					</Grid>
				</form>
			</Card1>
		</div>
	) : null
}

export default CreateForm
