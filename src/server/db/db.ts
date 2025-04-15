import * as authSchema from "@/server/db/schema/auth";
import * as eventSchema from "@/server/db/schema/event";
import * as teamSchema from "@/server/db/schema/team";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { serverEnv } from "../serverConsts";

const globalForDb = globalThis as unknown as {
  client: postgres.Sql | undefined;
};

const client =
  globalForDb.client ?? postgres(serverEnv.DATABASE_URL, { prepare: false });

if (process.env.NODE_ENV === "development") globalForDb.client = client;

export const db = drizzle({
  client,
  schema: {
    // Add here the db schemas
    ...authSchema,
    ...eventSchema,
    ...teamSchema,
  },
});
