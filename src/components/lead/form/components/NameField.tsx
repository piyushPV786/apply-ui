import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";
import { capitalizeFirstLetter } from "../../../../Util/Util";
import { RhfErrorTypes, rhfErrorMessage } from "../../../common/constant";
import { useState } from "react";

const NameField = ({ element, Errors, registerName }: any) => {
  const { register, setValue, trigger } = useFormContext();
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 30) {
      setShowErrorMessage("Maximum 30 characters allowed.");
      e.target.value = inputValue.slice(0, 30);
    } else {
      setShowErrorMessage("");
    }
  };

  const handleBlur = (e) => {
    const inputValue = e.target.value;
    const hasNumbers = /\d/.test(inputValue);
    if (hasNumbers) {
      setShowErrorMessage("Numbers are not allowed.");
      e.target.value = "";
    } else {
      setShowErrorMessage("");
      const alphabeticValue = inputValue.replace(/[^A-Za-z\s]/g, "");
      e.target.value = alphabeticValue;
      setValue(registerName, alphabeticValue); // Update the form value
      trigger(registerName); // Trigger validation
    }
  };

  return (
    <div className="col-lg-4 mb-4">
      <StyledLabel required={element?.required}>{element?.label}</StyledLabel>
      <input
        {...register(registerName, {
          required: element?.required,
          maxLength: {
            value: 30,
            message: "Maximum 30 characters allowed.",
          },
          pattern: {
            value: /^[A-Za-z\s]*$/,
            message: "Numbers are not allowed.",
          },
          ...(element?.rhfOptions || {}),
        })}
        className={`form-control ${
          Errors && Errors[element?.name] ? "is-invalid" : ""
        }`}
        placeholder={element?.placeholder}
        type="text"
        disabled={element?.disabled}
        onBlur={handleBlur}
        onInput={handleInputChange}
      />
      {showErrorMessage && (
        <div className="invalid-feedback">{showErrorMessage}</div>
      )}

      {Errors && Errors[element?.name] && (
        <div className="invalid-feedback">
          {Errors[element?.name].type === RhfErrorTypes.MaxLength
            ? rhfErrorMessage.maxLength
            : Errors[element?.name].type === RhfErrorTypes.MinLength
            ? rhfErrorMessage.minLength
            : Errors[element?.name].type === RhfErrorTypes.Min
            ? rhfErrorMessage.min
            : Errors[element?.name].message || element?.errorMessage}
        </div>
      )}
    </div>
  );
};

export default NameField;
