import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import placeholder from '../../../public/assets/images/placeholder.jpg'
import styles from './Field.module.scss'

const Field: FC<any> = (props) => {
	const { type, ...other } = props

	if (type == 'textfield') {
		return <TextField {...other} />
	}
	if (type == 'textarea') {
		return <TextField {...other} multiline rows={4} />
	}
	if (type == 'select') {
		return <TextField {...other} select />
	}
	if (type == 'checkbox') {
		return (
			<>
				<Checkbox color="info" {...other} />
				<span>{other.label} </span>
			</>
		)
	}
	if (type == 'radio') {
		return <TextField {...other} type="radio" />
	}
	if (type == 'file') {
		const [fileLocaleUrl, setFileLocaleUrl] = useState(
			'/assets/images/placeholder.jpg'
		)

		const handleFileChange = (e) => {
			const file = e.target.files[0]
			if (file) {
				setFileLocaleUrl(URL.createObjectURL(file))
			}
			other.setFieldValue(other.label, file)
		}

		return (
			<>
				<div className={styles.file}>
					<img
						className={styles.uploadImage}
						src={fileLocaleUrl}
						alt="Uploaded image"
					/>
					<Button
						variant="contained"
						color="info"
						component="label"
						className={styles.uploadButton}
					>
						{other.label}
						<input
							name={other.name}
							onChange={(e) => handleFileChange(e)}
							hidden
							accept="image/*"
							type="file"
						/>
					</Button>
				</div>
			</>
		)
	}

	return <TextField {...other} />
}

export default Field
