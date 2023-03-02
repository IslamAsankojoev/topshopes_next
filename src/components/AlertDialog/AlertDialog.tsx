import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { darken } from '@mui/system'
import { useEffect, useState } from 'react'
import { dynamicLocalization } from 'src/utils/Translate/dynamicLocalization'

type AlertDialogProps = {
	title?: string
	description?: string
	opened: boolean
	handleConfirm?: () => void
	handleClose?: () => void
	style?: 'success' | 'error' | 'warning' | 'info'
}

const AlertDialog = ({
	title,
	description,
	opened,
	handleConfirm,
	handleClose,
	style = 'error',
}) => {
	const handleCloseEvent = (agree?: boolean) => {
		handleClose()
		if (agree) handleConfirm()
	}

	return (
		<div>
			<Dialog
				open={opened}
				onClose={handleCloseEvent}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title" color={style}>
					<Typography fontSize="20px" fontWeight="600" textAlign="center">
						{title || 'Are you sure?'}
					</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{description ||
							'Are you sure you want this? think again before confirming it.'}
					</DialogContentText>
				</DialogContent>
				<DialogActions
					sx={{
						justifyContent: 'center',
						marginBottom: '10px',
					}}
				>
					<Button
						onClick={() => {
							handleCloseEvent()
						}}
						color="error"
						variant="contained"
					>
						{dynamicLocalization({
							en: 'Cancel',
							ru: 'Отмена',
							kg: 'Жокко чыгаруу',
							kz: 'Болдырмау',
							tr: 'İptal',
						})}
					</Button>
					<Button
						onClick={() => handleCloseEvent(true)}
						color="success"
						variant="contained"
						sx={{
							borderRadius: '5px',
						}}
					>
						{dynamicLocalization({
							en: 'Confirm',
							ru: 'Подтвердить',
							kg: 'Тасдыкла',
							kz: 'Растау',
							tr: 'Onayla',
						})}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default AlertDialog
