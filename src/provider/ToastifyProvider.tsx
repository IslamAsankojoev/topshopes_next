import { FC } from 'react'
import { ToastContainer } from 'react-toastify'

const ToastifyProvider: FC = () => {
	return (
		<ToastContainer
			position="bottom-right"
			autoClose={1500}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover={true}
			theme="dark"
			className={'topshopes-toast'}
			style={{
				fontSize: '14px',
				fontWeight: 400,
				borderRadius: '8px',
				padding: '.5rem',
			}}
		/>
	)
}

export default ToastifyProvider
