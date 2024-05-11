import type { NextAuthConfig } from "next-auth";
import nextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

const config = {
  providers: [Google, Github],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith("/");
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    // session: ({ session, token }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: token.sub,
    //   },
    // }),
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = nextAuth(config);
