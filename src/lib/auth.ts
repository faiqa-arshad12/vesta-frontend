import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type {NextAuthConfig} from "next-auth";
import {verifyCredentials} from "@/lib/mock-users";

// Generate a fallback secret for development if not set
const getSecret = () => {
  const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;

  return secret;
};

export const authConfig = {
  secret: getSecret(),
  pages: {
    signIn: "/signin",
    signOut: "/signin",
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({session, token}) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Mock login for development - replace with backend API when ready
          const user = verifyCredentials(
            credentials.email as string,
            credentials.password as string
          );

          if (!user) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name || user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {handlers, auth, signIn, signOut} = NextAuth(authConfig);
