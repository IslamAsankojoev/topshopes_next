/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'
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
	const { t } = useTranslation('admin')
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
			px={{ md: 10, xs: 4 }}
			display="flex"
			minHeight="100px"
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
				{title || t('dragAndDrop')}
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
					{t('or')}
				</Small>
			</Divider>

			<Button
				type="button"
				variant="outlined"
				color={error ? 'error' : 'info'}
				sx={{ px: 4, my: 1 }}
			>
				{t('selectImage')}
			</Button>
			<p
				style={{
					color: 'red',
				}}
			>
				{helperText}
			</p>
		</Box>
	)
}

export default DropZone
