import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Autocomplete, autocompleteClasses } from "@mui/material";
import { StyledLabel } from "../../../common/common";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  options: any[];
  label: string;
  registerName: any;
  required: boolean;
  defaultValue: any;
}

const CommonAutocomplete = ({
  options,
  label,
  registerName,
  required,
  defaultValue,
}: IProps) => {
  const { register, setValue } = useFormContext();
  const dropDownOptions = options?.map((item) => item.code);
  if (label === "Gender") {
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
      <StyledLabel hideLabel={!label} required={true}>
        {label}
      </StyledLabel>
      <br />
      <Autocomplete
        sx={{
          [`& .${autocompleteClasses.inputRoot}`]: {
            border: "2px solid #ced4da",
            borderRadius: 1.5,
          },
          "& .MuiIconButton-root": { padding: "3px !important" },
        }}
        {...register(registerName)}
        options={dropDownOptions}
        defaultValue={defaultValue}
        getOptionLabel={(option: any) => {
          const optionValue = options?.find((item) => item?.code === option);
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
