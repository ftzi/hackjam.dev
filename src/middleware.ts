/**
 * This is a special Next.js file to setup the middleware, which runs before the request is completed.
 *
 * https://www.better-auth.com/docs/integrations/next#middleware
 *
 * https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
import "server-only";
import type { auth } from "@/server/auth";
import { betterFetch } from "@better-fetch/fetch";
import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from "next/server";

// https://www.better-auth.com/docs/concepts/typescript#inferring-types
type Session = typeof auth.$Infer.Session;

/**
 * You can uncomment/comment the console.logs for debugging.
 */
export default async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // You can comment/uncomment this line for debugging.
  console.log(`middleware run for pathname ${pathname}`);

  // https://www.better-auth.com/docs/integrations/next
  // We can replace to Node runtime later on: https://www.better-auth.com/docs/integrations/next#for-nextjs-release-1520-and-above
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  if (!session) {
    console.log(
      `User is not logged in to access the route ${request.url}. Redirecting...`,
    );

    const redirectURL = new URL("signup", request.url);
    // Add the original path as a redirect query parameter
    redirectURL.searchParams.set("redirect", pathname + request.nextUrl.search);
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/(create-event)"],
};
