import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/dbconnect';
import userModel from '@/models/user';
import { User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }: { user: NextAuthUser }) {
      await dbConnect(); // Ensure DB connection

      // Check if the user exists in the database
      const existingUser = await userModel.findOne({ email: user.email });
      if (!existingUser) {
        // If the user does not exist, create a new one
        await userModel.create({
          username: user.name, // Use the name from the Google profile
          email: user.email,
          password: '', // Password isn't used for OAuth logins like Google
        });
      }

      return true;
    },

    async session({ session, token }: { session: any, token: JWT }) {
      await dbConnect();

      // Attach the user ID from the token to the session object
      const user = await userModel.findOne({ email: session.user?.email });
      if (user && user._id) {
        session.user.id = user._id.toString(); // Ensure _id is string
      }
      return session;
    },

    async jwt({ token, user }: { token: JWT, user?: NextAuthUser }) {
      await dbConnect();

      // Attach the user ID to the token for subsequent requests
      if (user) {
        const dbUser = await userModel.findOne({ email: user.email });
        if (dbUser && dbUser._id) {
          token.id = dbUser._id.toString(); // Ensure _id is string
        }
      }
      return token;
    },
  },

};

export default NextAuth(authOptions);
