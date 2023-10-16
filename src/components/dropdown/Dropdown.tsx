import React from "react";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { StyledLabel } from "../common/common";

import TextField, { textFieldClasses } from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";

interface stateType {
  countryCode: string;
  isoCode: string;
}
interface IAdvanceDropDownProps {
  options: any[];
  label?: string;
  value: string | stateType[] | undefined | null;
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
  label,
  value,
  required,
  mapKey,
  register,
  hideLabel,
  displayItem,
  ...props
}: IAdvanceDropDownProps) => {
  const [defaultValue, setDefaultValue] = useState<string | null>();

  useEffect(() => {
    if (mapKey == "isoCode") {
      setDefaultValue(value as never);
    } else {
      const val = options?.find((item) => {
        if (mapKey) {
          return item[mapKey] == value;
        } else {
          return item == value;
        }
      });
      val ? setDefaultValue(val) : setDefaultValue(null);
    }
  }, [value]);

  return (
    <>
      <StyledLabel hideLabel={!label} forceHide={hideLabel} required={required}>
        {!hideLabel && label}
      </StyledLabel>
      {options && (
        <Autocomplete
          disabled={disabled}
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
          onChange={(event, value) => {
            value && props?.onChange?.(value);
          }}
          onBlur={(e) => {
            props?.onBlur?.();
          }}
          fullWidth
          style={{ width: "100%" }}
          options={options}
          value={defaultValue}
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
