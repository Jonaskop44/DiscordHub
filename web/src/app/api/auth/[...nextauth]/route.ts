import { NextAuthOptions } from "next-auth";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

const refreshToken = async (token: JWT): Promise<JWT> => {
  const response = await axios.post(`${BASE_URL}/auth/refresh`, {
    headers: {
      Authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  return {
    ...token,
    backendTokens: response.data,
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const response = await axios.post(`${BASE_URL}/auth/login`, {
          email: email,
          password: password,
        });

        if (response.status === 401) {
          return null;
        }

        const user = await response.data;
        return user;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
