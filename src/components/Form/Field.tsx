import {
	Autocomplete,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	IconButton,
	InputAdornment,
	MenuItem,
	Switch,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Tooltip,
	Typography,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DropZone from 'src/components/DropZone'
import LazyImage from 'src/components/LazyImage'
import MultipleSelect from 'src/components/multiple-select/MultipleSelect'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FC, memo, useState } from 'react'

import styles from './Field.module.scss'
import getTypeOfFile from 'src/utils/getTypeOfFile'
import Percentege from './Percentege'
import PhoneNumberMask from './PhoneNumberMask'
import { toast } from 'react-toastify'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import HelpIcon from '@mui/icons-material/Help'
import { localize } from 'src/utils/Translate/localize'

const DynamicTextEditor = dynamic(
	() => import('src/components/TextEditor/TextEditor'),
	{ ssr: false }
)

const Field: FC<any> = (props) => {
	const { type, ...other } = props
	const [parent, enableAnimations] = useAutoAnimate()

	if (type === 'phone') {
		return (
			<TextField
				{...other}
				label=""
				InputProps={{
					inputComponent: PhoneNumberMask as any,
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

	if (type === 'percentage') {
		return (
			<TextField
				{...other}
				onChange={(e) => {
					e.target.value = e.target.value.replace('%', '')
					other.setValue(other.name, e.target.value)
					other.trigger(other.name)
				}}
				label=""
				InputProps={{
					inputComponent: Percentege as any,
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

	if (type === 'number') {
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

	if (type === 'text') {
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
	if (type === 'text-multiline') {
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
	if (type === 'color') {
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

	if (type === 'select') {
		return (
			<TextField
				{...other}
				select
				// @ts-ignore
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

	if (type === 'autocomplete') {
		return (
			<Autocomplete
				{...other}
				label=""
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
				onChange={(_: any, newValue) => {
					other.setValue(other.name, newValue)
					other.trigger(other.name)
				}}
				disablePortal
				options={other.allNames}
				getOptionLabel={(option: {
					id: string | number
					name: string | number
				}) => option?.name}
				renderInput={(params) => (
					<TextField
						onChange={({ target }) => {
							other.setValue(other.name + '_search', target.value)
							other.trigger(other.name + '_search')
						}}
						{...params}
					/>
				)}
			/>
		)
	}

	// if (type === 'toggle') {
	// 	console.log(other.fieldValue)
	// 	return (
	// 		<ToggleButtonGroup orientation="vertical">
	// 			{other.allNames?.map((select: { id: string; name: string }) => (
	// 				<ToggleButton
	// 					key={select.name}
	// 					value={select.id}
	// 					selected={other.fieldValue.includes(select.id)}
	// 					onChange={() => {
	// 						if (other.fieldValue?.includes(select.id)) {
	// 							other.setValue(other.name, [
	// 								...other.fieldValue.filter(
	// 									(otherValue) => otherValue !== select.id
	// 								),
	// 							])
	// 							other.trigger(other.name)
	// 							return null
	// 						}

	// 						if (!!other?.fieldValue?.length) {
	// 							other.setValue(other.name, [...other?.fieldValue, select.id])
	// 							other.trigger(other.name)
	// 							return null
	// 						}

	// 						if (!other?.fieldValue?.length) {
	// 							other.setValue(other.name, [select.id])
	// 							other.trigger(other.name)
	// 							return null
	// 						}
	// 					}}
	// 				>
	// 					{select.name}
	// 				</ToggleButton>
	// 			))}
	// 		</ToggleButtonGroup>
	// 	)
	// }

	if (type === 'checkboxes') {
		return (
			<FormControl
				component="fieldset"
				sx={{
					padding: 2,
				}}
			>
				<FormLabel component="legend">
					<Typography
						fontWeight="700"
						color="grey.800"
						textTransform="capitalize"
						fontSize="16"
					>
						{other.label}
						<Tooltip
							title={localize({
								ru: 'Выберите несколько атрибутов, которые можно будет указать для каждого товара',
								tr: 'Birden fazla özellik seçebilirsiniz',
								en: 'Select multiple attributes that can be specified for each product',
								kg: 'Бир нече таалаган атрибуттарды бир нече маалыматтарга таалаган болуу мүмкүн',
								kz: 'Бір нәтижеде бірнеше атрибуттарды бірнеше мәліметтерге тағайындауға болады',
							})}
							placement="right"
						>
							<IconButton>
								<HelpIcon fontSize="small" />
							</IconButton>
						</Tooltip>
					</Typography>
				</FormLabel>
				<FormGroup row>
					{other.allNames?.map((select: { id: string; name: string }) => (
						<FormControlLabel
							control={
								<Checkbox
									checked={other.fieldValue?.includes(select.id)}
									defaultChecked={other.defaultValue?.some(
										(id) => id === select.id
									)}
									onChange={() => {
										if (other.fieldValue?.includes(select.id)) {
											other.setValue(other.name, [
												...other.fieldValue.filter(
													(otherValue) => otherValue !== select.id
												),
											])
											other.trigger(other.name)
											return null
										}

										if (!!other?.fieldValue?.length) {
											other.setValue(other.name, [
												...other?.fieldValue,
												select.id,
											])
											other.trigger(other.name)
											return null
										}

										if (!other?.fieldValue?.length) {
											other.setValue(other.name, [select.id])
											other.trigger(other.name)
											return null
										}
									}}
									name={select.name}
									sx={{
										display: 'none',
										'& + span': {
											padding: '5px 10px',
											margin: '5px 3px',
											borderRadius: 10,
											border: '1.5px solid',
											borderColor: 'grey.600',
											color: 'grey.600',
											backgroundColor: 'grey.100',
											fontWeight: 600,
										},
										'&.Mui-checked + span': {
											borderColor: 'info.600',
											color: 'info.600',
											backgroundColor: 'info.100',
											display: 'flex',
											alignItems: 'center',
										},
									}}
								/>
							}
							label={
								other.fieldValue.includes(select.id) ? (
									<>
										<CheckIcon fontSize="small" />
										{select.name}
									</>
								) : (
									select.name
								)
							}
						/>
					))}
				</FormGroup>
			</FormControl>
		)
	}

	if (type === 'autocomplete-multiple') {
		return (
			<Autocomplete
				fullWidth
				{...other}
				multiple
				onChange={(
					_: any,
					newValue: {
						id: string | number
						label: string | number
					}
				) => {
					other.setValue(other.name, newValue)
					other.trigger(other.name)
				}}
				disablePortal
				filterSelectedOptions
				options={other.allNames}
				getOptionLabel={(option: {
					id: string | number
					name: string | number
				}) => option?.name}
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
						onChange={({ target }) => {
							other.setValue(other.name + '_search', target.value)
							other.trigger(other.name + '_search')
						}}
						{...params}
					/>
				)}
			/>
		)
	}

	if (type === 'multiple-select') {
		return (
			<MultipleSelect
				allNames={other.allNames}
				defaultValues={other?.defaultValue}
				onChange={(selected) => {
					other.setValue(
						other.name,
						selected.map((id) => (isNaN(id) ? id : +id))
					)
					other.trigger(other.name)
				}}
				label={other.name}
			/>
		)
	}

	if (type == 'textEditor') {
		const [value, setValue] = useState(null)

		const onChange = (editorValue: string) => {
			setValue(editorValue)
			other.setValue(other.name, editorValue)
		}

		return (
			<DynamicTextEditor
				onChange={onChange}
				placeholder={other.label}
				value={other.defaultValue || value}
			/>
		)
	}
	if (type === 'select') {
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

	if (type === 'checkbox') {
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
			if (!img) return ''

			if (typeof img != 'string') {
				return URL?.createObjectURL(img)
			}
			return img
		}

		const [fileLocaleUrl, setFileLocaleUrl] = useState(null)
		const [fileType, setFileType] = useState(null)

		const handleFileChange = (files) => {
			const file = files[0]
			if (file.size > 2000000) {
				setFileLocaleUrl(null)
				setFileType(null)
				other.setValue(other?.name, null)
				other.trigger(other?.name)
				toast.error('Файл должен быть меньше 2 мб')
				return null
			}
			getTypeOfFile(file).then((type) => setFileType(type))
			if (file) {
				setFileLocaleUrl(file && window?.URL?.createObjectURL(file))
				other?.setValue(other?.name, file)
				other?.trigger(other?.name)
			}
		}

		return (
			<>
				<h3 style={{ textTransform: 'uppercase', margin: '15px 0 25px' }}>
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
						sm={fileLocaleUrl || getImgUrl(other?.defaultValue) ? 6 : 12}
						xs={fileLocaleUrl || getImgUrl(other?.defaultValue) ? 6 : 12}
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
					{fileLocaleUrl || getImgUrl(other?.defaultValue) ? (
						<Grid
							display="flex"
							item
							sm={6}
							xs={6}
							position="relative"
							justifyContent="center"
							alignItems="center"
						>
							{other.previewType === 'image' && (
								<Image
									layout="fill"
									objectFit="contain"
									objectPosition="center"
									src={fileLocaleUrl || getImgUrl(other?.defaultValue)}
									alt={other?.label}
								/>
							)}
							{other.previewType === 'pdf' && (
								<LazyImage src="/assets/images/pdf.png" layout="fill" />
							)}
						</Grid>
					) : null}
				</Grid>
			</>
		)
	}

	return <TextField {...other} />
}

export default memo(Field)
