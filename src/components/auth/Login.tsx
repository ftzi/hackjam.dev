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
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "../../lib/auth-client";
import { PasswordInput } from "../ui/password-input";

export const LoginContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const successUrl = useSearchParams().get("redirect") || mainPage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: successUrl,
        rememberMe: true,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error("Error", {
            description: ctx.error.message ?? ctx.error.statusText,
          });
        },
      },
    );
  };

  return (
    <form className="grid gap-4 w-70" onSubmit={handleSubmit}>
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
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
        </div>

        <PasswordInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 size={16} className="animate-spin" /> : "Login"}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export const Login = () => {
  return (
    <Card className="!max-w-fit">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginContent />
      </CardContent>
    </Card>
  );
};
