import { Controller, useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";
import { formOptions, validateNumber } from "../../../../Util/Util";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import { useState } from "react";

export const MobileField = ({
  element,
  registerName,
  countryCodeRegisterName,
  error,
}) => {
  const { control, setValue } = useFormContext();
  const [countryCodeRef, setCountryCode] = useState<any>("ZA");
  const updateMobNumber = () => {
    if (countryCodeRef) {
      const countryCode = getCountryCallingCode(countryCodeRef);
      setValue(countryCodeRegisterName, `+${countryCode}`);
    } else {
      setValue(countryCodeRegisterName, "", formOptions);
    }
  };

  return (
    <div className="col-md-4">
      <div className="mb-4">
        <StyledLabel required={element?.required}>{element?.label}</StyledLabel>
        <Controller
          control={control}
          name={registerName}
          rules={{
            required: element.required,
            validate: {
              validPhoneNumber: (value) => {
                if (element.required) {
                  return (
                    validateNumber(value, countryCodeRef) ||
                    "Invalid phone number"
                  );
                }
              },
            },
          }}
          render={({ field }) => (
            <PhoneInput
              fullWidth
              {...field}
              id="2"
              international
              countryCallingCodeEditable={false}
              defaultCountry={countryCodeRef}
              placeholder="Select Country Code*"
              onCountryChange={(value: any) => {
                setCountryCode(value);
              }}
              onBlur={() => {
                field.onBlur();
                updateMobNumber();
              }}
              onChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
            />
          )}
        />
        {error && error[element?.name] && (
          <>
            <div className="invalid-feedback">
              {error?.mobileNumber?.type === "validate"
                ? element?.validateErrorMessage
                : element?.errorMessage}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
