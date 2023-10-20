import { useFormContext } from "react-hook-form";
import { StyledLabel } from "../../common/common";

const AddressType = (props) => {
  const { register } = useFormContext();

  const { data, index } = props;
  const addressFields = [
    {
      name: "street",
      label: data?.name,
      placeholder: "e.g 10 church street",
    },
    { name: "country", label: "Country", placeholder: "" },
    {
      name: "zipcode",
      label: "Pin Code",
      placeholder: "Enter Zip/Postal Code",
    },
    { name: "city", label: "City", placeholder: "" },
    { name: "state", label: "State", placeholder: "" },
  ];
  return (
    <>
      {addressFields.map((addressItem) => {
        return (
          <div className="col-lg-4 mb-4">
            <StyledLabel required>{addressItem?.label}</StyledLabel>
            <input
              className="form-control"
              type="text"
              placeholder={addressItem.placeholder}
              {...register(`address[${index}].${addressItem.name}`)}
            />
          </div>
        );
      })}
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
