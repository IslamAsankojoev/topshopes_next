import {
	Button,
	Checkbox,
	FormControlLabel,
	Switch,
	TextField,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import styles from './Field.module.scss'

const Field: FC<any> = (props) => {
	const { type, ...other } = props

	if (type == 'text') {
		return (
			<>
				<TextField {...other} />
			</>
		)
	}
	if (type == 'text') {
		return <TextField {...other} multiline rows={4} />
	}
	if (type == 'select') {
		return <TextField {...other} select />
	}
	if (type == 'checkbox') {
		return (
			<>
				<Switch color="info" {...other} checked={other.value} />
				<span>{other.label} </span>
			</>
		)
	}
	if (type == 'radio') {
		return <TextField {...other} type="radio" />
	}
	if (type == 'file') {
		const [fileLocaleUrl, setFileLocaleUrl] = useState(null)

		const handleFileChange = (e) => {
			const file = e.target.files[0]
			if (file) {
				setFileLocaleUrl(URL.createObjectURL(file))
				other.setFieldValue(other.label, file)
			}
		}

		useEffect(() => {
			console.log(other.defaultData)
		}, [])

		return (
			<>
				<div className={styles.file}>
					<img
						className={styles.uploadImage}
						src={
							fileLocaleUrl ||
							other.defaultData[other.name] ||
							'/assets/images/placeholder.jpg'
						}
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
							hidden
							name={other.name}
							onChange={(e) => handleFileChange(e)}
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
