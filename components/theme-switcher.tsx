"use client";
import { Button } from "@nextui-org/button";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme.resolvedTheme);

  const toggleTheme = () => {
    if (currentTheme === "light") {
      setCurrentTheme("dark");
      theme.setTheme("dark");
    } else {
      setCurrentTheme("light");
      theme.setTheme("light");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Button onClick={toggleTheme} isIconOnly>
        {currentTheme === "dark" ? (
          <Sun weight="fill" />
        ) : (
          <Moon weight="fill" />
        )}
      </Button>
    </div>
  );
}

export default ThemeSwitcher;
