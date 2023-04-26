import React, { useEffect, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
function SuccessSnackbar({ toggleOpen }) {
	const [open, setOpen] = useState(false)
	const [parent, enableAnimate] = useAutoAnimate({
		easing: 'ease-out',
	})

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	useEffect(() => {
		setOpen(true)
	}, [toggleOpen])

	useEffect(() => {
		setTimeout(() => {
			setOpen(false)
		}, 1000)
	}, [open])

	return (
		<div
			style={{
				width: '35px',
				height: '35px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			ref={parent}
		>
			{open && <TaskAltIcon color="success" />}
		</div>
	)
}

export default SuccessSnackbar
