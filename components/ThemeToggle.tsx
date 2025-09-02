"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      {theme === "dark" ? (
        <IconSun className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      ) : (
        <IconMoon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      )}
    </button>
  );
}
