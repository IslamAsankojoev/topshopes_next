/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Divider, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { ComponentPropsWithoutRef, FC, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Small } from './Typography'

// @ts-ignore
export interface DropZoneProps extends ComponentPropsWithoutRef<'input'> {
	onChange?: (files: []) => void
	title?: string
	imageSize?: string
	error?: boolean
	helperText?: boolean
	accept?: string
}

const DropZone: FC<DropZoneProps> = (props) => {
	const { t } = useTranslation('admin')
	const {
		helperText = '',
		error = false,
		onChange,
		title: titleProps,
		accept,
		...other
	} = props
	const [title, setTitle] = useState('')

	const onDrop = useCallback((acceptedFiles) => {
		if (onChange) {
			onChange(acceptedFiles)
			setTitle(acceptedFiles[0]?.name)
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: true,
		accept: accept,
		maxFiles: 5,
	})

	return (
		<Box
			py={2}
			display="flex"
			height="100%"
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
			<Typography
				mb={1}
				color="black.900"
				fontSize={12}
				width={150}
				textOverflow="ellipsis"
				overflow="hidden"
			>
				{title || t('dragAndDrop')}
			</Typography>

			<Divider
				sx={{
					'::before, ::after': {
						borderColor: 'grey.300',
						width: 40,
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
				sx={{ px: 2.3, my: 1 }}
			>
				{t('selectImage')}
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
