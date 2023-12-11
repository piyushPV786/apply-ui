import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";
import { capitalizeFirstLetter } from "../../../../Util/Util";
import { RhfErrorTypes, rhfErrorMessage } from "../../../common/constant";

const TextField = ({ element, Errors, registerName, isAlphabetsOnly }: any) => {
  const { register } = useFormContext();

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
        onChange={(e) => {
          if (element.numric == false) {
            const alphabeticValue = capitalizeFirstLetter(
              e.target.value.replace(/[^A-Za-z]/g, "")
            );
            e.target.value = alphabeticValue;
          } else if (element.numric == true) {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            e.target.value = numericValue;
          }
        }}
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
              : element?.errorMessage}
          </div>
        </>
      )}
    </div>
  );
};

export default TextField;
