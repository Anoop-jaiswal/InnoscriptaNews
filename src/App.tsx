import { useState, useMemo } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import FilterSidebar from "./components/FilterSidebar";
import ArticleCard from "./components/ArticleCard";
import ArticleRow from "./components/ArticleRow";
import PreferencesModal from "./components/PreferencesModal";
import { FilterOptions, ViewMode, UserPreferences } from "./types";
import { mockArticles } from "./data/mockData";

function App() {
  const [filters, setFilters] = useState<FilterOptions>({
    keyword: "",
    dateRange: "all",
    category: "All Categories",
    source: "All Sources",
  });

  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    sources: [],
    categories: [],
    authors: [],
  });

  const filteredArticles = useMemo(() => {
    return mockArticles.filter((article) => {
      // Keyword filter
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        if (
          !article.title.toLowerCase().includes(keyword) &&
          !article.description.toLowerCase().includes(keyword) &&
          !article.content.toLowerCase().includes(keyword)
        ) {
          return false;
        }
      }

      // Category filter
      if (
        filters.category !== "All Categories" &&
        article.category !== filters.category
      ) {
        return false;
      }

      // Source filter
      if (
        filters.source !== "All Sources" &&
        article.source.name !== filters.source
      ) {
        return false;
      }

      // Date filter
      if (filters.dateRange !== "all") {
        const articleDate = new Date(article.publishedAt);
        const now = new Date();
        const daysDiff = Math.floor(
          (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        switch (filters.dateRange) {
          case "today":
            if (daysDiff > 1) return false;
            break;
          case "week":
            if (daysDiff > 7) return false;
            break;
          case "month":
            if (daysDiff > 30) return false;
            break;
        }
      }

      return true;
    });
  }, [filters]);

  const personalizedArticles = useMemo(() => {
    if (
      preferences.categories.length === 0 &&
      preferences.sources.length === 0
    ) {
      return filteredArticles;
    }

    return filteredArticles.filter((article) => {
      const matchesCategory =
        preferences.categories.length === 0 ||
        preferences.categories.includes(article.category);
      const matchesSource =
        preferences.sources.length === 0 ||
        preferences.sources.includes(article.source.name);
      const matchesAuthor =
        preferences.authors.length === 0 ||
        (article.author && preferences.authors.includes(article.author));

      return matchesCategory && matchesSource && matchesAuthor;
    });
  }, [filteredArticles, preferences]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header
          onOpenPreferences={() => setIsPreferencesOpen(true)}
          filters={filters}
          onFiltersChange={setFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <div className="flex">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Main Content */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {personalizedArticles.length} article
                {personalizedArticles.length !== 1 ? "s" : ""}
                {filters.keyword && <span> for "{filters.keyword}"</span>}
              </p>
            </div>

            {/* Articles Grid/List */}
            {personalizedArticles.length > 0 ? (
              <div
                className={
                  viewMode === "card"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {personalizedArticles.map((article) =>
                  viewMode === "card" ? (
                    <ArticleCard key={article.id} article={article} />
                  ) : (
                    <ArticleRow key={article.id} article={article} />
                  )
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or filters to find more
                  articles.
                </p>
              </div>
            )}
          </main>
        </div>

        <PreferencesModal
          isOpen={isPreferencesOpen}
          onClose={() => setIsPreferencesOpen(false)}
          preferences={preferences}
          onPreferencesChange={setPreferences}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
