import React from "react";
import { UseFormRegister } from "react-hook-form";
import { StyledLabel } from "../common/common";

import TextField, { textFieldClasses } from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
interface IAdvanceDropDownProps {
  options: any[];
  label?: string;
  value: any;
  mapKey?: string;

  displayItem?: string;
  name?: string;
  required?: boolean;
  hideLabel?: boolean;
  disabled?: boolean;
  onChange?: (...args: any) => void;
  onBlur?: (...args: any) => void;
  register: UseFormRegister<any>;
  setValue: any;
}

const AdvanceDropDown = ({
  disabled,
  options,
  label = "",
  value,
  required = true,
  mapKey = "code",
  setValue,
  register,
  hideLabel = false,
  displayItem = "name",
  //@param Its require for to pick specific object key value in array of objects
  ...props
}: IAdvanceDropDownProps) => {
  return (
    <>
      <StyledLabel hideLabel={!label} forceHide={hideLabel} required={required}>
        {!hideLabel && label}
      </StyledLabel>
      {options && (
        <Autocomplete
          clearOnEscape
          sx={{
            [`& .${autocompleteClasses.inputRoot}`]: {
              border: "2px solid #ced4da",
              borderRadius: 1.5,
            },
            "& .MuiIconButton-root": { padding: "3px !important" },
          }}
          {...register(props?.name!, {
            required: required,
          })}
          onChange={(e, v) => {
            if (mapKey == "isoCode") {
              props?.onChange?.(v);
            } else {
              props?.onChange?.(v?.code);
            }
            if (mapKey == "name") {
              setValue(props?.name!, v?.name);
            } else if (mapKey == "isoCode") {
              setValue(props?.name!, v?.isoCode);
            } else {
              setValue(props?.name!, v?.code);
            }
          }}
          fullWidth
          style={{ width: "100%" }}
          options={options && options}
          value={
            mapKey == "isoCode"
              ? value
              : options?.find((item) => {
                  if (mapKey == "name") {
                    return item.name == value;
                  } else {
                    return item.code == value;
                  }
                })
          }
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...register(`${props.name}textfeild`, {})}
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
              fullWidth
            />
          )}
        />
      )}
    </>
  );
};

export default AdvanceDropDown;
