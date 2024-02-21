"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="h-full w-full">
      <ThemeProvider attribute="class" enableSystem>
        {children}
        <Toaster />
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default UIProvider;
