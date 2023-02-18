import Cookie from 'js-cookie'
import { setCookie } from 'cookies-next'
import { IUser } from 'src/shared/types/user.types'
import { ITokens } from 'src/store/user/user.interface'

export const saveToken = (data: ITokens) => {
	if (data.access) {
		Cookie.set('token', data.access)
	}
	if (data.refresh) {
		setCookie( 'refresh', data.refresh , {
			maxAge: 60 * 60 * 24 * 30,
			path: '/',
			httpOnly: true,
		})
	}
}

export const removeToken = () => {
	Cookie.remove('token')
	Cookie.remove('refresh')
}

export const saveUser = (user: IUser) => {
	Cookie.set('user', JSON.stringify(user))
}

export const saveToStorage = (data) => {
	localStorage.setItem('user', JSON.stringify(data))
}
