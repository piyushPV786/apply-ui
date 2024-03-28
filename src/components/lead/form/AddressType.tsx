import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../common/common";
import { useAddressHook } from "../customHooks/addressHooks";
import CommonAutocomplete from "./components/CommonAutocomplete ";
import { capitalizeFirstLetter } from "../../../Util/Util";

const AddressType = (props) => {
  const { data, index, masterData, applicationData } = props;
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const countryDetail = watch(`address[${index}].country`);
  const stateDetails: any = useAddressHook(countryDetail);
  const stateList = stateDetails[countryDetail];
  const Errors = errors["address"] as any;

  return (
    <>
      <div className="col-lg-4 mb-4">
        <StyledLabel required> {`${data?.name} Address`} </StyledLabel>
        <input
          className="form-control"
          type={"text"}
          placeholder={"e.g 10 church street"}
          {...register(`address[${index}].street`, {
            required: true,
            maxLength: 40,
          })}
          onChange={(e) =>
            (e.target.value = capitalizeFirstLetter(e.target.value))
          }
        />

        {Errors && Errors[index]?.street && (
          <div className="invalid-feedback">
            {Errors[index]?.street.type === "maxLength"
              ? "Maximum 40 characters allowed"
              : `Please enter ${data?.name} Address`}
          </div>
        )}
      </div>

      <div className="col-lg-4 mb-4">
        {!!masterData?.countryData?.length && (
          <CommonAutocomplete
            defaultValue={
              applicationData && applicationData?.address?.length
                ? applicationData?.address[index]?.country
                : null
            }
            options={masterData?.countryData}
            label="Country"
            registerName={`address[${index}].country`}
            required={true}
          />
        )}
        {Errors && Errors[index]?.country && (
          <div className="invalid-feedback">
            Please enter {`${data?.name}`} Country
          </div>
        )}
      </div>

      <div className="col-lg-4 mb-4">
        <CommonAutocomplete
          defaultValue={
            applicationData && applicationData?.address?.length
              ? applicationData?.address[index]?.state
              : null
          }
          options={stateList ? stateList : []}
          label="State/Provinces"
          registerName={`address[${index}].state`}
          required={true}
        />
        {Errors && Errors[index]?.state && (
          <div className="invalid-feedback">
            Please enter {`${data?.name}`} State
          </div>
        )}
      </div>

      <div className="col-lg-4 mb-4">
        <StyledLabel required> City </StyledLabel>
        <input
          className="form-control"
          type={"text"}
          placeholder={"e.g 10 church street"}
          {...register(`address[${index}].city`, {
            required: true,
          })}
          onChange={(e) => {
            const alphabeticValue = e.target.value.replace(/[^A-Za-z\s]/g, "");
            e.target.value = alphabeticValue;
            e.target.value = capitalizeFirstLetter(e.target.value);
          }}
        />
        {Errors && Errors[index]?.city && (
          <div className="invalid-feedback">
            Please enter {`${data?.name}`} City
          </div>
        )}
      </div>
      <div className="col-lg-4 mb-4">
        <StyledLabel required>Pin Code / Zip Code</StyledLabel>
        <input
          min="0"
          className="form-control"
          type={"text"}
          placeholder={"Enter Zip/Postal Code"}
          {...register(`address[${index}].zipcode`, {
            required: true,
            maxLength: 10,
            minLength: 4,
            min: 1,
          })}
          onChange={(e) => {
            const numericRegex = /^[0-9]*$/;
<<<<<<< HEAD
=======

>>>>>>> 3b8c6fa0184c4548415cd0e4a989e968ae944a0b
            if (!numericRegex.test(e.target.value)) {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }
          }}
        />
        {Errors && Errors[index]?.zipcode && (
          <div className="invalid-feedback">
            {Errors[index]?.zipcode.type === "maxLength"
              ? "Max length exceeded"
              : Errors[index]?.zipcode.type === "minLength"
              ? "Minimum length should be 4"
              : Errors[index]?.zipcode.type === "min"
              ? "Please enter positive number"
              : "Please enter Zip/Postal Code"}
          </div>
        )}
      </div>
      <div className="col-lg-4 mb-4">
        <input
          value={data.code}
          type="hidden"
          {...register(`address[${index}].addressType`)}
        />
      </div>
    </>
  );
};

export default AddressType;
