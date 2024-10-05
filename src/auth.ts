import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { db } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        })
    ],
    basePath: "/api/auth",
    callbacks: {
        authorized({ request, auth }) {
            try {
                const { pathname } = request.nextUrl
                if (pathname == "/protected-page") return !!auth;
                return true
            } catch (e) {
                console.log(e)
            }
        },
        jwt({ token, trigger, session }) {
            if (trigger == "update") token.name == session.user.name;
            return token
        }
    },
})
