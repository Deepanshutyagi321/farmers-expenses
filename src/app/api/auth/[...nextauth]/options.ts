import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/dbconnect';
import userModel from '@/models/user';
import { User as NextAuthUser, Session } from "next-auth";


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

    async session({ session}: { session: Session;  }) {
      await dbConnect();
      const user = await userModel.findOne({ email: session.user?.email });
      if (user && user._id) {
        session.user.id = user._id.toString();
      }
      return session;
    },

  },
};

export default NextAuth(authOptions);

