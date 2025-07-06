import styled from "styled-components";
import { theme } from "../../../utils";
import { useState } from "react";

interface FilterBarProps {
  onSortByChange: (sortBy: "best" | "cheapest" | "fastest") => void;
}

const FilterBar = ({ onSortByChange }: FilterBarProps) => {
  const [sortBy] = useState<"best" | "cheapest" | "fastest">("best");

  return (
    <>
      <Card className="styled-card">
        <div className="heading">
          <p>Kathmandu to London</p>
          <span>5 flights found</span>
        </div>
      </Card>

      <Card className="styled-card">
        <div className="filter-bar">
          <button
            onClick={() => onSortByChange("best")}
            className={sortBy === "best" ? "active" : ""}
          >
            Best
          </button>
          <button
            onClick={() => onSortByChange("cheapest")}
            className={sortBy === "cheapest" ? "active" : ""}
          >
            Cheapest
          </button>
          <button
            onClick={() => onSortByChange("fastest")}
            className={sortBy === "fastest" ? "active" : ""}
          >
            Fastest
          </button>
        </div>
      </Card>
    </>
  );
};

export { FilterBar };

const Card = styled.div`
  margin-bottom: 2rem;

  & .filter-bar {
    display: flex;
    gap: 1rem;
    align-items: center;

    & button {
      background-color: transparent;
      cursor: pointer;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;

      &:hover {
        background: #215ce524;
        color: ${theme.primary};
        transition: all 0.3s ease;
      }

      &.active {
        background-color: ${theme.primary};
        color: white;
      }
    }
  }
  & .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & p {
    }

    & span {
      color: ${theme.textSecondary};
      font-size: 14px;
    }
  }
`;
