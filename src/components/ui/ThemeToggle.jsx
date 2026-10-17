import useTheme from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="rounded-lg border border-gray-300
        bg-white px-4 py-2 text-gray-800
        transition-colors hover:bg-gray-100
        dark:border-gray-700 dark:bg-gray-800
        dark:text-white dark:hover:bg-gray-700"
    >
      {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
    </button>
  );
}
