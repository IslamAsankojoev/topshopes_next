import NextAuth, { SessionStrategy } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosClassic } from 'src/api/interceptor';
import { AuthService } from 'src/api/services/auth/auth.service';

export default NextAuth({
  secret: process.env.SECRET_KEY,
  providers: [
    CredentialsProvider({
      name: 'Django',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },  
      async authorize(credentials) {
        const { email, password } = credentials;
        const data = await AuthService.login({email, password});
        if (data) {
          return {
            ...data,
            id: Math.random().toString(36).substring(7),
          }
        } else {
          return null;
        }
      }
    })
  ],
  jwt: {
    secret: process.env.SECRET_KEY,
    maxAge: 1 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    newUser: '/signup',
    error: '/login'
  },
  callbacks: {
    //@ts-ignore
    async signIn() {
      return true;
    },
    // @ts-ignore
    async jwt({token, user}) {
      if (user) {
        // @ts-ignore
        token.accessToken =  user.access;
        // @ts-ignore
        token.refreshToken = user.refresh;
      }
      return token;
    },
    // @ts-ignore
    async session({session, token}) {
      session = {
        ...session,
        user: {
          // @ts-ignore
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        }
      }
      return session;
    },
  }
});