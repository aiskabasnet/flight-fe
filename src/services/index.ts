import type { FlightSearchParams } from "../interfaces";
import { apiClient } from "../utils";

export const searchAirports = (query: string) =>
  apiClient.get("/flights/searchAirport", { params: { query } });

export const getNearByAirports = (lat: number, lng: number) =>
  apiClient.get("/flights/getNearByAirports", {
    params: { latitude: lat, longitude: lng },
  });

export const searchFlights = (params: FlightSearchParams) =>
  apiClient.get("/flights/searchFlight", {
    params: { ...params, currency: params.currency ?? "USD" },
  });

export const searchEverywhere = (
  originSkyId: string,
  travelDate: string,
  currency = "USD"
) =>
  apiClient.get("/flights/searchFlightEverywhere", {
    params: { originSkyId, travelDate, currency },
  });
