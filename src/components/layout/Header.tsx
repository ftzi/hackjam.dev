import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Logo } from "@/components/utils/Logo";
import Link from "next/link";
import React from "react";
import { AuthSection } from "./AuthSection";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-20">
        <Logo />

        <NavigationMenu className="px-8">
          <NavigationMenuList>
            {[
              { name: "Events", href: "/" },
              { name: "Teams", href: "/teams" },
              { name: "About", href: "/about" },
            ].map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <AuthSection />
      </div>
    </header>
  );
}

export default Header;
