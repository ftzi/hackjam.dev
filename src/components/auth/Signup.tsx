"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { mainPage } from "@/lib/consts";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { PasswordInput } from "../ui/password-input";

export const SignUpContent = () => {
  const [name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const successUrl = useSearchParams().get("redirect") || mainPage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authClient.signUp.email(
      {
        email,
        password,
        name: `${name}`,
      },
      {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          toast.error("Error", {
            description: ctx.error.message ?? ctx.error.statusText,
          });
        },
        onSuccess: async () => {
          router.push(successUrl);
        },
      },
    );
  };

  return (
    <form className="grid gap-4 w-70" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="first-name">Name</Label>
        <Input
          id="first-name"
          placeholder="Max"
          required
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          value={name}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          "Create an account"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Already have an account?{" "}
        <Link
          href={{
            pathname: "/login",
            query: { redirect: useSearchParams().get("redirect") },
          }}
          className="text-primary hover:underline"
          replace={true}
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export const SignUp = () => {
  return (
    <Card className="z-50 rounded-md rounded-t-none !max-w-fit">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpContent />
      </CardContent>
    </Card>
  );
};
