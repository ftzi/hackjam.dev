export const serverEnv = {
  DATABASE_URL: process.env.DATABASE_URL ?? "MISSING_DATABASE_URL",
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
};
