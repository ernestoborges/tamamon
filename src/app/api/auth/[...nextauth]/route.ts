
import User from "@/lib/models/user.model"
import { connectToDB } from "@/lib/mongoose"
import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"


const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials: Record<never, string> | undefined) {

                const { username, password } = credentials as {
                    username: string,
                    password: string,
                }

                try {
                    await connectToDB();
                    const user = await User.findOne({ username }).select("+password")
                    if (!user) return null;
                    console.log(user.password)
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) return null;

                    return user

                } catch (error) {
                    console.log(`Authentication error: ${error}`)
                }
            },

        })
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    username: user.username
                }
            }
            return token;
        },
        async session({ session, token }) {

            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                }
            }
            return session;
        },
    },

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }