import { createAuthClient } from "better-auth/react";
import { env } from "./consts";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_URL,
});
