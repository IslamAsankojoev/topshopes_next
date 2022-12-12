import { Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import Field from './Field'

const CreateForm = ({ fields, handleFormSubmit }) => {
	const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
		useFormik({
			initialValues: {},
			onSubmit: () => {},
		})

	const handleFormSubmitMiddle = (e, values) => {
		e.preventDefault()
		const formData = new FormData()
		Object.keys(values).forEach((key) => {
			formData.append(key, values[key])
		}, formData)
		handleFormSubmit(formData)
	}

	return (
		<form onSubmit={(e) => handleFormSubmitMiddle(e, values)}>
			<Grid container spacing={3}>
				{fields.map((field, id) => (
					<Grid item sm={6} xs={12} key={id}>
						<Field
							type={field.type}
							fullWidth
							name={field.label}
							label={field.label}
							color="info"
							size="medium"
							placeholder={field.placeholder}
							value={values[field.label]}
							setFieldValue={setFieldValue}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched[field.label] && !!errors[field.label]}
							helperText={touched[field.label] && errors[field.label]}
						/>
					</Grid>
				))}
				<Grid item sm={6} xs={12}>
					<Button variant="contained" color="info" type="submit">
						Save product
					</Button>
				</Grid>
			</Grid>
		</form>
	)
}

export default CreateForm
