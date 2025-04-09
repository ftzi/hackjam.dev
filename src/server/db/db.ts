import * as authSchema from "@/server/db/schema/auth";
import * as eventSchema from "@/server/db/schema/event";
import * as teamSchema from "@/server/db/schema/team";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { serverEnv } from "../serverConsts";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(serverEnv.DATABASE_URL, { prepare: false });
export const db = drizzle({
  client,
  schema: {
    // Add here the db schemas
    ...authSchema,
    ...eventSchema,
    ...teamSchema,
  },
});
