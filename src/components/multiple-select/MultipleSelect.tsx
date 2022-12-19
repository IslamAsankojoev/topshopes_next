import * as React from 'react'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { FormControl, InputLabel } from '@mui/material'
import {
	getIdArray,
	MultipleSelectDataFormat,
	MultipleSelectTextSplit,
} from './MultipleSelectHelper'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

type selectList = { id: string | number; name: string }[]

interface MultipleSelectProps {
	label: string
	allNames: selectList
	defaultValues: selectList
	onChange: (arr: any[]) => void
	error?: boolean
	helperText?: string
}

// через onChange можно и вытащить нужные нам данные
// пример: <MultipleSelect onChange={(values) => console.log(values)} />

const MultipleSelect: React.FC<MultipleSelectProps> = (props) => {
	const {
		allNames,
		label,
		defaultValues,
		onChange,
		error,
		helperText,
		...other
	} = props

	const [selected, setSelected] = React.useState(
		MultipleSelectDataFormat(defaultValues)
	)

	const handleChange = (e: React.ChangeEvent<any>) => {
		const value =
			typeof e.target.value === 'string'
				? e.target.value.split(',')
				: e.target.value

		if (e.target.value.length > 3) {
			e.target.value.pop()
		} else if (e.target.value.length === 0) {
			return
		}

		setSelected(value)

		if (onChange) {
			onChange(getIdArray(value))
		}
	}

	return (
		<FormControl sx={{ width: '100%' }}>
			<InputLabel id={label}>{label}</InputLabel>
			<Select
				{...other}
				labelId={label}
				multiple
				fullWidth
				value={selected}
				onChange={handleChange}
				label={label}
				input={<OutlinedInput error={error} label={label} />}
				renderValue={(selected) => (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{selected.map((value) => (
							<Chip
								key={value + label}
								label={MultipleSelectTextSplit(value)[1]}
							/>
						))}
					</Box>
				)}
				MenuProps={MenuProps}
			>
				{MultipleSelectDataFormat(allNames)?.map((name) => (
					<MenuItem key={MultipleSelectTextSplit(name)[0] + label} value={name}>
						{MultipleSelectTextSplit(name)[1]}
					</MenuItem>
				))}
			</Select>
			{helperText ? (
				<p style={{ color: 'red', fontWeight: 300, fontSize: '12px' }}>
					{helperText}
				</p>
			) : null}
		</FormControl>
	)
}

export default MultipleSelect
