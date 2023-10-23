import Image from "next/image";
import { GreyStyledAccordion, StyledLabel } from "../../../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import AddressImg from "../../../../../public/assets/images/address-card-outlined-svgrepo-com.svg";
import CommonAutocomplete from "./CommonAutocomplete ";
import { useFormContext } from "react-hook-form";

const NationalityStatus = (props: any) => {
  const { masterData, nationalityStatus, identificationType } = props;
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();
  const Errors = errors["lead"] as any;
  return (
    <GreyStyledAccordion expanded={true} defaultExpanded={true}>
      <AccordionSummary className="nationality-card">
        <div className="me-4">
          <span className="me-2">
            <Image className="user-icon-circle" src={AddressImg} alt="user" />
          </span>
          <StyledLabel required>Nationality Status</StyledLabel>
        </div>
        {!!nationalityStatus?.length && (
          <CommonAutocomplete
            options={nationalityStatus}
            label=""
            registerName={"lead.nationalityStatus"}
            required={true}
          />
        )}
        <div>
          {Errors?.nationalityStatus && (
            <div className="invalid-feedback">Please Select Nationality</div>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid form-padding">
          <div className="row">
            <div className="col-md-4 mb-4">
              {!!masterData?.nationalityData?.length && (
                <CommonAutocomplete
                  options={masterData?.nationalityData}
                  label="Permanent Resident"
                  registerName={"lead.permanentResident"}
                  required={true}
                />
              )}
              {Errors?.permanentResident && (
                <div className="invalid-feedback">
                  Please Select Permanent Resident
                </div>
              )}
            </div>
            <div className="col-md-4 mb-4">
              {!!identificationType?.length && (
                <CommonAutocomplete
                  options={identificationType}
                  label="Identification Document Type"
                  registerName={"lead.identificationDocumentType"}
                  required={true}
                />
              )}
              {Errors?.identificationDocumentType && (
                <div className="invalid-feedback">
                  Please Select Document Type
                </div>
              )}
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required> Identification Number</StyledLabel>
              <input
                className="form-control"
                placeholder="e.g Robert"
                type={"number"}
                {...register("lead.identificationNumber", {
                  required: true,
                })}
              />
              {Errors?.identificationNumber && (
                <div className="invalid-feedback">
                  Please enter Identification Number
                </div>
              )}
            </div>
          </div>
        </div>
      </AccordionDetails>
    </GreyStyledAccordion>
  );
};

export default NationalityStatus;
