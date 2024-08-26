import { useFormContext } from "react-hook-form";
import { GreenFormHeading, StyledAccordion } from "../../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import Image from "next/image";
import UserCircleIcon from "../../../../public/assets/images/user-circle-svgrepo-com.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CommonAutocomplete from "./components/CommonAutocomplete ";
import { useEffect } from "react";

import { refferedById } from "../../../constants";

const ReferredBy = (props: any) => {
  const { masterData, applicationData, salesAgentData } = props?.masterData;
  const {
    watch,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext();
  const referredBy = watch("education.referredById");
  const agentWatch = watch("education.agentCode");
  const socialMediaWatch = watch("education.socialMediaCode");
  const Errors = errors["education"] as any;
  const agentArray =
    salesAgentData?.map((i) => ({
      ...i,
      name: `${i?.firstName} ${i?.lastName}`,
    })) || [];

  useEffect(() => {
    if (agentWatch !== null || socialMediaWatch !== null) {
      clearErrors("education.socialMediaCode");
      clearErrors("education.agentCode");
    }
  }, [agentWatch, socialMediaWatch]);

  return (
    <StyledAccordion defaultExpanded={true} className="card-shadow mt-0">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <span className="me-2">
            <Image src={UserCircleIcon} alt="user" />
          </span>
          Referred By
        </GreenFormHeading>
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid form-padding">
          <div className="row">
            <div className=" col-lg-4 mb-4">
              <CommonAutocomplete
                defaultValue={
                  !applicationData?.education?.agentCode &&
                  !applicationData?.education?.socialMediaCode
                    ? null
                    : applicationData?.education?.socialMediaCode
                      ? refferedById.social
                      : refferedById.agent
                }
                options={[
                  { name: "Consultant", code: refferedById.agent, id: 1 },
                  { name: "Social Media", code: refferedById.social, id: 2 },
                ]}
                label="Referred By"
                registerName={`education.referredById`}
                required={true}
                onChange={() => {
                  setValue("education.agentCode", null);
                  setValue("education.socialMediaCode", null);
                }}
              />
              {Errors?.referredById && (
                <div className="invalid-feedback">
                  Please select Referred by
                </div>
              )}
            </div>

            {(referredBy === refferedById.agent ||
              (applicationData?.education?.agentCode &&
                referredBy === refferedById.agent)) && (
              <div className="col-lg-4 mb-4">
                {!!salesAgentData?.length && (
                  <CommonAutocomplete
                    defaultValue={
                      applicationData?.education?.agentCode
                        ? applicationData?.education?.agentCode
                        : null
                    }
                    options={agentArray}
                    label="Consultant"
                    registerName={`education.agentCode`}
                    required={true}
                  />
                )}
                {Errors?.agentCode && (
                  <div className="invalid-feedback">
                    Please select Consultant
                  </div>
                )}
              </div>
            )}
            {(referredBy === refferedById.social ||
              (applicationData?.education?.socialMediaCode &&
                referredBy === refferedById.social)) && (
              <div className=" col-lg-4 mb-4">
                {!!masterData?.socialMediaData?.length && (
                  <CommonAutocomplete
                    defaultValue={
                      applicationData?.education?.socialMediaCode
                        ? applicationData?.education?.socialMediaCode
                        : null
                    }
                    options={masterData?.socialMediaData}
                    label="Social Media"
                    registerName={`education.socialMediaCode`}
                    required={true}
                  />
                )}
                {Errors?.socialMediaCode && (
                  <div className="invalid-feedback">
                    Please select social media
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default ReferredBy;
