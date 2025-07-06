import styled from "styled-components";
import { InputWrapper } from "../Input";
import { theme } from "../../../utils";
import { Minus, PlusIcon } from "lucide-react";

interface IProps {
  label: string;
  error: string;
  value: number;
  onChange: (value: number) => void;
}

const InputNumber = ({ label, error, value, onChange }: IProps) => {
  return (
    <Wrapper className="input-wrapper">
      <label>{label}</label>
      <div className="buttons">
        <button onClick={() => onChange(value - 1)} disabled={value === 1}>
          <Minus />
        </button>
        <span>{value}</span>
        <button onClick={() => onChange(value + 1)}>
          {" "}
          <PlusIcon />
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </Wrapper>
  );
};

export { InputNumber };

const Wrapper = styled(InputWrapper)`
  & .buttons {
    display: flex;
    gap: 14px;
    align-items: center;

    & button {
      background: #e8effc;
      border: none;
      color: ${theme.primary};
      height: 44px;
      width: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: center;

      &:disabled {
        background: #f1f1f1;
        cursor: not-allowed;
      }
      &:hover {
        border: 1px solid #225ce53b;
        opacity: 0.8;
      }

      & svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`;
