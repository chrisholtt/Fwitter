import bcrypt from "bcrypt"
import NextAuth, { AuthOptions, CallbacksOptions, Profile, Account } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GithubProvider from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import prisma from "@/libs/prismadb"

interface CustomCallbacksOptions extends CallbacksOptions<Profile, Account> {
  error?(error: any, req: any, res: any, next: any): Promise<void>;
}



export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
