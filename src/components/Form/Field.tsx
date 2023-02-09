import TaskIcon from '@mui/icons-material/Task'
import {
	Autocomplete,
	Button,
	Grid,
	InputAdornment,
	MenuItem,
	Switch,
	TextField,
	Typography,
	styled,
} from '@mui/material'
import DropZone from 'components/DropZone'
import LazyImage from 'components/LazyImage'
import { H3 } from 'components/Typography'
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

	if (type == 'number') {
		return (
			<TextField
				{...other}
				label=""
				InputProps={{
					inputMode: 'numeric',
					pattern: '[0-9]*' as any,
					startAdornment: (
						<InputAdornment position="start">
							<Typography
								fontWeight="700"
								color="grey.800"
								textTransform="capitalize"
								fontSize="16"
							>
								{other.label}
							</Typography>
						</InputAdornment>
					),
				}}
			/>
		)
	}

	if (type == 'text') {
		return (
			<TextField
				{...other}
				label=""
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Typography
								fontWeight="700"
								color="grey.800"
								textTransform="capitalize"
								fontSize="16"
							>
								{other.label}
							</Typography>
						</InputAdornment>
					),
				}}
				inputProps={{
					maxLength: other.maxLength,
				}}
			/>
		)
	}
	if (type == 'text-multiline') {
		return (
			<TextField
				label={
					<Typography
						fontWeight="700"
						color="grey.800"
						textTransform="capitalize"
						fontSize="16"
					>
						{other.label}
					</Typography>
				}
				{...other}
				multiline
				rows={4}
			/>
		)
	}
	if (type == 'color') {
		return (
			<input
				{...other}
				type={'color'}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Typography
								fontWeight="700"
								color="grey.800"
								textTransform="capitalize"
								fontSize="16"
							>
								{other.label}
							</Typography>
						</InputAdornment>
					),
				}}
			/>
		)
	}

	if (type == 'select') {
		return (
			<TextField
				{...other}
				select
				label=""
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Typography
								fontWeight="700"
								color="grey.800"
								textTransform="capitalize"
								fontSize="16"
							>
								{other.label}
							</Typography>
						</InputAdornment>
					),
				}}
			>
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
				label=""
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Typography
								fontWeight="700"
								color="grey.800"
								textTransform="capitalize"
								fontSize="16"
							>
								{other.label}
							</Typography>
						</InputAdornment>
					),
				}}
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
						label={
							<Typography
								fontWeight="700"
								color="grey.800"
								textTransform="capitalize"
								fontSize="16"
							>
								{other.label}
							</Typography>
						}
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
		return (
			<TextField
				{...other}
				select
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Typography
								fontWeight="700"
								color="grey.800"
								textTransform="capitalize"
								fontSize="16"
							>
								{other.label}
							</Typography>
						</InputAdornment>
					),
				}}
				label=""
			/>
		)
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
		return (
			<TextField
				{...other}
				type="radio"
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Typography
								fontWeight="700"
								color="grey.800"
								textTransform="capitalize"
								fontSize="16"
							>
								{other.label}
							</Typography>
						</InputAdornment>
					),
				}}
				label=""
			/>
		)
	}
	if (type == 'file') {
		const getImgUrl = (img: File | Blob | string | any) => {
			if (!img) return false

			if (typeof img != 'string') {
				return URL?.createObjectURL(img)
			}
			return img
		}

		const [fileLocaleUrl, setFileLocaleUrl] = useState(null)

		const handleFileChange = (files) => {
			const file = files[0]
			if (file) {
				setFileLocaleUrl(file && window?.URL?.createObjectURL(file))
				other?.setFieldValue(other?.name, file)
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
				<h3 style={{ textTransform: 'uppercase', margin: '10px 0 4px' }}>
					{other.label}
				</h3>
				<Grid
					style={{
						display: 'flex',
						position: 'relative',
					}}
					width="100%"
					container
				>
					<Grid
						item
						sm={
							fileLocaleUrl || getImgUrl(other?.defaultData[other?.name])
								? 6
								: 12
						}
						xs={
							fileLocaleUrl || getImgUrl(other?.defaultData[other?.name])
								? 6
								: 12
						}
					>
						<DropZone
							title={other?.name}
							error={other.error}
							helperText={other.helperText}
							style={{
								borderColor: 'red!important',
							}}
							name={other?.name}
							onChange={(e) => handleFileChange(e)}
							multiple={false}
							accept={
								other.accept ||
								'image/*, image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp'
							}
						/>
					</Grid>
					{fileLocaleUrl || getImgUrl(other?.defaultData[other?.name]) ? (
						<Grid
							display="flex"
							item
							sm={6}
							xs={6}
							position="relative"
							justifyContent="center"
							alignItems="center"
						>
							{fileLocaleUrl?.includes('.') ||
							other?.defaultData[other?.name]?.includes('.') ? (
								<Image
									layout="fill"
									objectFit="contain"
									objectPosition="center"
									src={
										fileLocaleUrl || getImgUrl(other?.defaultData[other?.name])
									}
									alt={other?.label}
								/>
							) : (
								<>
									<TaskIcon style={{ fontSize: 100 }} color="success" />
								</>
							)}
						</Grid>
					) : null}
				</Grid>
			</>
		)
	}

	return <TextField {...other} />
}

export default Field
