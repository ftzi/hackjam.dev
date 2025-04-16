"use server";

import { getUser } from "./auth";

export async function getUserAction() {
  return await getUser();
}
