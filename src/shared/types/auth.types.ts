import { NextPage } from 'next'

type getLayout = (page: React.ReactNode) => React.ReactNode

export type TypeRoles = {
	isOnlyAuth?: boolean
	isOnlyAdmin?: boolean
	isOnlySeller?: boolean
	isOnlyClient?: boolean
}

export type NextPageAuth<P = {}> = NextPage<P> &
	TypeRoles & { getLayout?: getLayout }

export type TypeComponentAuthFields = { Component: TypeRoles }
