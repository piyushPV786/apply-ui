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

const Address = (props: any) => {
  const { masterData } = props?.masterData;

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
          {masterData?.addressTypeData?.length &&
            masterData?.addressTypeData?.map((item: any, index: any) => (
              <AddressType masterData={masterData} data={item} index={index} />
            ))}
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Address;
