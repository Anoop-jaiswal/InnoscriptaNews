import { useQuery } from "@tanstack/react-query";
import { fetchNewsAPI } from "../api/newsapi";

export const useNewsAPI = () => {
  return useQuery({
    queryKey: ["newsapi"],
    queryFn: fetchNewsAPI,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
