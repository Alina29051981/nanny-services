import { useEffect, useState } from "react";

export const themes = [
  "primary-blue",
  "accent-red",
  "deep-teal",
] as const;

export type Theme = typeof themes[number];

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("primary-blue");

  // 🔥 ініціалізація
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme && themes.includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  // 🔥 перемикання по черзі
  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return {
    theme,
    toggleTheme,
  };
};