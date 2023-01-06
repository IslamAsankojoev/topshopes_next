import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const ReloadButton = () => {
	const { replace, asPath } = useRouter()

	return (
		<Button
			sx={{
				position: 'fixed',
				bottom: '20px',
				left: '20px',
				padding: '10px',
				backgroundColor: 'rgba(255,255,255,0.8)',
				borderRadius: '5px',
				cursor: 'pointer',
				boxShadow: '0 0 10px rgba(0,0,0,0.2)',
				zIndex: 9999999,
				'&:hover': {
					backgroundColor: 'white',
					boxShadow: '0 0 10px rgba(0,0,0,0.6)',
				},
			}}
			onClick={() => replace(asPath, asPath, { shallow: true })}
		>
			Reload
		</Button>
	)
}

export default ReloadButton
