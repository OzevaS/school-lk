import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";
import { compact } from "lodash-es";
import EmailProvider from "next-auth/providers/email";
import { privateConfig } from "@/shared/config/private";

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient) as AuthOptions["adapter"],
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
    verifyRequest: "/auth/verify-request",
  },
  providers: compact([
    EmailProvider({
      server: {
        host: privateConfig.EMAIL_SERVER_HOST,
        port: Number(privateConfig.EMAIL_SERVER_PORT),
        auth: {
          user: privateConfig.EMAIL_SERVER_USER,
          pass: privateConfig.EMAIL_SERVER_PASSWORD,
        },
      },
      from: privateConfig.EMAIL_FROM,
    }),
  ]),
};
