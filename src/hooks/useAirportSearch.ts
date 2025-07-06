import { useQuery } from "@tanstack/react-query";
import { searchAirports } from "../services";

export const useAirportSearch = (query: string) => {
  return useQuery({
    queryKey: ["airports", query],
    queryFn: () =>
      query.length < 2 ? [] : searchAirports(query).then((r) => r.data),
    enabled: !!query,
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
};
