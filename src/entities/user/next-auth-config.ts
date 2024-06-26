import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";
import { compact } from "lodash-es";
import EmailProvider from "next-auth/providers/email";
import { privateConfig } from "@/shared/config/private";
import { createUserService } from "./_services/create-user";
import { UserEntity } from "./_domain/types";

const prismaAdapter = PrismaAdapter(dbClient);

const emailToken = privateConfig.TEST_EMAIL_TOKEN
  ? {
      generateVerificationToken: () => privateConfig.TEST_EMAIL_TOKEN ?? "",
      sendVerificationRequest: () =>
        console.log("we don't send emails in test mode"),
    }
  : {};

export const nextAuthConfig: AuthOptions = {
  // adapter: prismaAdapter as AuthOptions["adapter"],
  adapter: {
    ...prismaAdapter,
    createUser: (user) => {
      return createUserService.exec({
        ...user,
        name: "Roma",
      }) as Promise<
        UserEntity & { id: string } // костыль, чтобы next-auth не выдал ошибку, тк id у меня в базе int, а он хочет string
        // но работает норм и с int
      >;
    },
  } as AuthOptions["adapter"],
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
    verifyRequest: "/auth/verify-request",
  },
  providers: compact([
    EmailProvider({
      ...emailToken,
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
