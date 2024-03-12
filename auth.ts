import type { NextAuthConfig } from "next-auth";
import nextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import Github from "next-auth/providers/github";

const config = {
  // secret: process.env.AUTH_SECRET,
  providers: [Google],
  pages: {
    signIn: "/auth/login",
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
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = nextAuth(config);
