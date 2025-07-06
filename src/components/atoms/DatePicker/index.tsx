import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { InputWrapper } from "../Input";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error: string;
}

const DatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  error,
}: IProps<T>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputWrapper>
            <label>{label}</label>
            <MUIDatePicker {...field} />
            {error && <p className="error">{error}</p>}
          </InputWrapper>
        )}
      />
    </LocalizationProvider>
  );
};

export { DatePicker };
