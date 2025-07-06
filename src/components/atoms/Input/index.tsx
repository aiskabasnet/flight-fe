import { TextField } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import styled from "styled-components";
import { theme } from "../../../utils";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error: string;
}

const Input = <T extends FieldValues>({
  control,
  name,
  label,
  error,
}: IProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <InputWrapper className="input-wrapper">
          <label>{label}</label>
          <TextField variant="outlined" {...field} />
          {error && <p className="error">{error}</p>}
        </InputWrapper>
      )}
    />
  );
};

export { Input };

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & label {
    color: ${theme.textSecondary};
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  & .MuiPickersInputBase-adornedEnd:hover {
    & fieldset {
      border-color: #a9c3ff;
    }
  }
  & .MuiInputBase-formControl,
  .MuiPickersOutlinedInput-root {
    border-radius: 10px;

    &:hover {
      & .MuiOutlinedInput-notchedOutline {
        border-color: #a9c3ff;
      }
    }
  }

  & .MuiPickersSectionList-root {
    padding: 10px 3px;
  }

  & .MuiPickersTextField-root {
    background: #eeeeee6b;
  }

  & input {
    padding: 10px 16px;
    background: #eeeeee6b;
  }

  & fieldset {
    border: 2px solid #e5e7eb;
  }

  & .error {
    color: red;
  }
`;
