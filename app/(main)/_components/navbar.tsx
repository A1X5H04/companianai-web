"use client";

import ProSubscriptionModal from "@/components/pro-subscription-modal";
import { useDisclosure } from "@nextui-org/modal";
import ThemeSwitcher from "@/components/theme-switcher";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { List, Sparkle } from "@phosphor-icons/react";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Divider } from "@nextui-org/divider";

interface NavbarProps {
  isProUser: boolean;
}

function Navbar({ isProUser }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const routes = [
    {
      name: "Home",
      href: "/",
      pro: false,
    },
    {
      name: "Create",
      href: "/companion/new",
      pro: true,
    },
    {
      name: "Settings",
      href: "/settings",
      pro: false,
    },
  ];

  const onNavigate = (href: string, isPro: boolean) => {
    if (isPro && !isProUser) {
      onOpen();
      return;
    }

    router.push(href);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-2 py-5 w-full mx-auto">
        <div className="flex items-center gap-x-5">
          <button className="block md:hidden">
            <List size={24} />
          </button>
          <div className="inline-flex gap-x-1 items-start">
            <h3 className="text-2xl font-extrabold">Companian AI.</h3>
            <div className="text-tiny uppercase font-bold bg-gradient-to-tr from-cyan-600 to bg-fuchsia-500 rounded-small py-0.5 px-1 text-white">
              Pro
            </div>
          </div>
          <nav className="hidden md:flex ml-8 gap-x-5">
            {routes.map((route) => (
              <button
                onClick={() => onNavigate(route.href, route.pro)}
                className={twMerge(
                  "cursor-pointer py-1 px-2 rounded-medium hover:bg-content2",
                  pathname === route.href
                    ? "text-content2-foreground bg-content2 font-bold"
                    : "text-gray-500"
                )}
                key={route.href}
              >
                {route.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {!isProUser && (
            <Button
              onClick={onOpen}
              variant="shadow"
              className="bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-600 font-bold text-white"
            >
              Upgrade <Sparkle weight="fill" />
            </Button>
          )}
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <ProSubscriptionModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default Navbar;
