import styled from "styled-components";
import type { Itinerary } from "../../../interfaces";
import { Divider } from "@mui/material";
import { Button } from "../../atoms";

interface FlightCardProps {
  itinerary: Itinerary;
}

const FlightCard = ({ itinerary }: FlightCardProps) => {
  const { price, segments } = itinerary;
  const first = segments[0];
  const last = segments[segments.length - 1];

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <Card>
      <div className="left">
        <div className="title">
          <div className="logo-wrapper">
            <img
              src={
                first?.airlineLogo ||
                "https://logos.skyscnr.com/images/airlines/favicon/I%29.png"
              }
              alt={first?.airlineName}
              width={30}
              height={30}
            />
          </div>
          <p className="airline-name">
            {first?.airlineName || "Norse Atlantic Airways (UK)"}
          </p>
        </div>

        <div className="row">
          <div className="item">
            <div className="time">
              {/* {formatTime(first.departureTime)} */}
              6:00 AM
            </div>
            <div className="place">Los Anglees</div>
          </div>

          <Divider>
            <div className="duration">
              <p>6h 30m</p>
              <span>Non stop</span>
            </div>
          </Divider>

          <div className="item">
            <div className="time">
              {/* {formatTime(first.departureTime)} */}
              9:00 AM
            </div>

            <div className="place">Los Anglees</div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="price">
          {price.currency || "$"} {price.amount.toLocaleString() || "100"}
        </div>
        <Button>Select</Button>
      </div>
    </Card>
  );
};

export { FlightCard };

const Card = styled.div`
  margin-bottom: 2rem;
  border: 1px solid #f3f4f6;
  border-radius: 1rem;
  background-color: #ffffffe6;
  padding: 2rem;
  cursor: pointer;
  display: flex;
  gap: 3rem;

  &:hover {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    border: 1px solid #cfd8f7;
  }

  & .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    & .price {
      font-size: 24px;
    }

    & button {
      text-transform: none;
      min-width: 110px;
    }
  }
  & .left {
    flex: 1;
  }

  & .MuiDivider-root {
    flex: 1;
  }
  & .duration {
    background: #eef2ff;
    padding: 10px 15px;
    border-radius: 12px;
    border: 1px solid #cfd8f7;

    & p {
      font-weight: 600;
      font-size: 13px;
      color: #545454;
    }

    & span {
      font-weight: 600;
      color: green;
      font-size: 15px;
    }
  }

  & .row {
    display: flex;
    gap: 14px;
  }

  & .time {
    margin-top: 10px;
    font-size: 24px;
    color: #111827;
  }

  & .title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  & .logo-wrapper {
    background-color: #f0f1f3;
    padding: 0.5rem;
    border-radius: 0.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      object-fit: contain;
    }
  }
`;
