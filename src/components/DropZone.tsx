/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Divider } from '@mui/material'
import React, { ComponentPropsWithoutRef, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { H5, Small } from './Typography'
import { File } from 'next/dist/compiled/@edge-runtime/primitives/fetch'
import styled from '@emotion/styled'
import { objToFormData } from '../utils/formData'

// @ts-ignore
export interface DropZoneProps extends ComponentPropsWithoutRef<'input'> {
	onChange?: (files: []) => void
	title?: string
	imageSize?: string
}

const DropZone: React.FC<DropZoneProps> = (props) => {
	const { onChange, title: titleProps, ...other } = props
	const [title, setTitle] = React.useState(titleProps)

	const onDrop = useCallback((acceptedFiles) => {
		if (onChange) {
			onChange(acceptedFiles[0])
			setTitle(acceptedFiles[0]?.name)
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: true,
		accept: '.jpeg,.jpg,.png,.gif',
		maxFiles: 10,
	})

	return (
		<Box
			py={4}
			px={{ md: 10, xs: 4 }}
			display="flex"
			minHeight="200px"
			alignItems="center"
			borderRadius="10px"
			border="1.5px dashed"
			flexDirection="column"
			borderColor="grey.300"
			justifyContent="center"
			textAlign="center"
			bgcolor={isDragActive ? 'grey.200' : 'grey.100'}
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
				color="info"
				sx={{ px: 4, my: 4 }}
			>
				Select file
			</Button>
		</Box>
	)
}

export default DropZone
