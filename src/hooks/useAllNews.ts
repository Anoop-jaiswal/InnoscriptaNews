import { useQueries } from "@tanstack/react-query";
import { fetchNewsAPI } from "../api/newsapi";
import { fetchNYTimes } from "../api/nytimes";
import { fetchGuardian } from "../api/guardian";
import { Article } from "../types/news";

export const useAllNews = () => {
  const results = useQueries({
    queries: [
      { queryKey: ["newsapi"], queryFn: fetchNewsAPI },
      { queryKey: ["nytimes"], queryFn: fetchNYTimes },
      { queryKey: ["guardian"], queryFn: fetchGuardian },
    ],
  });

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);
  const data: Article[] = results.flatMap((r) => r.data || []);

  return { data, isLoading, isError };
};
