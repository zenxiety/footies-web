import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../env.mjs";
import { prisma } from "./db";
import { ErrorCode, verifyPassword } from "../utils/auth";
import type { Role } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      roles: Role[];
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    roles: Role[];
    firstName?: string | null;
    lastName?: string | null;
    emailVerified?: Date | null;
    // ...other properties
    // role: UserRole;
  }

  interface Profile {
    given_name: string;
    family_name: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.roles = token.roles as Role[];
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
        // token.role = user.role; <-- put other properties on the token here
      }
      return token;
    },
    signIn({ user, profile }) {
      if (user.firstName == null) {
        user.firstName = profile?.given_name ?? "";
        user.lastName = profile?.family_name ?? "";
      }
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error(ErrorCode.InternalServerError);

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email.toLowerCase(),
          },
        });

        if (!user) throw new Error(ErrorCode.UserNotFound);
        if (!user.password) throw new Error(ErrorCode.DifferentProvider);

        const isPasswordCorrect = verifyPassword(
          credentials.password,
          user.password ?? ""
        );

        console.log(credentials.password, user.password);

        if (!isPasswordCorrect) throw new Error(ErrorCode.IncorrectPassword);

        return user || null;
      },
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
