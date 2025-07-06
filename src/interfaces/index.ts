export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  departureDate: string;
  returnDate?: string;
  currency?: string;
  adults?: number;
}

export interface Itinerary {
  id: string;
  price: {
    amount: number;
    currency: string;
  };
  segments: {
    airlineName: string;
    airlineLogo: string;
    origin: string;
    destination: string;
    departureTime: string; // ISO
    arrivalTime: string; // ISO
    stops: number;
    duration: string;
  }[];
}

export interface Airport {
  entityId: string;
  presentation: {
    suggestionTitle: string;
  };
  skyId: string;
}
