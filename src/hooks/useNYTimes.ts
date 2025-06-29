import { useQuery } from "@tanstack/react-query";
import { fetchNYTimes } from "../api/nytimes";

export const useNYTimes = () => {
  return useQuery({
    queryKey: ["nytimes"],
    queryFn: fetchNYTimes,
    staleTime: 1000 * 60 * 5,
  });
};
