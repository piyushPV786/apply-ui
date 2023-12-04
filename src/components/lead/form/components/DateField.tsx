import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";
import { isValidDate, transformDate } from "../../../../Util/Util";
const DateField = ({ element, Errors, registerName, defaultValue }: any) => {
  const { register, watch } = useFormContext();
  return (
    <div className="col-lg-4 mb-4">
      <StyledLabel required={element?.required}>{element?.label}</StyledLabel>
      <input
        defaultValue={defaultValue}
        value={watch(registerName)}
        className="form-control"
        type={"date"}
        placeholder={element?.placeholder}
        {...register(registerName, {
          required: element?.required,
          validate: isValidDate,
        })}
        max={transformDate(new Date(), true)}
      />
      {Errors?.dateOfBirth && (
        <div className="invalid-feedback">
          {Errors?.dateOfBirth?.type === "validate"
            ? element?.validateErrorMessage
            : element?.errorMessage}
        </div>
      )}
    </div>
  );
};

export default DateField;
