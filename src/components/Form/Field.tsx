import {
	Autocomplete,
	Button,
	Grid,
	MenuItem,
	styled,
	Switch,
	TextField,
} from '@mui/material'
import DropZone from 'components/DropZone'
import LazyImage from 'components/LazyImage'
import MultipleSelect from 'components/multiple-select/MultipleSelect'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FC, useState } from 'react'

import styles from './Field.module.scss'

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

	if (type == 'autocomplete') {
		return (
			<Autocomplete
				{...other}
				onChange={(
					_: any,
					newValue: {
						id: string | number
						label: string | number
					}
				) => {
					other.setFieldValue(other.name, newValue)
				}}
				disablePortal
				options={other.allNames}
				getOptionLabel={(option: {
					id: string | number
					name: string | number
				}) => option?.name}
				sx={{ width: 300 }}
				renderInput={(params) => (
					<TextField
						onChange={({ target }) =>
							other.setFieldValue(other.name + '_search', target.value)
						}
						{...params}
					/>
				)}
			/>
		)
	}

	if (type == 'autocomplete-multiple') {
		return (
			<Autocomplete
				{...other}
				multiple
				onChange={(
					_: any,
					newValue: {
						id: string | number
						label: string | number
					}
				) => {
					other.setFieldValue(other.name, newValue)
				}}
				disablePortal
				filterSelectedOptions
				options={other.allNames}
				getOptionLabel={(option: {
					id: string | number
					name: string | number
				}) => option?.name}
				sx={{ width: 300 }}
				renderInput={(params) => (
					<TextField
						onChange={({ target }) =>
							other.setFieldValue(other.name + '_search', target.value)
						}
						{...params}
					/>
				)}
			/>
		)
	}

	if (type == 'multiple-select') {
		console.log(other.defaultData[other.name])
		return (
			<MultipleSelect
				allNames={other.allNames}
				defaultValues={other.defaultData[other.name]}
				onChange={(selected) =>
					other.setFieldValue(
						other.name,
						selected.map((id) => (isNaN(id) ? id : +id))
					)
				}
				label={other.name}
			/>
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
		const getImgUrl = (img: File | Blob | string | any) => {
			if (!img) return false

			if (typeof img != 'string') {
				return URL.createObjectURL(img)
			}
			return img
		}

		const [fileLocaleUrl, setFileLocaleUrl] = useState(null)

		const handleFileChange = (files) => {
			const file = files[0]
			if (file) {
				setFileLocaleUrl(file && window.URL.createObjectURL(file))
				other.setFieldValue(other.label, file)
			}
		}

		return (
			<>
				{/* <div className={styles.file}>
					<img
						className={styles.uploadImage}
						src={
							fileLocaleUrl ||
							getImgUrl(other.defaultData[other.name]) ||
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
							accept="image/*, image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
							type="file"
						/>
					</Button>
				</div> */}
				<Grid
					style={{
						display: 'flex',
						position: 'relative',
					}}
					container
				>
					<Grid
						item
						sm={getImgUrl(other.defaultData[other.name]) ? 6 : 12}
						xs={12}
					>
						<h3 style={{ margin: 0 }}>{other.label}</h3>
						<DropZone
							name={other.name}
							onChange={(e) => handleFileChange(e)}
							multiple={false}
							accept={
								'image/*, image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp'
							}
						/>
					</Grid>
					<Grid
						display={'flex'}
						item
						sm={6}
						xs={12}
						position="relative"
						marginTop={3}
						justifyContent="center"
						alignItems={'center'}
					>
						<Image
							width={250}
							height={250}
							objectFit="contain"
							objectPosition={'center center'}
							src={fileLocaleUrl || getImgUrl(other.defaultData[other.name])}
							alt={other.label}
						/>
					</Grid>
				</Grid>
			</>
		)
	}

	return <TextField {...other} />
}

export default Field
