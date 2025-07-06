import { useQuery } from "@tanstack/react-query";
import type { FlightSearchParams } from "../interfaces";
import { searchFlights } from "../services";

export const useFlightSearch = (params: FlightSearchParams | null) => {
  return useQuery({
    queryKey: ["flights", params],
    queryFn: () => (params ? searchFlights(params).then((r) => r.data) : []),
    enabled: !!params,
    refetchOnWindowFocus: false,
  });
};
