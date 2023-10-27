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
        placeholder="email"
        {...register(registerName, {
          required: true,
        })}
        onBlur={async (e) => {
          if (e.target.value) {
            const res = await element?.validate(e);
            if (res?.message == "Provided email address alredy exists") {
              setError(registerName, {
                type: "custom",
                message: "Provided email address already exists",
              });
            } else if (
              res?.message ==
              "you have entered an invalid email address. Please try again"
            ) {
              setError(registerName, {
                type: "custom",
                message:
                  "you have entered an invalid email address. Please try again",
              });
            } else if (res?.message == "clear") {
              clearErrors(registerName);
            }
          } else if (e.target.value == "") {
            setError(registerName, {
              type: "custom",
              message: "Please enter Email",
            });
          }
        }}
      />
      {Errors && Errors[registerName] && (
        <div className="invalid-feedback">
          {Errors[registerName]?.type === "custom" &&
            Errors[registerName].message}
        </div>
      )}
    </div>
  );
};

export default EmailField;
