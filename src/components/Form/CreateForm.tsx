import { Button, Card, Grid } from '@mui/material'
import Card1 from 'src/components/Card1'
import { FlexBox } from 'src/components/flex-box'
import { useTranslation } from 'next-i18next'
import { FC, ReactNode, useCallback, useEffect, useRef } from 'react'

import { common } from 'src/utils/Translate/common'
import { useForm } from 'react-hook-form'

import { localize } from 'src/utils/Translate/localize'
import * as yup from 'yup'

import Field from './Field'
import useYupValidationResolver from 'src/hooks/useYupValidationResolver'
import MemizeComponent from '../MemizeComponent/MemizeComponent'

interface CreateFormProps {
	fields: Record<string, any>
	handleFormSubmit: (formData?: FormData, values?: Record<string, any>) => void
	defaultData: Record<string, any>
	setAttributes?: (values: Record<string, any>) => void
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
	defaultData = {},
	setAttributes,
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

	const required = localize(common.required)

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
				acc[field.name] = yup.object().nullable()
				return acc
			}
			if (field.type === 'multiple-select' && field.required) {
				acc[field.name] = yup.array().min(1).required(required)
				return acc
			}
			return acc
		}, {})
	)

	const handleKeyDown = useCallback(
		(event) => {
			if (event.keyCode === 13) {
				console.log(values)
			}
		},
		[useForm]
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

	const resolver = useYupValidationResolver(validate)
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		trigger,
		watch,
		formState: { errors },
	} = useForm({
		resolver,
		defaultValues: clearFileFlieds(defaultData || {}),
		values: clearFileFlieds(defaultData || {}),
	})

	const values = getValues()

	const handleFormSubmitForm = (e) => {
		const formData = new FormData()

		Object.keys(values).forEach((key) => {
			if (!!values[key]) {
				formData.append(key, values[key])
			}
		}, formData)

		handleFormSubmit(formData, values)
	}

	useEffect(() => {
		if (setAttributes) setAttributes(values)
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
				<form
					encType="multipart/form-data"
					ref={formRef}
					onSubmit={handleSubmit((data, event) => {
						event.preventDefault()
						handleFormSubmitForm(event)
					})}
				>
					<Grid container spacing={3}>
						{fields?.map((field, id) =>
							!field.name.endsWith('_search') ? (
								<Grid item xs={12} key={id}>
									{
										<MemizeComponent
											component={
												<Field
													type={field.type}
													fullWidth
													name={field.name}
													label={getTranslate(field.label)}
													color="info"
													size="medium"
													fieldValue={values[field.name]}
													placeholder={getTranslate(field.placeholder)}
													{...(register(field.name),
													{
														// required: field.required,
														defaultValue: defaultData[field?.name],
													})}
													onChange={(e) => {
														setValue(field.name, e.target.value)
														trigger(field.name)
													}}
													error={!!errors[field.name]}
													helperText={!!errors[field.name]}
													// defaultData={defaultData || {}}
													allNames={field?.allNames || []}
													isValidating={true}
													accept={field.fileTypes}
													maxLength={field.maxLength}
													previewType={field.previewType}
													setValue={setValue}
													trigger={trigger}
												/>
											}
										/>
									}
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
										type="submit"
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

export default CreateForm
