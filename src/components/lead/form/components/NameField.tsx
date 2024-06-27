import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";
import { capitalizeFirstLetter } from "../../../../Util/Util";
import { RhfErrorTypes, rhfErrorMessage } from "../../../common/constant";
import { useState } from "react";

const NameField = ({ element, Errors, registerName }: any) => {
  const { register } = useFormContext();
  const [showErrorMessage, setShowErrorMessage] = useState(false); // State to manage error message display

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 30) {
      setShowErrorMessage(true); // Show error message if input length exceeds 30
      setTimeout(() => setShowErrorMessage(false), 1000); // Hide error message after 1 second
      e.target.value = inputValue.slice(0, 30); // Truncate the input value
    }
  };

  const handleBlur = (e) => {
    const inputValue = e.target.value;
    const hasNumbers = /\d/.test(inputValue);
    if (hasNumbers) {
      setShowErrorMessage(true); // Show error message if input contains numbers
      e.target.value = ""; // Clear the input field
    } else {
      setShowErrorMessage(false);
      const alphabeticValue = inputValue.replace(/[^A-Za-z\- ]/g, "");
      e.target.value = alphabeticValue;
    }
  };

  return (
    <div className="col-lg-4 mb-4">
      <StyledLabel required={element?.required}>{element?.label}</StyledLabel>
      <input
        {...register(registerName, {
          required: element?.required,
          ...(!!element?.rhfOptions ? element?.rhfOptions : {}),
        })}
        className="form-control"
        placeholder={element?.placeholder}
        type={"text"}
        disabled={element?.disabled}
        onBlur={handleBlur}
        onInput={handleInputChange}
      />
      {showErrorMessage && ( 
        <div className="invalid-feedback">
          Number not allowed
        </div>
      )}

      {Errors && Errors[element?.name] && (
        <>
          <div className="invalid-feedback">
            {Errors[element?.name].type === RhfErrorTypes.MaxLength
              ? rhfErrorMessage.maxLength
              : Errors[element?.name].type === RhfErrorTypes.MinLength
              ? rhfErrorMessage.minLength
              : Errors[element?.name].type === RhfErrorTypes.Min
              ? rhfErrorMessage.min
              : element?.errorMessage}
          </div>
        </>
      )}
    </div>
  );
};

export default NameField;
