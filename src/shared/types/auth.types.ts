import { NextPage } from 'next'
import { ReactNode } from 'react'

type getLayout = (page: ReactNode) => ReactNode

export type TypeRoles = {
	isOnlyAuth?: boolean
	isOnlyAdmin?: boolean
	isOnlySeller?: boolean
	isOnlyClient?: boolean
}

export type NextPageAuth<P = {}> = NextPage<P> &
	TypeRoles & { getLayout?: getLayout }

export type TypeComponentAuthFields = { Component: TypeRoles }
