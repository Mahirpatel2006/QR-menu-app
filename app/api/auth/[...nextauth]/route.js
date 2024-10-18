// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your-email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const client = await clientPromise;
          const db = client.db();

          const user = await db.collection('users').findOne({ email });

          if (!user) {
            throw new Error('No user found with this email');
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error('Incorrect password');
          }

          // If credentials are valid, return the user object
          return { id: user._id, email: user.email, name: user.name };
        } catch (error) {
          console.error('Error in authorize function:', error);
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      // Include user id in the session object
      session.user.id = token.id; // Add user ID to session if you want
      return session;
    },
    async jwt({ token, user }) {
      // Add user to the token right after sign in
      if (user) {
        token.id = user.id; // Ensure that user ID is included in the token
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt', // Use JWT for sessions
  },
};

// Default handler export for all HTTP methods
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
