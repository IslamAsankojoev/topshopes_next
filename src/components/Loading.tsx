import { Backdrop, CircularProgress } from '@mui/material'

const Loading = () => {
	return (
		<Backdrop sx={{ zIndex: 100000 }} open={true}>
			<CircularProgress
				color="inherit"
				sx={{
					color: 'white',
				}}
			/>
		</Backdrop>
	)
}

export default Loading
