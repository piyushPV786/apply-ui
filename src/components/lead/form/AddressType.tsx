import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../common/common";
import { IMasterData } from "../../common/types";
import useAddressHook from "../customHooks/addressHooks";

const AddressType = (props) => {
  const { data, index, masterData } = props;
  const { register, watch } = useFormContext();
  const countryCode = watch(`address[${index}].country`);
  const stateDetails: any = useAddressHook(countryCode);
  const stateList = stateDetails[countryCode];
  return (
    <>
      <div className="col-lg-4 mb-4">
        <StyledLabel required> Street </StyledLabel>
        <input
          className="form-control"
          type={"text"}
          placeholder={"e.g 10 church street"}
          {...register(`address[${index}].street`)}
        />
      </div>

      <div className="col-lg-4 mb-4">
        <StyledLabel required> Country </StyledLabel>
        <select
          {...register(`address[${index}].country`)}
          className="form-control"
        >
          {masterData?.countryData?.map((item: IMasterData) => {
            return (
              <option value={item?.code} key={`${item?.code}_countryCode`}>
                {" "}
                {item?.name}{" "}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-lg-4 mb-4">
        <StyledLabel required> State </StyledLabel>
        <select
          {...register(`address[${index}].state`)}
          className="form-control"
        >
          {stateList?.map((item: IMasterData) => {
            return (
              <option value={item?.code} key={`${item?.code}_countryCode`}>
                {" "}
                {item?.name}{" "}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-lg-4 mb-4">
        <StyledLabel required> City </StyledLabel>
        <input
          className="form-control"
          type={"text"}
          placeholder={"e.g 10 church street"}
          {...register(`address[${index}].city`)}
        />
      </div>
      <div className="col-lg-4 mb-4">
        <StyledLabel required> Pin Code </StyledLabel>
        <input
          className="form-control"
          type={"text"}
          placeholder={"Enter Zip/Postal Code"}
          {...register(`address[${index}].zipcode`)}
        />
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
