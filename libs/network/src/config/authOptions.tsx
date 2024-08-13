import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  UserLoginDocument,
  RegistUserwithProviderDocument,
} from "@spotfinder2/network/src/gql/generated";
import { fetchGraphQL } from "../../fetch";
import * as jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { AuthProviderType } from "@spotfinder2/network/src/gql/generated";
const secureCookies = process.env.NEXTAUTH_URL?.startsWith("https://");
const hostName = new URL(process.env.NEXTAUTH_URL || "").hostname;
const rootDomain = "vercel.app";
console.log("link:" + process.env.NEXTAUTH_URL);
console.log("hostName:" + hostName);
console.log("rootDomain:" + rootDomain);
const MAX_AGE = 1 * 24 * 24 * 60;

export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    // Google OAuth provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile",
        },
      },
    }),
    // Credentials provider configuration for email/password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Authorize function to validate user credentials
      async authorize(credentials) {
        // Implement credential validation logic
        console.log("Credentials");
        if (!credentials) {
          console.error("Credentials is undefined");
          throw new Error("Email or Password is required!");
        }
        const { email, password } = credentials;
        if (!email || !password) {
          console.error("Email or Password is empty");
          throw new Error("Email or Password is incorrect!");
        }
        try {
          const { data, error } = await fetchGraphQL({
            document: UserLoginDocument,
            variables: { userLoginInput: { email, password } },
          });
          if (!data?.userLogin.token || error) {
            console.error(
              "Authetication failed: Invalid credientials or user or not found!",
            );
            throw new Error(
              "Authetication failed: Invalid credientials or user or not found!",
            );
          }
          const uid = data.userLogin.user.uid;
          const name = data.userLogin.user.name;
          const image = data.userLogin.user.image;
          return {
            id: uid,
            name,
            image,
            email,
          };
        } catch (error) {
          console.error(
            "Authetication failed: Invalid credientials or user or not found!",
          );
          throw new Error(
            "Authetication failed: Invalid credientials or user or not found!",
          );
        }
      },
    }),
  ],

  // Enable debug mode for development
  debug: process.env.NODE_ENV === "development",
  // Configure session settings
  session: {
    strategy: "jwt",
    maxAge: MAX_AGE,
  },

  // Configure JWT settings
  jwt: {
    maxAge: MAX_AGE,
    // Custom JWT encoding function
    async encode({ token, secret }): Promise<string> {
      // Implement custom JWT encoding logic
      if (!token) {
        console.error("Token is undefined");
        throw new Error("Token is undefined");
      }
      const { sub, ...tokenProps } = token;
      // Get the current date in seconds since the epoch
      const nowInSeconds = Math.floor(Date.now() / 1000);
      // Calculate the expiration timestamp
      const expirationTimestamp = nowInSeconds + MAX_AGE;
      return jwt.sign(
        { uid: sub, ...tokenProps, exp: expirationTimestamp },
        secret,
        {
          algorithm: "HS256",
        },
      );
    },
    // Custom JWT decoding function
    async decode({ token, secret }): Promise<JWT | null> {
      // Implement custom JWT decoding logic
      if (!token) {
        throw new Error("Token is undefined");
      }

      try {
        const decodedToken = jwt.verify(token, secret, {
          algorithms: ["HS256"],
        });
        return decodedToken as JWT;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
      // ...
    },
  },
  cookies: {
    sessionToken: {
      name: `${secureCookies ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: secureCookies,
        domain: hostName === "localhost" ? hostName : "." + rootDomain, // add a . in front so that subdomains are included
      },
    },
  },

  // Configure callback functions
  callbacks: {
    // Sign-in callback
    async signIn({ user, account }) {
      // Implement sign-in logic, e.g., create user in database
      if (account?.provider == "google") {
        const { id, name, image } = user;
        try {
          const {} = await fetchGraphQL({
            document: RegistUserwithProviderDocument,
            variables: {
              registWithProviderInput: {
                uid: id,
                type: AuthProviderType.Google,
                image,
                name: name || "",
              },
            },
          });
        } catch (error) {
          console.error("Failed to register user with provider:", error);
          return false;
        }
      }
      return true;
    },
    // Session callback
    async session({ token, session }) {
      // Customize session object based on token data
      if (token) {
        session.user = {
          image: token.picture,
          uid: (token.uid as string) || "",
          email: token.email,
          name: token.name,
        };
      } else {
        console.log("Token is undefined");
      }
      return session;
      // ...
    },
  },
  // Configure custom pages
  pages: {
    signIn: "/signIn",
  },
};

export const getAuth = () => getServerSession(authOptions);
