import * as React from 'react'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { FormControl, InputLabel } from '@mui/material'
import {
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
	names: selectList
	chosenName: any[]
	setChosenName: React.Dispatch<React.SetStateAction<any>>
}

// Компонент принимает в себя names с типом selectList, и внутри себя меняет переданный
// в пропсах chosenName, setChosenName. В них хранится массив с id-шками типа string.
// В итоге в chosenName у нас выходит ['exampleIdsperatorExampleName', ...]

// Важно!!! Нужно chosenName перед тем как передать, нужно завернуть в функцию MultipleSelectDataFormat
const MultipleSelect: React.FC<MultipleSelectProps> = (props) => {
	const { names, label, chosenName, setChosenName, ...other } = props

	const handleChange = (e: React.ChangeEvent<any>) => {
		if (e.target.value.length > 3) {
			e.target.value.pop()
		} else if (e.target.value.length === 0) {
			return
		}
		setChosenName(
			typeof e.target.value === 'string'
				? e.target.value.split(',')
				: e.target.value
		)
	}

	return (
		<FormControl sx={{ width: '100%' }}>
			<InputLabel id={label}>{label}</InputLabel>
			<Select
				{...other}
				labelId={label}
				required
				multiple
				fullWidth
				value={chosenName}
				onChange={handleChange}
				label={label}
				input={<OutlinedInput label={label} />}
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
				{MultipleSelectDataFormat(names)?.map((name) => (
					<MenuItem key={MultipleSelectTextSplit(name)[0] + label} value={name}>
						{MultipleSelectTextSplit(name)[1]}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default MultipleSelect
