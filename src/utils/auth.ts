import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { AuthOptions, getServerSession } from "next-auth";
import bcrypt from 'bcryptjs'
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {

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

                    const user = await User.findOne({ username }).select("+password");
                    if (!user) return null;

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
                    _id: user._id
                }
            }
            return token;
        },
        async session({ session, token }) {

            return {
                ...session,
                user: {
                    ...session.user,
                    _id: token._id,
                }
            }
            return session;
        },
    },

}

export const getAuthSession = () => getServerSession(authOptions);