import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";
import { capitalizeFirstLetter } from "../../../../Util/Util";
import { RhfErrorTypes, rhfErrorMessage } from "../../../common/constant";
import { useState } from "react";

const NameField = ({ element, Errors, registerName }: any) => {
  const { register, setValue } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
   const checkName= /^[a-zA-Z]+(?:[ _\-\.][a-zA-Z]+)*$/.test(value)
   checkName?setValue(registerName, value?.trim()):setValue(registerName,'')
  };

  return (
    <div className="col-lg-4 mb-4">
      <StyledLabel required={element?.required}>{element?.label}</StyledLabel>
      <input
        {...register(registerName, {
          required: element?.required,
          ...(!!element?.rhfOptions ? element?.rhfOptions : {}),
          validate: (value) => {
             const trimmedValue = value.trim();

             return element?.validate(trimmedValue);
          },
        })}
        onBlur={handleChange}
        className={`form-control ${
          Errors && Errors[element?.name] ? "is-invalid" : ""
        }`}
        placeholder={element?.placeholder}
        type="text"
        disabled={element?.disabled}
      />

      {Errors && Errors[element?.name] && (
        <>
          <div className="invalid-feedback">
            {Errors[element?.name].type === RhfErrorTypes.MaxLength
              ? rhfErrorMessage.maxLength
              : Errors[element?.name].type === RhfErrorTypes.MinLength
              ? rhfErrorMessage.minLength
              : Errors[element?.name].type === RhfErrorTypes.Min
              ? rhfErrorMessage.min
              : Errors[element?.name].type == "validate"
              ? element?.validateErrorMessage
              : element?.errorMessage}
          </div>
        </>
      )}
    </div>
  );
};

export default NameField;
