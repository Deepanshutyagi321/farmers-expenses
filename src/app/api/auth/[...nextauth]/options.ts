import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/dbconnect';
import userModel from '@/models/user';
import { User as NextAuthUser, Session } from "next-auth";
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
      await dbConnect();

      const existingUser = await userModel.findOne({ email: user.email });
      if (!existingUser) {
        await userModel.create({
          username: user.name,
          email: user.email,
          password: '',
        });
      }

      return true;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      await dbConnect();
      const user = await userModel.findOne({ email: session.user?.email });
      if (user && user._id) {
        session.user.id = user._id.toString();
      }
      return session;
    },

    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      await dbConnect();

      if (user) {
        const dbUser = await userModel.findOne({ email: user.email });
        if (dbUser && dbUser._id) {
          token.id = dbUser._id.toString();
        }
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);

