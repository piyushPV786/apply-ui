import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";
const DateField = ({ element, Errors, registerName }: any) => {
  const { register } = useFormContext();
  return (
    <div className="col-lg-4 mb-4">
      <StyledLabel required={element?.required}>{element?.label}</StyledLabel>
      <input
        className="form-control"
        type={"date"}
        placeholder={element?.placeholder}
        {...register(registerName, {
          required: element?.required,
          validate: element?.validate,
        })}
      />
      {Errors?.dateofBirth && (
        <div className="invalid-feedback">
          {Errors?.dateOfBirth?.type === "validate"
            ? element?.errorMessage
            : element?.validateErrorMessage}
        </div>
      )}
    </div>
  );
};

export default DateField;
