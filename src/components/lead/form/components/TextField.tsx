import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";
import { capitalizeFirstLetter } from "../../../../Util/Util";

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
        disabled={element?.disabled}
        onChange={(e) =>
          (e.target.value = capitalizeFirstLetter(e.target.value))
        }
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
