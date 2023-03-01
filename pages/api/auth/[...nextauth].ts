import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosClassic } from 'src/api/interceptor';
import { getAuthUrl } from 'src/config/api.config';





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
        const { data } = await axiosClassic.post(getAuthUrl('login/'), { email, password });
        if (data) {
          return {
            ...data,
          }
        } else {
          return null;
        }
      }
    })
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