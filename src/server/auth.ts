import { env } from "@/lib/consts";
import * as authSchema from "@/server/db/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/db";

export const auth = betterAuth({
  baseURL: env.NEXT_PUBLIC_URL,
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: authSchema,
  }),
  user: {
    additionalFields: {},
  },
});
