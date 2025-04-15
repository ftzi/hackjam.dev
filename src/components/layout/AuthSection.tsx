"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import type { User } from "@/server/auth";
import Link from "next/link";

export const SignoutMenuItem = () => {
  return (
    <DropdownMenuItem
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              window.location.href = "/";
            },
          },
        })
      }
    >
      Log out
    </DropdownMenuItem>
  );
};

export function AccountDropdownMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="ml-1.25">
          Hello, {user.name}!
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Profile</DropdownMenuItem>
        <SignoutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const AuthSection = () => {
  const session = authClient.useSession();

  return (
    <div
      className={`flex justify-end transition-opacity duration-300 min-w-[200px] ${
      !session.isPending ? "opacity-100" : "opacity-0"
      }`}
    >
      {session.data ? (
      <div className="flex justify-end w-full">
        <AccountDropdownMenu user={session.data.user} />
      </div>
      ) : (
      <div className="flex items-center justify-end w-full">
        <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
        </div>
      </div>
      )}
    </div>
  );
};
