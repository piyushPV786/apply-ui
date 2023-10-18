import { useFormContext } from "react-hook-form";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import Image from "next/image";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddressImg from "../../../../public/assets/images/address-card-outlined-svgrepo-com.svg";

const Address = (props: any) => {
  const { register } = useFormContext();
  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <span className="me-2">
            <Image src={AddressImg} alt="user" />
          </span>
          Address
        </GreenFormHeading>
      </AccordionSummary>
      <AccordionDetails>
        <div className="row">
          {props?.masterData?.addressTypeData?.length &&
            props?.masterData?.addressTypeData?.map((item, index) => {
              const addressFields = [
                {
                  name: "street",
                  label: item?.name,
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
                      value={item.code}
                      type="hidden"
                      {...register(`address[${index}].addressType`)}
                    />
                  </div>
                </>
              );
            })}
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Address;
