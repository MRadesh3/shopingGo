import User from "@models/userSchema";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      async authorize(req, res) {
        const { email, password } = await req.json();

        try {
          await connectToDB();

          const userExists = await User.findOne({ email });
          if (!userExists) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            userExists.password,
            password
          );
          if (!passwordMatch) {
            return null;
          }

          const token = generateToken(userExists._id);
          if (userExists && passwordMatch) {
            const newUserExists = await User.findOne({ email }).select(
              "-password"
            );
            cookies().set("token", token, {
              path: "/",
              httpOnly: true,
              expires: new Date(Date.now() + 1000 * 86400),
            });

            return NextResponse.json({ newUserExists });
          } else {
            return NextResponse.json({ message: "Invalid email or password" });
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectToDB } from "@utils/database";
// import User from "@models/userSchema";
// import bcrypt from "bcrypt";

// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},

//       async authorize(credentials, req) {
//         const { email, password } = credentials;

//         try {
//           await connectToDB();

//           const user = await User.findOne({ email });

//           if (!user) {
//             return null;
//           }

//           const passwordMatch = await bcrypt.compare(password, user.password);

//           if (!passwordMatch) {
//             return null;
//           }

//           return user;
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       return { ...token, ...user };
//     },
//     async session({ session, token, user }) {
//       session.user = token;
//       return session;
//     },
//   },

//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
