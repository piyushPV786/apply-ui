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
import AddressType from "./AddressType";
import {
  useCompareAddressHook,
  useSameResidentialAddress,
} from "../customHooks/addressHooks";
import { AddressTypeData } from "../../common/constant";

const Address = (props: any) => {
  const { masterData, applicationData } = props?.masterData;
  const { register } = useFormContext();
  useCompareAddressHook(
    applicationData?.lead?.address
      ? applicationData?.lead?.address
      : applicationData?.address,
  );
  useSameResidentialAddress();
  return (
    <StyledAccordion defaultExpanded={true} className="card-shadow mt-0">
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
          {AddressTypeData?.length &&
            AddressTypeData?.map((item: any, index: any) => (
              <>
                <AddressType
                  applicationData={
                    applicationData?.lead?.address
                      ? applicationData?.lead
                      : applicationData
                  }
                  masterData={masterData}
                  data={item}
                  index={index}
                />
                {index === 0 && (
                  <div className="col-md-12">
                    <br />
                    <input
                      {...register(`address.isSameAsPostalAddress`, {
                        required: false,
                      })}
                      className="form-check-input me-2"
                      type="checkbox"
                    />
                    <label className="form-check-label m1-2 same-address">
                      Select if same as Postal Address
                    </label>
                  </div>
                )}
              </>
            ))}
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Address;
