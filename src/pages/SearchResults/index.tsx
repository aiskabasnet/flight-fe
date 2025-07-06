import { useSearchParams } from "react-router-dom";
import type { FlightSearchParams, Itinerary } from "../../interfaces";
import { useMemo, useState } from "react";
import { useFlightSearch } from "../../hooks";
import styled from "styled-components";
import { FilterBar, FlightCard } from "../../components";

function parseSearchParams(search: URLSearchParams): FlightSearchParams | null {
  const originSkyId = search.get("o");
  const destinationSkyId = search.get("d");
  const departureDate = search.get("dt");

  if (!originSkyId || !destinationSkyId || !departureDate) return null;

  return {
    originSkyId,
    destinationSkyId,
    departureDate,
    returnDate: search.get("rt") || undefined,
    currency: search.get("c") || "USD",
    adults: Number(search.get("a")) || 1,
  } as FlightSearchParams;
}

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = parseSearchParams(searchParams);

  const [nonStopOnly, setNonStopOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"best" | "cheapest" | "fastest">("best");
  const {
    data: itineraries = [],
    isLoading,
    isFetching,
    error,
  } = useFlightSearch(queryParams);

  const availableAirlines = useMemo(() => {
    const set = new Set<string>();
    itineraries.forEach((it: Itinerary) => {
      it.segments.forEach((seg) => set.add(seg.airlineName));
    });
    return Array.from(set).sort();
  }, [itineraries]);

  const filteredItineraries = useMemo(() => {
    return itineraries.filter((it: Itinerary) => {
      if (nonStopOnly && it.segments.some((seg) => seg.stops > 0)) return false;
      if (maxPrice != null && it.price.amount > maxPrice) return false;
      if (
        selectedAirlines.length &&
        !it.segments.some((seg) => selectedAirlines.includes(seg.airlineName))
      ) {
        return false;
      }
      return true;
    });
  }, [itineraries, nonStopOnly, maxPrice, selectedAirlines]);

  return (
    <Wrapper>
      <FilterBar onSortByChange={setSortBy} />

      {filteredItineraries?.length > 0 ? (
        filteredItineraries.map((it: Itinerary) => (
          <FlightCard key={it.id} itinerary={it} />
        ))
      ) : (
        <div className="no-results">No results found</div>
      )}
    </Wrapper>
  );
};

export default SearchResults;

const Wrapper = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;

  & .no-results {
    text-align: center;
    font-size: 15px;
    color: #6b7280;
  }
`;
