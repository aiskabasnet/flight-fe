export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  departureDate: string;
  returnDate?: string;
  currency?: string;
  adults?: number;
}

export interface Airport {
  entityId: string;
  presentation: {
    suggestionTitle: string;
  };
  skyId: string;
}
