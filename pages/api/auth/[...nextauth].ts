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
        const {data} = await axiosClassic.post('auth/login/', { email, password });
        // const user = await AuthService.profile();
        // const data = { user, tokens, id: user.user.id };
        if (data) {
          return {...data}
        } else {
          return null;
        }
      }
    })
  ],
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