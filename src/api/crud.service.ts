import { getErrorMessage } from 'utils/getErrorMessage';
import { toast } from 'react-toastify';
import { instance } from 'api/interceptor'


export const CRUDservice = (url: (id?: string) => string, toastText?: string) => {
    return {
        getList: async () => {
            try {
                const response = await instance.get(url(''))
                return response.data
            } catch (error) {
                toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
                throw error
            }
        },
        get: async (id: string) => {
            try {
                const response = await instance.get(url(`${id}/`))
                return response.data
            } catch (error) {
                toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
                throw error
            }
        },
        update: async (id: string | null, data: FormData | any) => {
            try {
                const response = await instance.patch(url(id ?`${id}/`:null), data)
                return response.data
            } catch (error) {
                toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
                throw error
            }
        },
        create: async (data: FormData | any) => {
            try {
                const response = await instance.post(url(''), data)
                return response.data
            } catch (error) {
                toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
                throw error
            }
        },
        delete: async (id: string) => {
            try {
                const response = await instance.delete(url(`${id}/`))
                return response.data
            } catch (error) {
                toast.error(`${toastText || 'error'}: ${getErrorMessage(error)}`)
                throw error
            }
        }
}}