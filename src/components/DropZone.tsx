/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Divider } from '@mui/material'
import React, { ComponentPropsWithoutRef, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { H5, Small } from './Typography'

// @ts-ignore
export interface DropZoneProps extends ComponentPropsWithoutRef<'input'> {
	onChange?: (files: []) => void
	title?: string
	imageSize?: string
	error?: boolean
	helperText?: boolean
}

const DropZone: React.FC<DropZoneProps> = (props) => {
	const {
		helperText = '',
		error = false,
		onChange,
		title: titleProps,
		...other
	} = props
	const [title, setTitle] = React.useState(titleProps)

	const onDrop = useCallback((acceptedFiles) => {
		if (onChange) {
			onChange(acceptedFiles)
			setTitle(acceptedFiles[0]?.name)
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: true,
		accept: '.jpeg,.jpg,.png,.gif',
		maxFiles: 5,
	})

	return (
		<Box
			py={2}
			display="flex"
			height="100%"
			// minHeight="100px"
			alignItems="center"
			borderRadius="10px"
			border="1.5px dashed"
			flexDirection="column"
			borderColor="grey.300"
			justifyContent="center"
			textAlign="center"
			bgcolor={error ? '#fff7f7' : 'grey.100'}
			sx={{
				transition: 'all 250ms ease-in-out',
				outline: 'none',
			}}
			{...getRootProps()}
		>
			<input {...other} {...getInputProps()} />
			<H5 mb={1} color="grey.600">
				{title || 'Drag & drop product image here'}
			</H5>

			<Divider
				sx={{
					'::before, ::after': {
						borderColor: 'grey.300',
						width: 70,
					},
				}}
			>
				<Small color="text.disabled" px={1}>
					OR
				</Small>
			</Divider>

			<Button
				type="button"
				variant="outlined"
				color={error ? 'error' : 'info'}
				sx={{ px: 4, my: 1 }}
			>
				Select image
			</Button>
			<p
				style={{
					color: 'red',
					margin: '0',
					padding: '0',
				}}
			>
				{helperText}
			</p>
		</Box>
	)
}

export default DropZone
