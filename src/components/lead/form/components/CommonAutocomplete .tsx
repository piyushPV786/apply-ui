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
  onChange?: any;
}

const CommonAutocomplete = (props: IProps) => {
  const {
    options,
    label,
    registerName,
    required,
    defaultValue,
    disabled = false,
    onChange,
  } = props;
  const { register, setValue, watch, trigger } = useFormContext();
  const optionList: any = [];
  const shortName = options?.sort((a, b) => a.name.localeCompare(b.name));
  const dropDownOptions = shortName?.map((item) => {
    if (item?.code) {
      optionList.push(item);
      return item.code;
    } else if (item?.isoCode) {
      const { isoCode, ...rest } = item;
      optionList.push({ ...rest, code: isoCode });
      return isoCode;
    }
  });

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
        {...register(registerName, { required: required })}
        options={dropDownOptions}
        defaultValue={defaultValue ?? null}
        disabled={disabled}
        getOptionLabel={(option: any) => {
          const optionValue = optionList?.find((item) => item?.code === option);

          return optionValue?.name;
        }}
        onChange={(e, value) => {
          setValue(registerName, value);
          onChange && onChange(value);
        }}
        onBlur={() => {
          trigger(registerName);
        }}
        renderInput={(params) => {
          const { inputProps, ...rest } = params;
          const optionValue = optionList?.find(
            (item) => item?.code === watch(registerName),
          );

          inputProps.value = optionValue?.name;

          return (
            <TextField
              placeholder="Select"
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
              {...rest}
              inputProps={inputProps}
            />
          );
        }}
        renderOption={(props, option, { selected }) => {
          const optionValue = optionList?.find((item) => item?.code === option);

          return (
            <li {...props} key={option.code}>
              {optionValue?.name}
            </li>
          );
        }}
      />
    </>
  );
};

export default CommonAutocomplete;
