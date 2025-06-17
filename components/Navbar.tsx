"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import { Menu, Moon, Sun, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className="sticky top-0 z-50 w-full p-4 bg-indigo-50 dark:bg-gray-900 backdrop-blur-md border-b border-cyan-100 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-lg">
            <FaGithub className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
            ProfileIQ
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex space-x-6">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/analyze"
              className="text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Analyze
            </Link>
          </nav>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-cyan-100 dark:bg-gray-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-full">
          <div className="flex flex-col space-y-2 px-4 py-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-base font-medium transition"
            >
              Home
            </Link>
            <Link
              href="/analyze"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-base font-medium transition"
            >
              Analyze
            </Link>

            {/* Theme toggle in mobile menu */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-2 p-2 rounded-lg bg-cyan-100 dark:bg-gray-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-gray-700 transition-all duration-200 w-fit"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
