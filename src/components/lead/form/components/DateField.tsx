import { useFormContext, Controller } from "react-hook-form";
import { StyledLabel } from "../../../common/common";
import { formatDate, isValidDate, transformDate } from "../../../../Util/Util";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

const DateField = ({ element, Errors, registerName, defaultValue }: any) => {
  const { register, watch, control } = useFormContext();
  return (
    <div className="col-lg-4 mb-4">
      <StyledLabel required={element?.required}>{element?.label}</StyledLabel>
      <Controller
        name={`${registerName}`}
        control={control}
        defaultValue={null}
        rules={{
          required: element?.required,
          validate: isValidDate
        }}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...field}
              value={dayjs(new Date(field.value))}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #ced4da",
                },
                "& .MuiOutlinedInput-input": { padding: "8px !important" },
                width: "100%",
              }}
              maxDate={dayjs(new Date())}
            />
          </LocalizationProvider>
        )}
      />

      {Errors?.dateOfBirth && (
        <div className="invalid-feedback">
          {Errors?.dateOfBirth?.type === "validate"
            ? element?.validateErrorMessage
            : element?.errorMessage}
        </div>
      )}
    </div>
  );
};

export default DateField;
