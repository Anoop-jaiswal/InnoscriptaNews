import { useQuery } from "@tanstack/react-query";
import { fetchGuardian } from "../api/guardian";

export const useGuardian = () => {
  return useQuery({
    queryKey: ["guardian"],
    queryFn: fetchGuardian,
    staleTime: 1000 * 60 * 5,
  });
};
