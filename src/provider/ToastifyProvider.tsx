import { useTypedSelector } from 'hooks/useTypedSelector'
import lodash from 'lodash'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastifyProvider: React.FC = () => {
	const user = useTypedSelector((state) => state.userStore.user)

	return user?.is_superuser ? (
		<ToastContainer
			position="bottom-right"
			autoClose={1000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="dark"
			className={'topshopes-toast'}
			style={{
				fontSize: '14px',
				fontWeight: 400,
				borderRadius: '8px',
				padding: '.5rem',
			}}
		/>
	) : null
}

export default ToastifyProvider
