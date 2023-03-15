import { Button, Card, Grid, TextField } from '@mui/material'
import Card1 from 'src/components/Card1'
import { FlexBox } from 'src/components/flex-box'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import { FC, memo, ReactNode, useCallback, useEffect, useRef } from 'react'

import { common } from 'src/utils/Translate/common'
import { dynamicLocalization } from 'src/utils/Translate/dynamicLocalization'
import * as yup from 'yup'

import Field from './Field'
import { commonArrowBtnStyle } from '../carousel/CarouselStyled'

interface CreateFormProps {
	fields: Record<string, any>
	handleFormSubmit: (formData?: FormData, values?: Record<string, any>) => void
	defaultData: Record<string, any>
	getValues?: (values: Record<string, any>) => void
	children?: ReactNode
	maxFormWidth?: string
	actionButtons?: ReactNode
	buttonText?: string
	buttonPosition?: string
	buttonSize?: 'small' | 'normal' | 'medium' | 'large'
	formType?: 'table' | 'form'
}
const CreateForm: FC<CreateFormProps> = ({
	fields,
	handleFormSubmit,
	defaultData,
	getValues,
	children,
	maxFormWidth = '600px',
	actionButtons,
	buttonPosition = 'static',
	buttonText,
	buttonSize = 'large',
	formType = 'form',
}) => {
	const { t } = useTranslation('admin')
	const { t: commonT } = useTranslation('common')
	const formRef = useRef(null)

	const required = dynamicLocalization(common.required)

	const getTranslate = (word: string) => {
		// если нету в admin то возьмет из common
		return t(word) === word ? commonT(word) : t(word)
	}

	// write validation schema for each field by iterating over fields
	const validate = yup.object().shape(
		fields.reduce((acc, field) => {
			if (field.type == 'text' && field.required) {
				acc[field.name] = yup.string().required(required)
				return acc
			}
			if (field.type === 'number' && field.required) {
				acc[field.name] = yup.number().required(required)
				return acc
			}
			if (field.type === 'email' && field.required) {
				acc[field.name] = yup.string().email('Invalid email').required(required)
				return acc
			}
			if (field.type === 'date' && field.required) {
				acc[field.name] = yup.date().required(required)
				return acc
			}
			if (field.type === 'file' && field.required) {
				acc[field.name] = yup.mixed().required(required)
				return acc
			}
			if (field.type === 'color' && field.required) {
				acc[field.name] = yup.string().required(required)
				return acc
			}
			if (field.type === 'textEditor' && field.required) {
				acc[field.name] = yup.string().required(required)
				return acc
			}
			if (field.type === 'select' && field.required) {
				acc[field.name] = yup.string().required(required)
				return acc
			}
			if (field.type === 'autocomplete' && field.required) {
				acc[field.name] = yup.object({
					id: yup.string().required(required),
				})
				return acc
			}
			if (field.type === 'autocomplete-multiple' && field.required) {
				acc[field.name] = yup.object().nullable(true)
				return acc
			}
			if (field.type === 'multiple-select' && field.required) {
				acc[field.name] = yup.array().min(1).required(required)
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
		submitForm,
		setValues,
		resetForm,
	} = useFormik({
		initialValues: clearFileFlieds(defaultData || {}),
		onSubmit: () => handleFormSubmitForm(),
		validationSchema: validate,
	})

	const handleFormSubmitForm = () => {
		const formData = new FormData()

		Object.keys(values).forEach((key) => {
			if (!!values[key]) {
				if (typeof values[key] === 'string' && values[key].endsWith('%'))
					values[key] = values[key].replace('%', '')
				formData.append(key, values[key])
			}
		}, formData)

		handleFormSubmit(formData, values)
	}

	const handleKeyDown = useCallback(
		(event) => {
			if (event.keyCode === 13) {
				handleSubmit()
			}
		},
		[useFormik]
	)

	useEffect(() => {
		if (getValues) getValues(values)
	}, [values])

	useEffect(() => {
		const form = formRef.current
		form.addEventListener('keydown', handleKeyDown)

		return () => {
			form.removeEventListener('keydown', handleKeyDown)
		}
	}, [formRef, handleKeyDown])

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
					width: '100%',
					maxWidth: maxFormWidth,
					'@media (max-width: 600px)': {
						px: 2,
					},
				}}
			>
				<form ref={formRef}>
					<Grid container spacing={3}>
						{fields?.map((field, id) =>
							!field.name.endsWith('_search') ? (
								<Grid item xs={12} key={id}>
									<Field
										type={field.type}
										fullWidth
										name={field.name}
										label={getTranslate(field.label)}
										color="info"
										size="medium"
										placeholder={getTranslate(field.placeholder)}
										value={values[field.name]}
										setFieldValue={setFieldValue}
										onBlur={handleBlur}
										onChange={handleChange}
										error={!!touched[field.name] && !!errors[field.name]}
										helperText={touched[field.name] && errors[field.name]}
										defaultData={defaultData || {}}
										allNames={field?.allNames || []}
										isValidating={true}
										accept={field.fileTypes}
										maxLength={field.maxLength}
										previewType={field.previewType}
										setValues={setValues}
									/>
								</Grid>
							) : null
						)}
						<Grid item xs={12}>
							{children}
						</Grid>
						<Grid item xs={12}>
							<Card
								sx={{
									border: buttonPosition ? '' : '1px solid #E4E7EB',
									backgroundColor: buttonPosition ? '' : '#F7F9FC',
									position: buttonPosition || 'fixed',
									boxShadow: buttonPosition && 'none',
									display: 'flex',
									bottom: 0,
									right: 0,
									zIndex: 100,
									justifyContent: 'space-evenly',
									padding: '8px!important',
									'@media (max-width: 600px)': {
										width: '100%',
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
										color="success"
										size={buttonSize || 'small'}
										onClick={() => {
											submitForm()
											Object.keys(fields).forEach((key) => {
												setFieldTouched(fields[key].name, true)
											})
										}}
									>
										{buttonText || t('save')}
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

export default memo(CreateForm)
