import { Controller, useFormContext } from "react-hook-form";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
  CertifiedDocumentQualification,
} from "../../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import Image from "next/image";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EducationImg from "../../../../public/assets/images/education-svgrepo-com.svg";
import { refferedById } from "../../../constants";
import CommonAutocomplete from "./components/CommonAutocomplete ";
import { StyleContainer } from "../../login/style";
import { FeeCard } from "./components/CommonComponents";
import RadioField from "./components/RadioField";
import { useEducationHook } from "../customHooks/educationHooks";
import { useEffect } from "react";
import { feeMode } from "../../common/constant";
import { Alert } from "@mui/material";

const Education = (props: any) => {
  const {
    register,
    watch,
    formState: { errors },
    setError,
    setValue,
    control,
    clearErrors,
  } = useFormContext();

  const { masterData, programsData, applicationData, salesAgentData } =
    props?.masterData;
  const programCode = watch("education.programCode");
  const studyModeCodeWatch = watch("education.studyModeCode");
  const agendWatch = watch("education.agentCode");
  const socialMediaWatch = watch("education.socialMediaCode");
  const studentProgram: any = useEducationHook(programCode);
  const refferedBy = watch("education.referredById");

  const Errors = errors["education"] as any;
  const feesDetails = studentProgram?.studyModes?.find(
    (item) => item?.studyModeCode === studyModeCodeWatch
  );

  useEffect(() => {
    if (studentProgram == null && programCode) {
      setError("education.studyModeCode", {
        type: "manual",
        message: "",
      });
    }
  }, [programCode]);

  useEffect(() => {
    if (agendWatch !== null || socialMediaWatch !== null) {
      clearErrors("education.socialMediaCode");
      clearErrors("education.agentCode");
    }
  }, [agendWatch, socialMediaWatch]);

  return (
    <StyledAccordion defaultExpanded={true} className="card-shadow mt-0">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <span className="me-2">
            <Image src={EducationImg} alt="user" />
          </span>
          Education and Module details
        </GreenFormHeading>
      </AccordionSummary>
      <AccordionDetails>
        <div className="row">
          <div className="col-lg-4 mb-4">
            <input
              type="text"
              {...register("education.studentTypeCode")}
              hidden={true}
              value={"RETAIL"}
            />
            {programsData?.length && (
              <CommonAutocomplete
                defaultValue={applicationData?.education?.programCode}
                options={programsData}
                label="Interested Qualification"
                registerName={`education.programCode`}
                required={true}
              />
            )}
            {Errors?.programCode && (
              <div className="invalid-feedback">
                select your interested Qualification
              </div>
            )}

            {CertifiedDocumentQualification.includes(programCode) && (
              <Alert severity="warning" className="infoColor">
                Certified documents are required for this qualification.
              </Alert>
            )}
          </div>

          <div className="col-lg-4 mb-4">
            <StyledLabel required>Study Mode & Fee Plan</StyledLabel>
            <br />
            <>
              {studentProgram?.studyModes.map((item: any) => {
                {
                  return (
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input me-2"
                        type={"radio"}
                        {...register("education.studyModeCode", {
                          required: "Study Mode & Fee Plan is Required",
                        })}
                        value={item?.studyModeCode}
                      />
                      {item?.studyModeCode}
                    </div>
                  );
                }
              })}

              {feesDetails && feesDetails?.fees && (
                <>
                  <StyleContainer className="fee-cards">
                    {feesDetails?.fees.map((item) => {
                      if (item?.feeMode === feeMode?.APPLICATION)
                        return <FeeCard item={item} />;
                    })}
                  </StyleContainer>
                  <StyleContainer className="fee-cards">
                    {feesDetails?.fees
                      ?.filter(
                        (item) =>
                          item?.feeMode !== feeMode?.TOTAL &&
                          item?.feeMode !== feeMode?.APPLICATION
                      )
                      .sort((a, b) => {
                        const feeModeOrder = {
                          MONTHLY: 1,
                          SEMESTER: 2,
                          ANNUALLY: 3,
                        };

                        return (
                          feeModeOrder[a?.feeMode] - feeModeOrder[b?.feeMode]
                        );
                      })
                      .map((item) => (
                        <FeeCard key={item?.feeMode} item={item} />
                      ))}
                  </StyleContainer>
                </>
              )}
            </>
            {Errors?.studyModeCode && studentProgram != null && (
              <div className="invalid-feedback">
                {Errors?.studyModeCode?.message}
              </div>
            )}
            {Errors?.studyModeCode && studentProgram == null && (
              <div className="invalid-feedback">
                Fees not configured for selected qualification
              </div>
            )}
          </div>

          <div className="col-lg-4 mb-4">
            {!!masterData?.highestQualificationData?.length && (
              <CommonAutocomplete
                defaultValue={applicationData?.education?.qualificationCode}
                options={masterData?.highestQualificationData}
                label="Highest Qualification"
                registerName={`education.qualificationCode`}
                required={true}
              />
            )}
            {Errors?.qualificationCode && (
              <div className="invalid-feedback">
                Please select Highest Qualification
              </div>
            )}
          </div>
          <div className="col-lg-4 mb-4">
            <StyledLabel required>High School Name</StyledLabel>
            <input
              className="form-control"
              type={"text"}
              placeholder="High School Name"
              {...register("education.highSchoolName", { required: true })}
            />
            {Errors?.highSchoolName && (
              <div className="invalid-feedback">
                Please enter high school name
              </div>
            )}
          </div>

          <div className="col-md-4 mb-4">
            <StyledLabel required>
              Are you an international degree holder?
            </StyledLabel>
            <br />
            <div className="form-check form-check-inline">
              <RadioField
                registerName={"education.isInternationDegree"}
                defaultValue={
                  applicationData?.education?.isInternationDegree ? "yes" : "no"
                }
                defaultChecked={
                  applicationData?.education?.isInternationDegree ? "yes" : "no"
                }
              />
            </div>
            {Errors?.isInternationDegree && (
              <div className="invalid-feedback">
                international degree is required
              </div>
            )}
          </div>

          <div className="col-lg-4 mb-4">
            <div className="mb-4">
              <CommonAutocomplete
                defaultValue={
                  !applicationData?.education?.agentCode &&
                  !applicationData?.education?.socialMediaCode
                    ? null
                    : applicationData?.education?.agentCode
                    ? refferedById.agent
                    : refferedById.social
                }
                options={[
                  { name: "Agent", code: refferedById.agent, id: 1 },
                  { name: "Social Media", code: refferedById.social, id: 2 },
                ]}
                label="Referred by Agent/Social Media"
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

            {(refferedBy === refferedById.agent ||
              (applicationData?.education?.agentCode &&
                refferedBy === refferedById.agent)) && (
              <div className="mb-4 others">
                {!!salesAgentData?.length && (
                  <CommonAutocomplete
                    defaultValue={
                      applicationData?.education?.agentCode
                        ? applicationData?.education?.agentCode
                        : null
                    }
                    options={salesAgentData}
                    label="Agent Name"
                    registerName={`education.agentCode`}
                    required={true}
                  />
                )}
                {Errors?.agentCode && (
                  <div className="invalid-feedback">
                    Please select Agent Name
                  </div>
                )}
              </div>
            )}
            {(refferedBy === refferedById.social ||
              (applicationData?.education?.socialMediaCode &&
                refferedBy === refferedById.social)) && (
              <div className="mb-4 others">
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

export default Education;
