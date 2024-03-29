import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import { connectToDatabase } from '@/utils/database';
import User from '@/models/user';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {

        async session({ session }) {
            await connectToDatabase();
            const sessionUser = await User.findOne({ email: session.user.email });

            session.user.id = sessionUser._id.toString();

            return session;
        },

        async signIn({ profile }) {
            try {
                await connectToDatabase();
                // console.log("Connected to database");

                const userExists = await User.findOne({ email: profile.email });

                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s/g, ''),
                        image: profile.picture,
                    });
                }


                return true;
            } catch (error) {
                // console.log("Error connecting to database", error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };