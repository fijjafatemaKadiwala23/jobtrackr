import { useEffect, useState } from "react";

const THEME_KEY = "jt_theme";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };
}
