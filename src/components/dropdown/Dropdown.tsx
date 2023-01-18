import React from "react";
import { UseFormRegister } from "react-hook-form";
import { StyledLabel } from "../common/common";

interface IAdvanceDropDownProps {
  options: any[];
  label?: string;
  value: string;
  mapKey?: string;
  displayItem?: string;
  name?: string;
  required?: boolean;
  hideLabel?: boolean;
  onChange?: (...args: any) => void;
  onBlur?: (...args: any) => void;
  register: UseFormRegister<any>;
}

const AdvanceDropDown = ({
  options,
  label = "",
  value,
  required = true,
  mapKey = "code",
  onChange,
  register,
  hideLabel = false,
  displayItem = "name", //@param Its require for to pick specific object key value in array of objects
  ...props
}: IAdvanceDropDownProps) => {
  return (
    <>
      <StyledLabel hideLabel={!label} forceHide={hideLabel} required={required}>
        {label}
      </StyledLabel>
      <select
        className="form-select"
        {...register(props?.name!, {
          required: required,
          onChange(event) {
            onChange && onChange(event);
          },
        })}
        {...props}
      >
        <option value={""}>{label && `Select ${label}`}</option>
        {options &&
          options.map(({ ...rest }) => {
            return (
              <option
                selected={rest[mapKey] == value}
                key={JSON.stringify(rest)}
                value={rest[mapKey]}
              >
                {rest[displayItem]}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default AdvanceDropDown;
