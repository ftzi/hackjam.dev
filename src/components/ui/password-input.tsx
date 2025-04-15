"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";

export const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        placeholder="Password"
        autoComplete="password"
        {...props}
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
      />
      {showPassword ? (
        <EyeOffIcon
          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer"
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <EyeIcon
          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer"
          onClick={() => setShowPassword(true)}
        />
      )}
    </div>
  );
};
