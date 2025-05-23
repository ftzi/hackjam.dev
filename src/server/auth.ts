import { env } from "@/lib/consts";

import * as authSchema from "@/server/db/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/db";

export const auth = betterAuth({
  baseURL: env.NEXT_PUBLIC_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    minPasswordLength: 4,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: authSchema,
  }),
  user: {
    // https://www.better-auth.com/docs/concepts/database#extending-core-schema
    additionalFields: {
      about: {
        type: "string",
        required: false,
        input: false,
      },
      githubUrl: {
        type: "string",
        required: false,
        input: false,
      },
      linkedinUrl: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
});

export type User =
  | typeof authSchema.users.$inferSelect
  | typeof auth.$Infer.Session.user;

/** Returns the current logged in user. Works for Server actions and Server components */
export const getUser = async (): Promise<User | undefined> => {
  const { headers } = await import("next/headers");

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session?.user;
  } catch (error) {
    console.error("Failed to get user session:", error);
    return undefined;
  }
};
