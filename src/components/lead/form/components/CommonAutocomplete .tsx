import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Autocomplete, autocompleteClasses } from "@mui/material";
import { StyledLabel } from "../../../common/common";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  options: any[];
  label: string | null;
  registerName: any;
  required: boolean;
  defaultValue: any;
  disabled?: boolean;
}

const CommonAutocomplete = ({
  options,
  label,
  registerName,
  required,
  defaultValue,
  disabled = false,
}: IProps) => {
  const { register, setValue } = useFormContext();
  const optionList: any = [];
  const dropDownOptions = options?.map((item) => {
    if (item?.code) {
      optionList.push(item);
      return item.code;
    } else if (item?.isoCode) {
      const { isoCode, ...rest } = item;
      optionList.push({ ...rest, code: isoCode });
      return isoCode;
    }
  });
  if (registerName === "address[0].state") {
    console.log("-------------------------------------");
    console.log("options", options);
    console.log("label", label);
    console.log("registerName", registerName);
    console.log("required", required);
    console.log("defaultValue", defaultValue);
    console.log("-------------------------------------");
  }
  return (
    <>
      {label && <StyledLabel required={required}>{label}</StyledLabel>}
      <br />
      <Autocomplete
        fullWidth
        sx={{
          [`& .${autocompleteClasses.inputRoot}`]: {
            border: "2px solid #ced4da",
            borderRadius: 1.5,
          },
          "& .MuiIconButton-root": { padding: "3px !important" },
        }}
        {...register(registerName, { value: defaultValue })}
        options={dropDownOptions}
        defaultValue={defaultValue}
        disabled={disabled}
        getOptionLabel={(option: any) => {
          const optionValue = optionList?.find((item) => item?.code === option);
          return optionValue?.name;
        }}
        onChange={(e, value) => {
          setValue(registerName, value);
        }}
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
      />
    </>
  );
};

export default CommonAutocomplete;
