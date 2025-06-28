import React, { useState } from "react";
import { Search, Settings, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import SearchAndFilters from "./SearchAndFilters";
import { FilterOptions, ViewMode } from "../types";

interface HeaderProps {
  onOpenPreferences: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const Header: React.FC<HeaderProps> = ({
  onOpenPreferences,
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 space-x-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              NewsHub
            </h1>
          </div>

          {/* Search and Filters - visible only on md+ */}
          <div className="hidden md:block w-full mt-6">
            <SearchAndFilters
              filters={filters}
              onFiltersChange={onFiltersChange}
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
            />
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            <button
              onClick={onOpenPreferences}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Preferences"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
            <SearchAndFilters
              filters={filters}
              onFiltersChange={onFiltersChange}
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
            />

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  onOpenPreferences();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 p-3 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Preferences</span>
              </button>

              <button
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 p-3 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
                <span>
                  Switch to {theme === "light" ? "dark" : "light"} mode
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
