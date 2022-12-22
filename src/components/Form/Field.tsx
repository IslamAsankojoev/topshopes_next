import { Button, MenuItem, Switch, TextField } from '@mui/material'
import { FC, useState } from 'react'
import styles from './Field.module.scss'
import dynamic from 'next/dynamic'
const DynamicTextEditor = dynamic(
	() => import('components/TextEditor/TextEditor'),
	{ ssr: false }
)

const Field: FC<any> = (props) => {
	const { type, ...other } = props

	if (type == 'text') {
		return <TextField {...other} />
	}
	if (type == 'text-multiline') {
		return <TextField {...other} multiline rows={4} />
	}
	if (type == 'color') {
		return <input {...other} type={'color'} />
	}

	if (type == 'select') {
		return (
			<TextField {...other} select>
				{other.allNames?.map((select: { id: string; name: string }) => (
					<MenuItem key={select.name} value={select.id}>
						{select.name}
					</MenuItem>
				))}
			</TextField>
		)
	}

	if (type == 'textEditor') {
		const [value, setValue] = useState(null)

		const onChange = (editorValue: string) => {
			setValue(editorValue)
			other.setFieldValue(other.name, editorValue)
		}

		return (
			<DynamicTextEditor
				onChange={onChange}
				placeholder={other.label}
				value={other.defaultData[other.label] || value}
			/>
		)
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
		return <TextField {...other} type="radio" fullWidth />
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
