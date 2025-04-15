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

  // TODO
  // const { user } = session;
  // if (user.role === "admin")
  //   return NextResponse.next();

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  /**
   * This matcher makes the `authMiddleware` function to be run for all for all the routes
   * except the ones defined inside that parenthesis.
   *
   * Note that: You don't necessarily need to put all the public routes on it. In the
   * `authMiddleware` we double check if it's public or not. By not running the middleware in this case,
   * a few (~1-2) milliseconds are expected to be saved.
   *
   * Then:
   *
   * 1) If the route is not public, we require the user to be authed. If the user is not authed,
   * they are redirected to the auth page.
   *
   * 2) If the user is authed, we check if the user has the permissions (role and plan) to access that route.
   * If not, the user is redirected to Home.
   *
   * The `^$` in the end makes the middleware to not run in the home route as well.
   *
   * Due to Next.js limitations, this `matcher` can not have dynamic values --
   * we can not put a const there or run some logic, it will complain when you run!.
   */
  // The `icon` is for any .svg that is automatically parsed by svgr.
  // The `script.js` is for umami.
  // Change the final `.+` to `.*` to also run the middleware for the `/` route.
  matcher: ["/(create-event)"],
};
