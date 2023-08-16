import React from "react";
import { UseFormRegister } from "react-hook-form";
import { StyledLabel } from "../common/common";

import TextField, { textFieldClasses } from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
interface IAdvanceDropDownProps {
  options: any[];
  label?: string;
  value: string;
  mapKey?: string;

  displayItem?: string;
  name?: string;
  required?: boolean;
  hideLabel?: boolean;
  disabled?: boolean;
  onChange?: (...args: any) => void;
  onBlur?: (...args: any) => void;
  register: UseFormRegister<any>;
}

const AdvanceDropDown = ({
  disabled,
  options,
  label = "",
  value,
  required = true,
  mapKey = "code",
  onChange,
  register,
  hideLabel = false,
  displayItem = "name",
  //@param Its require for to pick specific object key value in array of objects
  ...props
}: IAdvanceDropDownProps) => {
  const defaultvalue = options?.filter((item) => {
    if (mapKey == "name") {
      return item.name == value;
    } else if (mapKey == "isoCode") {
      return item.ioscode == value;
    } else {
      return item.code == value;
    }
  });

  return (
    <>
      <StyledLabel hideLabel={!label} forceHide={hideLabel} required={required}>
        {!hideLabel && label}
      </StyledLabel>
      {/*  </ThemeProvider> */}
      <Autocomplete
        sx={{
          [`& .${autocompleteClasses.inputRoot}`]: {
            border: "2px solid #ced4da",
            borderRadius: 1.5,
          },
          "& .MuiIconButton-root": { padding: "3px !important" },
        }}
        onChange={(e, v) => {
          onChange(v?.code);

          if (mapKey == "name") {
            onChange(v?.name);
          }
        }}
        value={defaultvalue && defaultvalue[0]}
        fullWidth
        style={{ width: "100%" }}
        options={options}
        getOptionLabel={(option) => option.name}
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
            {...register(props?.name!, {
              required: required,
              onChange(event) {
                onChange && onChange(event);
              },
            })}
            {...params}
            fullWidth
          />
        )}
      />
    </>
  );
};

export default AdvanceDropDown;
