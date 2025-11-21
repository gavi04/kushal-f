import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authoptions = {
  providers: [
    Google({
      clientId:process.env.NEXT_AUTH_GOOGLE_ID,
      clientSecret:process.env.NEXT_AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          // Try to register user via users-permissions plugin (public endpoint)
          // If user already exists, Strapi will return an error which we'll handle
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_STRAPI}/api/auth/local/register`,
              {
                email: user.email,
                username: user.email.split('@')[0] + '_' + Date.now(), // Ensure unique username
                password: Math.random().toString(36).slice(-12) + 'A1!', // Random strong password
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log("Google user registered successfully:", response.data.user);
          } catch (registerError) {
            // If error is "Email or Username are already taken", user exists - that's fine
            if (registerError.response?.data?.error?.message?.includes("already taken")) {
              console.log("Google user already exists");
            } else {
              // Some other error occurred during registration
              throw registerError;
            }
          }

          return true;
        } catch (error) {
          console.error(
            "Error storing Google user in Strapi:",
            error.response?.data || error.message
          );
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.phone) {
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.phone) {
        session.user.phone = token.phone;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
