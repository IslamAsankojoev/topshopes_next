import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from 'api/services/auth/auth.service'
import { ILogin, IRegister } from './user.interface'
import Cookie from 'js-cookie'
import { toast } from 'react-toastify'

// // register
// export const register = createAsyncThunk(
// 	'auth/register',
// 	async ({ email, password, phone }: IRegister) => {
// 		try {
// 			const response = await AuthService.register({ email, phone, password })
// 			toast.success('Register success')
// 			return response
// 		} catch (error) {
// 			throw error
// 		}
// 	}
// )

// // login
// export const login = createAsyncThunk(
// 	'auth/login',
// 	async ({ email, password }: ILogin) => {
// 		try {
// 			const response = await AuthService.login({ email, password })
// 			toast.success('Login success')
// 			return response
// 		} catch (error) {
// 			throw error
// 		}
// 	}
// )

// logout
export const logout = createAsyncThunk('auth/logout', async () => {
	try {
		await AuthService.logout()
	} catch (error) {
		throw error
	}
})

// refresh
export const checkAuth = createAsyncThunk('auth/refresh', async () => {
	try {
		const response = await AuthService.refresh()
		return response
	} catch (error) {
		throw error
	}
})

// profile
export const profile = createAsyncThunk('auth/profile', async () => {
	try {
		const response = await AuthService.profile()
		return response
	} catch (error) {
		throw error
	}
})

export const update = createAsyncThunk(
	'auth/profile/update',
	async (data: any) => {
		try {
			const response = await AuthService.update(data)
			return response
		} catch (error) {
			throw error
		}
	}
)
