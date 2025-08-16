"use client";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("system");

  // Apply theme whenever it changes
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      // System preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemPrefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", "system");
    }
  }, [theme]);

  // On mount, load stored theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("system");
    }
  }, []);

  return (
    <div className="flex gap-2 items-center p-4">
      <button
        className={`px-3 py-1 rounded transition ${
          theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
        }`}
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className={`px-3 py-1 rounded transition ${
          theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
        }`}
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
      <button
        className={`px-3 py-1 rounded transition ${
          theme === "system" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
        }`}
        onClick={() => setTheme("system")}
      >
        System
      </button>
    </div>
  );
}
