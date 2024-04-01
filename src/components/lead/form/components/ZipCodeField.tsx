import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";

const ZipCodeField = ({
  element,
  Errors,
  registerName,
  isAlphabetsOnly,
}: any) => {
  const { register } = useFormContext();

  return (
    <div className="col-lg-4 mb-4">
      <StyledLabel required={element?.required}>{element?.label}</StyledLabel>
      <input
        min="0"
        className="form-control"
        type={"text"}
        placeholder={"Enter Zip/Postal Code"}
        {...register(registerName, {
          required: true,
          maxLength: 10,
          minLength: 4,
          min: 1,
        })}
        onChange={(e) => {
          const numericRegex = /^[0-9]*$/;
          if (!numericRegex.test(e.target.value)) {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }
        }}
      />
      {Errors && Errors[element?.name] && (
        <div className="invalid-feedback">
          {Errors[element?.name]?.type === "maxLength"
            ? "Max length exceeded"
            : Errors[element?.name]?.type === "minLength"
            ? "Minimum length should be 4"
            : Errors[element?.name]?.type === "min"
            ? "Please enter positive number"
            : "Please enter Zip/Postal Code"}
        </div>
      )}
    </div>
  );
};

export default ZipCodeField;
