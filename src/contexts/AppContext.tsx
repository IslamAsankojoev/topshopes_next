import { createContext, FC, useContext, useEffect, useMemo, useReducer } from 'react'
import lodash from 'lodash'
import { getLocalStorage } from 'src/utils/local-storage/localStorage'


type initialState = {
	cart: CartItem[]
}

export type CartItem = {
	qty: number
	name: string
	price: number
	imgUrl?: string
	id: string | number
}

type cartActionType = {
	type: 'CHANGE_CART_AMOUNT' | 'SET_CART' | 'ADD_TO_CART' | 'REMOVE_FROM_CART'
	payload: CartItem | CartItem[]
}
type ActionType = cartActionType


const initialState = {
	cart: [],
}

interface ContextProps {
	state: initialState
	dispatch: (args: ActionType) => void
}

const AppContext = createContext<ContextProps>({
	state: initialState,
	dispatch: () => {},
})

const reducer = (state: initialState, action: ActionType) => {
	let cartList = state.cart
	let array: CartItem[] = lodash.isArray(action.payload) && action.payload
	// @ts-ignore
	let payload: CartItem = lodash.isObject(action.payload) && action.payload
	let exist = cartList.find((item) => item.id === payload.id)
	switch (action.type) {
		case 'CHANGE_CART_AMOUNT':
			if (payload.qty < 1) {
				const filteredCart = cartList.filter((item) => item.id !== payload.id)

				localStorage.setItem('cart', JSON.stringify(filteredCart))
				return { ...state, cart: filteredCart }
			}

			if (exist) {
				const newCart = cartList?.map((item) =>
					item.id === payload.id ? { ...item, qty: payload.qty } : item
				)

				localStorage.setItem('cart', JSON.stringify(newCart))
				return { ...state, cart: newCart }
			}

			return { ...state, cart: [...cartList, payload] }

		case 'ADD_TO_CART':
			if (exist) {
				const newCart = cartList?.map((item) =>
					item.id === payload.id ? { ...item, qty: item.qty + 1 } : item
				)
				localStorage.setItem('cart', JSON.stringify(newCart))
				return { ...state, cart: newCart }
			}
			return { ...state, cart: [...cartList, payload] }

		case 'SET_CART':
			return { ...state, cart: array }

		default: {
			return state
		}
	}
}

export const AppProvider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

	useEffect(() => {
		const cart: CartItem[] = getLocalStorage('cart')
		if (cart) {
			dispatch({ type: 'SET_CART', payload: cart })
		}
	}, [])

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	)
}

export const useAppContext = () => useContext<ContextProps>(AppContext)

export default AppContext
