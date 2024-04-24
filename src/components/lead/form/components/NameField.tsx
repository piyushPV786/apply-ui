import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";
import { capitalizeFirstLetter } from "../../../../Util/Util";
import { RhfErrorTypes, rhfErrorMessage } from "../../../common/constant";
import { useState } from "react";

const NameField = ({ element, Errors, registerName, isAlphabetsOnly }: any) => {
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
        onBlur={(e) => {
          if (element.numric == false) {
            const alphabeticValue = capitalizeFirstLetter(
              e.target.value.replace(/(^\s+)|(\s{2,})|[^A-Za-z1\s]/g, "")
            );
            e.target.value = alphabeticValue;
          } else if (element.numric == true) {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            e.target.value = numericValue;
          }
        }}
        onInput={handleInputChange} // Add onInput event handler

      />
       {showErrorMessage && ( // Show error message if state is true
        <div className="invalid-feedback">
          {rhfErrorMessage.maxLength}
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
