import NextAuth from "next-auth";
import { authOptions } from "@spotfinder2/network/src/config/authOptions";
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
