import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import styled from "styled-components";
import { theme } from "../../../utils";
import type { Airport } from "../../../interfaces";
import { Fragment, useState } from "react";
import { useAirportSearch } from "../../../hooks";

interface IProps {
  label: string;
  error: string;
  value?: Airport | null;
  onSelect: (airport: Airport | null) => void;
}

const Input = ({ label, error, onSelect, value }: IProps) => {
  const [input, setInput] = useState("");
  const { data: options, isFetching } = useAirportSearch(input);

  console.log(options);
  return (
    <InputWrapper className="input-wrapper">
      <label>{label}</label>
      <Autocomplete<Airport, false, false, false>
        fullWidth
        autoHighlight
        options={options?.data || []}
        value={value}
        filterOptions={(x) => x}
        getOptionLabel={(opt) =>
          opt ? `${opt?.presentation?.suggestionTitle}` : ""
        }
        loading={isFetching}
        onInputChange={(_e, newInput) => setInput(newInput)}
        onChange={(_e, newVal) => onSelect(newVal)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {isFetching ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              },
            }}
          />
        )}
      />
      {/* <TextField variant="outlined" {...field} />
       */}
      {error && <p className="error">{error}</p>}
    </InputWrapper>
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
  & .MuiAutocomplete-inputRoot {
    padding: 1px 14px;
    background: #eeeeee6b;
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
  }

  & fieldset {
    border: 2px solid #e5e7eb;
  }

  & .error {
    color: red;
  }
`;
