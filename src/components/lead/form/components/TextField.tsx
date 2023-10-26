import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";

const TextField = ({ element, Errors, registerName }: any) => {
  const { register } = useFormContext();
  return (
    <div className="col-lg-4 mb-4">
      <StyledLabel required={element?.required}>{element?.label}</StyledLabel>
      <input
        {...register(registerName, {
          required: element?.required,
        })}
        className="form-control"
        placeholder={element?.placeholder}
        type={"text"}
      />
      {Errors && Errors[element?.name] && (
        <>
          <div className="invalid-feedback">{element?.errorMessage}</div>
        </>
      )}
    </div>
  );
};

export default TextField;
