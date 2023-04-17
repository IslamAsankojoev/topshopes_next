import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthService } from 'src/api/services/auth/auth.service'

export type IToken = {
	accessToken: string
	refreshToken: string
}

type IUser = {
	id: string
	email: string
	access: string
	refresh: string
}

export type ISession = {
	user: IUser
	expires: string
	accessToken: string
	refreshToken: string
}

export default NextAuth({
	secret: process.env.SECRET_KEY,
	providers: [
		CredentialsProvider({
			name: 'Django',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const { email, password } = credentials
				const data = await AuthService.login({ email, password })
				if (data) {
					return {
						...data,
						id: data.id,
					}
				} else {
					return null
				}
			},
		}),
	],

	jwt: {
		secret: process.env.SECRET_KEY,
		maxAge: 24 * 60 * 60 * 1, // 1 day
	},
	session: {
		maxAge: 24 * 60 * 60 * 1, // 1 day
	},
	pages: {
		signIn: '/login',
		signOut: '/login',
		error: '/login',
	},
	callbacks: {
		async signIn() {
			return true
		},
		// @ts-ignore
		async jwt({ token, user }: { token: IToken; user: IUser }) {
			if (user) {
				token.accessToken = user.access
				token.refreshToken = user.refresh
			}
			return token
		},
		// @ts-ignore
		async session({ session, token }: { session: ISession; token: IToken }) {
			session.accessToken = token.accessToken
			session.refreshToken = token.refreshToken
			return session
		},
	},
})
