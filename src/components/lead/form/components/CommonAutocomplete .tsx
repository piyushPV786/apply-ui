import TextField from "@mui/material/TextField";
import { Autocomplete, autocompleteClasses } from "@mui/material";
import { StyledLabel } from "../../../common/common";
import { useFormContext } from "react-hook-form";

interface iProps {
  options: any[];
  label: string;
  registerName: any;
  required: boolean;
}

const CommonAutocomplete = ({
  options,
  label,
  registerName,
  required,
}: iProps) => {
  const { register } = useFormContext();
  return (
    <>
      <StyledLabel hideLabel={!label} required={true}>
        {label}
      </StyledLabel>
      <Autocomplete
        clearOnEscape
        sx={{
          [`& .${autocompleteClasses.inputRoot}`]: {
            border: "2px solid #ced4da",
            borderRadius: 1.5,
          },
          "& .MuiIconButton-root": { padding: "3px !important" },
        }}
        options={options && options}
        getOptionLabel={(option) => option.name}
        style={{ width: "100%" }}
        renderInput={(params) => (
          <TextField
            {...register(registerName, { required: required })}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none !important",
              },
              "& .MuiAutocomplete-input": {
                padding: "2px 4px 2px 3px !important",
                fontSize: "14px !important",
              },
              "& .MuiOutlinedInput-root": {
                padding: "0.375rem 0.75rem",
              },
            }}
            {...params}
          />
        )}
      />
    </>
  );
};

export default CommonAutocomplete;
