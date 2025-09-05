import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`
        relative w-16 h-8 rounded-full 
        bg-gradient-to-r from-blue-400 to-blue-500 dark:from-slate-700 dark:to-slate-800
        border border-blue-200 dark:border-slate-600
        transition-all duration-500 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:focus:ring-slate-400/50
        shadow-lg hover:shadow-xl
        group overflow-hidden
      `}
      type="button"
    >
      <span
        className={`
          absolute top-0.5 left-0.5 w-7 h-7 rounded-full 
          bg-white dark:bg-slate-900
          shadow-lg
          flex items-center justify-center
          transition-all duration-500 ease-in-out
          ${isDark ? "translate-x-8" : "translate-x-0"}
          group-hover:scale-105
        `}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300 transition-colors duration-300" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500 transition-colors duration-300" />
        )}
      </span>

      <div className="absolute inset-0 flex items-center justify-between px-2">
        <div
          className={`
          transition-all duration-500 ease-in-out
          ${isDark ? "opacity-30 scale-75" : "opacity-100 scale-100"}
        `}
        >
          <Sun className="w-4 h-4 text-white/80" />
        </div>
        <div
          className={`
          transition-all duration-500 ease-in-out
          ${isDark ? "opacity-100 scale-100" : "opacity-30 scale-75"}
        `}
        >
          <Moon className="w-4 h-4 text-white/80" />
        </div>
      </div>

      <div
        className={`
        absolute inset-0 rounded-full
        transition-opacity duration-500
        ${
          isDark
            ? "bg-gradient-to-r from-slate-600/20 to-slate-700/20"
            : "bg-gradient-to-r from-blue-300/20 to-blue-400/20"
        }
      `}
      />
    </button>
  );
}
