import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";

const EmailField = ({ element, Errors, registerName }: any) => {
  const { register, setError, clearErrors } = useFormContext();

  return (
    <div className="col-lg-4 mb-4">
      <StyledLabel required>Email</StyledLabel>
      <input
        className="form-control"
        type={"email"}
        placeholder="Email"
        {...register(registerName, {
          required: true,
        })}
        onBlur={async (e) => {
          if (e.target.value) {
            const res = await element?.validate(e);
            if (res?.message !== "clear") {
              setError(registerName, {
                type: "custom",
                message: res?.message,
              });
            } else if (res?.message === "clear") {
              clearErrors(registerName);
            }
          } else if (e.target.value === "") {
            setError(registerName, {
              type: "custom",
              message: "Please enter Email",
            });
          }
        }}
      />
      {Errors && Errors[element?.name] && (
        <div className="invalid-feedback">
          {Errors[element?.name]?.type === "custom"
            ? Errors[element?.name].message
            : "Please enter Email"}
        </div>
      )}
    </div>
  );
};

export default EmailField;
