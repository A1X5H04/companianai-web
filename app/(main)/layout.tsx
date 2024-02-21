import React from "react";
import Navbar from "./_components/navbar";
import { checkSubscription } from "@/lib/subscription";

interface MainLayoutProps {
  children: React.ReactNode;
}

async function MainLayout({ children }: MainLayoutProps) {
  const isProUser = await checkSubscription();

  return (
    <div className="px-8">
      <Navbar isProUser={isProUser} />
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
