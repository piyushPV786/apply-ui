import TextField from "@mui/material/TextField";

import { Autocomplete, autocompleteClasses } from "@mui/material";
import { StyledLabel } from "../../../common/common";
import { Controller, useFormContext } from "react-hook-form";

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
  const { register, control, watch } = useFormContext();
  return (
    <>
      <StyledLabel hideLabel={!label} required={true}>
        {label}
      </StyledLabel>
      <br />

      <Autocomplete
        {...register(registerName, {
          required: required,
        })}
        sx={{
          [`& .${autocompleteClasses.inputRoot}`]: {
            border: "2px solid #ced4da",
            borderRadius: 1.5,
          },
          "& .MuiIconButton-root": { padding: "3px !important" },
        }}
        fullWidth
        filterSelectedOptions
        options={options}
        value={options?.find((item) => item.code === watch(registerName))}
        getOptionLabel={(option: any) => option.name}
        renderInput={(params) => (
          <TextField
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
        // value={options?.find(
        //   (item) => item?.code === watch(registerName)
        // )}
        onChange={(event, data) => {}}
      />
    </>
  );
};

export default CommonAutocomplete;
