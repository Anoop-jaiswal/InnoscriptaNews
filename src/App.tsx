// import { useState, useMemo } from "react";
// import Header from "./components/Header";
// import FilterSidebar from "./components/FilterSidebar";
// import ArticleCard from "./components/ArticleCard";
// import ArticleRow from "./components/ArticleRow";
// import PreferencesModal from "./components/PreferencesModal";
// import { FilterOptions, ViewMode, UserPreferences } from "./types";
// import { useAllNews } from "./hooks/useAllNews";

// function App() {
//   const { data = [], isLoading, isError } = useAllNews(); // ✅ safe default

//   const [filters, setFilters] = useState<FilterOptions>({
//     keyword: "",
//     dateRange: "all",
//     category: "All Categories",
//     source: "All Sources",
//   });

//   const [viewMode, setViewMode] = useState<ViewMode>("card");
//   const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
//   const [preferences, setPreferences] = useState<UserPreferences>({
//     sources: [],
//     categories: [],
//     authors: [],
//   });

//   const filteredArticles = useMemo(() => {
//     if (!data || data.length === 0) return [];

//     return data.filter((article) => {
//       if (filters.keyword) {
//         const keyword = filters.keyword.toLowerCase();
//         if (
//           !article.title.toLowerCase().includes(keyword) &&
//           !article.description.toLowerCase().includes(keyword) &&
//           !article?.content?.toLowerCase().includes(keyword)
//         ) {
//           return false;
//         }
//       }

//       if (
//         filters.category !== "All Categories" &&
//         article.category !== filters.category
//       ) {
//         return false;
//       }

//       if (
//         filters.source !== "All Sources" &&
//         article.source.name !== filters.source
//       ) {
//         return false;
//       }

//       if (filters.dateRange !== "all") {
//         const articleDate = new Date(article.publishedAt);
//         const now = new Date();
//         const daysDiff = Math.floor(
//           (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24)
//         );

//         switch (filters.dateRange) {
//           case "today":
//             if (daysDiff > 1) return false;
//             break;
//           case "week":
//             if (daysDiff > 7) return false;
//             break;
//           case "month":
//             if (daysDiff > 30) return false;
//             break;
//         }
//       }

//       return true;
//     });
//   }, [filters, data]); // ✅ added `data` here

//   const personalizedArticles = useMemo(() => {
//     if (!filteredArticles || filteredArticles.length === 0) return [];

//     if (
//       preferences.categories.length === 0 &&
//       preferences.sources.length === 0
//     ) {
//       return filteredArticles;
//     }

//     return filteredArticles.filter((article) => {
//       const matchesCategory =
//         preferences.categories.length === 0 ||
//         preferences.categories.includes(article?.category);
//       const matchesSource =
//         preferences.sources.length === 0 ||
//         preferences.sources.includes(article.source.name);
//       const matchesAuthor =
//         preferences.authors.length === 0 ||
//         (article.author && preferences.authors.includes(article.author));

//       return matchesCategory && matchesSource && matchesAuthor;
//     });
//   }, [filteredArticles, preferences]);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
//       <Header
//         onOpenPreferences={() => setIsPreferencesOpen(true)}
//         filters={filters}
//         onFiltersChange={setFilters}
//         viewMode={viewMode}
//         onViewModeChange={setViewMode}
//       />

//       <div className="flex">
//         <div className="hidden lg:block">
//           <FilterSidebar filters={filters} onFiltersChange={setFilters} />
//         </div>

//         <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
//           {/* ✅ Loading and error fallback */}
//           {isLoading && (
//             <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
//               Loading articles...
//             </p>
//           )}
//           {isError && (
//             <p className="text-center text-red-500 dark:text-red-400 mb-4">
//               Failed to fetch articles. Please try again later.
//             </p>
//           )}

//           {/* Results Count */}
//           {!isLoading && !isError && (
//             <div className="mb-6">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Showing {personalizedArticles.length} article
//                 {personalizedArticles.length !== 1 ? "s" : ""}
//                 {filters.keyword && <span> for "{filters.keyword}"</span>}
//               </p>
//             </div>
//           )}

//           {/* Articles Display */}
//           {personalizedArticles.length > 0 ? (
//             <div
//               className={
//                 viewMode === "card"
//                   ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
//                   : "space-y-6"
//               }
//             >
//               {personalizedArticles.map((article) =>
//                 viewMode === "card" ? (
//                   <ArticleCard key={article.id} article={article} />
//                 ) : (
//                   <ArticleRow key={article.id} article={article} />
//                 )
//               )}
//             </div>
//           ) : (
//             !isLoading &&
//             !isError && (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 dark:text-gray-600 mb-4">
//                   <svg
//                     className="mx-auto h-12 w-12"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                   No articles found
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   Try adjusting your search terms or filters to find more
//                   articles.
//                 </p>
//               </div>
//             )
//           )}
//         </main>
//       </div>

//       <PreferencesModal
//         isOpen={isPreferencesOpen}
//         onClose={() => setIsPreferencesOpen(false)}
//         preferences={preferences}
//         onPreferencesChange={setPreferences}
//       />
//     </div>
//   );
// }

// export default App;

// import { useState, useMemo, useEffect } from "react";
// import Header from "./components/Header";
// import FilterSidebar from "./components/FilterSidebar";
// import ArticleCard from "./components/ArticleCard";
// import ArticleRow from "./components/ArticleRow";
// import PreferencesModal from "./components/PreferencesModal";
// import { FilterOptions, ViewMode, UserPreferences } from "./types";
// import { useAllNews } from "./hooks/useAllNews";

// const ITEMS_PER_PAGE = 20;

// function App() {
//   const { data = [], isLoading, isError } = useAllNews();

//   const [filters, setFilters] = useState<FilterOptions>({
//     keyword: "",
//     dateRange: "all",
//     category: "All Categories",
//     source: "All Sources",
//   });

//   const [debouncedKeyword, setDebouncedKeyword] = useState(filters.keyword);
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedKeyword(filters.keyword);
//     }, 300);
//     return () => clearTimeout(handler);
//   }, [filters.keyword]);

//   const [viewMode, setViewMode] = useState<ViewMode>("card");
//   const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
//   const [preferences, setPreferences] = useState<UserPreferences>({
//     sources: [],
//     categories: [],
//     authors: [],
//   });

//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredArticles = useMemo(() => {
//     if (!data || data.length === 0) return [];

//     return data.filter((article) => {
//       if (debouncedKeyword) {
//         const keyword = debouncedKeyword.toLowerCase();
//         if (
//           !article.title.toLowerCase().includes(keyword) &&
//           !article.description.toLowerCase().includes(keyword) &&
//           !article?.content?.toLowerCase().includes(keyword)
//         ) {
//           return false;
//         }
//       }

//       if (
//         filters.category !== "All Categories" &&
//         article.category !== filters.category
//       ) {
//         return false;
//       }

//       if (
//         filters.source !== "All Sources" &&
//         article.source.name !== filters.source
//       ) {
//         return false;
//       }

//       if (filters.dateRange !== "all") {
//         const articleDate = new Date(article.publishedAt);
//         const now = new Date();
//         const daysDiff = Math.floor(
//           (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24)
//         );

//         switch (filters.dateRange) {
//           case "today":
//             if (daysDiff > 1) return false;
//             break;
//           case "week":
//             if (daysDiff > 7) return false;
//             break;
//           case "month":
//             if (daysDiff > 30) return false;
//             break;
//         }
//       }

//       return true;
//     });
//   }, [filters, data, debouncedKeyword]);

//   const personalizedArticles = useMemo(() => {
//     if (!filteredArticles || filteredArticles.length === 0) return [];

//     if (
//       preferences.categories.length === 0 &&
//       preferences.sources.length === 0
//     ) {
//       return filteredArticles;
//     }

//     return filteredArticles.filter((article) => {
//       const matchesCategory =
//         preferences.categories.length === 0 ||
//         preferences.categories.includes(article?.category);
//       const matchesSource =
//         preferences.sources.length === 0 ||
//         preferences.sources.includes(article.source.name);
//       const matchesAuthor =
//         preferences.authors.length === 0 ||
//         (article.author && preferences.authors.includes(article.author));

//       return matchesCategory && matchesSource && matchesAuthor;
//     });
//   }, [filteredArticles, preferences]);

//   const totalPages = Math.ceil(personalizedArticles.length / ITEMS_PER_PAGE);
//   const paginatedArticles = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return personalizedArticles.slice(start, start + ITEMS_PER_PAGE);
//   }, [personalizedArticles, currentPage]);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
//       <Header
//         onOpenPreferences={() => setIsPreferencesOpen(true)}
//         filters={filters}
//         onFiltersChange={(newFilters) => {
//           setFilters(newFilters);
//           setCurrentPage(1);
//         }}
//         viewMode={viewMode}
//         onViewModeChange={setViewMode}
//       />

//       <div className="flex">
//         <div className="hidden lg:block">
//           <FilterSidebar filters={filters} onFiltersChange={setFilters} />
//         </div>

//         <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
//           {isLoading && (
//             <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
//               Loading articles...
//             </p>
//           )}
//           {isError && (
//             <p className="text-center text-red-500 dark:text-red-400 mb-4">
//               Failed to fetch articles. Please try again later.
//             </p>
//           )}

//           {!isLoading && !isError && (
//             <div className="mb-6">
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Showing {personalizedArticles.length} article
//                 {personalizedArticles.length !== 1 ? "s" : ""}
//                 {filters.keyword && <span> for "{filters.keyword}"</span>}
//               </p>
//             </div>
//           )}

//           {paginatedArticles.length > 0 ? (
//             <div
//               className={
//                 viewMode === "card"
//                   ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
//                   : "space-y-6"
//               }
//             >
//               {paginatedArticles.map((article) =>
//                 viewMode === "card" ? (
//                   <ArticleCard key={article.id} article={article} />
//                 ) : (
//                   <ArticleRow key={article.id} article={article} />
//                 )
//               )}
//             </div>
//           ) : (
//             !isLoading &&
//             !isError && (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 dark:text-gray-600 mb-4">
//                   <svg
//                     className="mx-auto h-12 w-12"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                   No articles found
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   Try adjusting your search terms or filters to find more
//                   articles.
//                 </p>
//               </div>
//             )
//           )}

//           {totalPages > 1 && (
//             <div className="flex justify-center mt-8 space-x-4">
//               <button
//                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
//               >
//                 Prev
//               </button>
//               <span className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((p) => Math.min(p + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </main>
//       </div>

//       <PreferencesModal
//         isOpen={isPreferencesOpen}
//         onClose={() => setIsPreferencesOpen(false)}
//         preferences={preferences}
//         onPreferencesChange={setPreferences}
//       />
//     </div>
//   );
// }

// export default App;

import { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import FilterSidebar from "./components/FilterSidebar";
import ArticleCard from "./components/ArticleCard";
import ArticleRow from "./components/ArticleRow";
import PreferencesModal from "./components/PreferencesModal";
import { FilterOptions, ViewMode, UserPreferences } from "./types";
import { useAllNews } from "./hooks/useAllNews";

const INITIAL_VISIBLE_COUNT = 40;
const LOAD_MORE_COUNT = 20;

function App() {
  const { data = [], isLoading, isError } = useAllNews();

  const [filters, setFilters] = useState<FilterOptions>({
    keyword: "",
    dateRange: "all",
    category: "All Categories",
    source: "All Sources",
  });

  const [debouncedKeyword, setDebouncedKeyword] = useState(filters.keyword);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(filters.keyword);
    }, 300);
    return () => clearTimeout(handler);
  }, [filters.keyword]);

  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    sources: [],
    categories: [],
    authors: [],
  });

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const filteredArticles = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.filter((article) => {
      if (debouncedKeyword) {
        const keyword = debouncedKeyword.toLowerCase();
        if (
          !article.title.toLowerCase().includes(keyword) &&
          !article.description.toLowerCase().includes(keyword) &&
          !article?.content?.toLowerCase().includes(keyword)
        ) {
          return false;
        }
      }

      if (
        filters.category !== "All Categories" &&
        article.category !== filters.category
      ) {
        return false;
      }

      if (
        filters.source !== "All Sources" &&
        article.source.name !== filters.source
      ) {
        return false;
      }

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
  }, [filters, data, debouncedKeyword]);

  const personalizedArticles = useMemo(() => {
    if (!filteredArticles || filteredArticles.length === 0) return [];

    if (
      preferences.categories.length === 0 &&
      preferences.sources.length === 0
    ) {
      return filteredArticles;
    }

    return filteredArticles.filter((article) => {
      const matchesCategory =
        preferences.categories.length === 0 ||
        preferences.categories.includes(article?.category);
      const matchesSource =
        preferences.sources.length === 0 ||
        preferences.sources.includes(article.source.name);
      const matchesAuthor =
        preferences.authors.length === 0 ||
        (article.author && preferences.authors.includes(article.author));

      return matchesCategory && matchesSource && matchesAuthor;
    });
  }, [filteredArticles, preferences]);

  const visibleArticles = useMemo(() => {
    return personalizedArticles.slice(0, visibleCount);
  }, [personalizedArticles, visibleCount]);

  // Scroll-based infinite loading
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.offsetHeight;

      if (scrollTop + windowHeight >= fullHeight - 300) {
        setVisibleCount((prev) =>
          Math.min(prev + LOAD_MORE_COUNT, personalizedArticles.length)
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [personalizedArticles.length]);

  // Reset visible count when filters or preferences change
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [filters, preferences]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        filters={filters}
        onFiltersChange={(newFilters) => {
          setFilters(newFilters);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="flex">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onFiltersChange={setFilters} />
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {isLoading && (
            <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
              Loading articles...
            </p>
          )}
          {isError && (
            <p className="text-center text-red-500 dark:text-red-400 mb-4">
              Failed to fetch articles. Please try again later.
            </p>
          )}

          {!isLoading && !isError && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {personalizedArticles.length} article
                {personalizedArticles.length !== 1 ? "s" : ""}
                {filters.keyword && <span> for "{filters.keyword}"</span>}
              </p>
            </div>
          )}

          {visibleArticles.length > 0 ? (
            <div
              className={
                viewMode === "card"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {visibleArticles.map((article) =>
                viewMode === "card" ? (
                  <ArticleCard key={article.id} article={article} />
                ) : (
                  <ArticleRow key={article.id} article={article} />
                )
              )}
            </div>
          ) : (
            !isLoading &&
            !isError && (
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
            )
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
  );
}

export default App;
