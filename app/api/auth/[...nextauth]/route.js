import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";



const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout:4000,
      }
    }),

  ],
  callbacks: {
    // keep track of current user ,
    // with the help of session we can access / get current loggedIn user data (name,image,email)
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
      // check if user already exist
      const userExists = await User.findOne({ email: profile.email });
      // if not , create a new one
      if (!userExists) {
        await User.create({
          email: profile.email,
          // username: profile.name.replace(" ", "").toLowerCase(),
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      return true;
        
      } catch (error) {
        console.log("error whlie signing in : ",error)
        return false;      
      }
    },
  },
});

export { handler as GET, handler as POST };
