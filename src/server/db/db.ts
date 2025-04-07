import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { serverEnv } from "../serverConsts";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(serverEnv.DATABASE_URL, { prepare: false });
export const db = drizzle({
  client,
  schema: {
    // Add here the db schemas
  },
});
