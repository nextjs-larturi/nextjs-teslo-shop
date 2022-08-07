import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { dbUsers } from '../../../database';
import { checkUserEmailPassword } from '../../../database/dbUsers';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Teslo Account',
      type: 'credentials',
      credentials: {
        email: { label: 'Email:', type: 'email', placeholder: 'Email' },
        password: { label: 'Password:', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    })
  ],

  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  // Session
  session: {
    maxAge: 2592000, // 30 days
    strategy: 'jwt',
    updateAge: 86400, // Diario
  },

  // Callbacks
  callbacks: {

    async jwt({ token, account, user }) {
      // console.log({ token, account, user })

      if(account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'credentials':
             token.user = user;
          break;

          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '')
          break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      // console.log({ session, token, user })

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }

  }

});