import { authOptians } from "@/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptians);

export { handler as GET, handler as POST };
