import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  getLeadApplicationDetails,
  getMasterData,
  getProgramsData,
  getStudyModeData,
} from "../../service/service";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Image from "next/image";
import UserCircleIcon from "../../../public/assets/images/user-circle-svgrepo-com.svg";
import DollarIcon from "../../../public/assets/images/dollar-symbol-svgrepo-com.svg";
import AddressImg from "../../../public/assets/images/address-card-outlined-svgrepo-com.svg";
import EducationImg from "../../../public/assets/images/education-svgrepo-com.svg";

import { useRouter } from "next/router";
import { refferedById } from "../../constants";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../../components/common/common";
import Header from "../../components/common/header";
import { MainContainer } from "../../components/payment/payment";

interface IMasterData {
  name: string;
  code: string;
}

const LeadForm = () => {
  const methods = useForm();
  const [masterData, setMasterData] = useState({});

  useEffect(() => {
    (async function () {
      const response = await getMasterData();
      setMasterData(response);

      // const leadCode = "RLEAD00000015";
      // const appCode = "RAPP00000020";

      // const leadData = await getLeadApplicationDetails({
      //   leadCode,
      //   applicationCode: appCode,
      //   isDraft: false,
      // });

      // methods.reset(leadData);
    })();
  }, []);

  const saveLead = (e: any) => {
    e.preventDefault();
    const data = methods.watch();
    console.log("data", data);
  };
  const saveleadAsDraft = (e: any) => {
    e.preventDefault();
    const data = methods.watch();
    console.log("data", data);
  };
  return (
    <MainContainer>
      <Header />
      <FormProvider {...methods}>
        <form>
          <PersonalInformation masterData={masterData} />
          <Address masterData={masterData} />
          <Education masterData={masterData} />
          <Sponsor masterData={masterData} />
          <Employment masterData={masterData} />
          <Kin masterData={masterData} />
          <button onClick={saveLead}>Save</button>
          <button onClick={saveleadAsDraft}>Save As Draft</button>
        </form>
      </FormProvider>
    </MainContainer>
  );
};
export default LeadForm;

const PersonalInformation = (props: any) => {
  const { masterData } = props;
  const { register } = useFormContext();
  const router = useRouter();
  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <span className="me-2">
            <Image src={UserCircleIcon} alt="user" />
          </span>
          Personal Information
        </GreenFormHeading>
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid form-padding">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <StyledLabel required>First Name</StyledLabel>
              <input
                className="form-control"
                placeholder="e.g Robert"
                type={"text"}
                {...register("lead.firstName")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel>Middle Name</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                {...register("lead.middleName")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Last Name</StyledLabel>
              <input
                type={"text"}
                className="form-control"
                {...register("lead.lastName")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Gender</StyledLabel>
              <select {...register("lead.gender")} className="form-control">
                <option value="" key={`${0}_gender`}>
                  Select Gender
                </option>
                {masterData?.genderData?.length &&
                  masterData?.genderData?.map((item: IMasterData) => {
                    return (
                      <option value={item?.code} key={`${item?.code}_gender`}>
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Date of Birth</StyledLabel>
              <input
                className="form-control"
                type={"date"}
                placeholder="dateofBirth"
                {...register("lead.dateofBirth")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Email</StyledLabel>
              <input
                className="form-control"
                type={"email"}
                placeholder="email"
                {...register("lead.email")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Mobile Number</StyledLabel>
              <input
                type={"text"}
                className="form-control"
                {...register("lead.mobileNumber")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>
                Identification / Passport Number
              </StyledLabel>
              <input
                className="form-control"
                type={"text"}
                {...register("lead.identificationNumber")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Nationality</StyledLabel>
              <select
                {...register("lead.nationality")}
                className="form-control"
              >
                <option value="" key={`${0}_nationality`}>
                  Select Nationality
                </option>
                {masterData?.nationalityData?.length &&
                  masterData?.nationalityData?.map((item: IMasterData) => {
                    return (
                      <option
                        value={item?.code}
                        key={`${item?.code}_nationality`}
                      >
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="col-lg-4 mb-4">
              <StyledLabel required>Home Language</StyledLabel>
              <select {...register("lead.language")} className="form-control">
                <option value="" key={`${0}_language`}>
                  Select Home Language
                </option>
                {masterData?.languageData?.length &&
                  masterData?.languageData?.map((item: IMasterData) => {
                    return (
                      <option value={item?.code} key={`${item?.code}_language`}>
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="col-lg-4 mb-4">
              <StyledLabel required>Race</StyledLabel>
              <select {...register("lead.race")} className="form-control">
                <option value="" key={`${0}_race`}>
                  Select Race
                </option>
                {masterData?.raceData?.length &&
                  masterData?.raceData?.map((item: IMasterData) => {
                    return (
                      <option value={item?.code} key={`${item?.code}_race`}>
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

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

const Education = (props: any) => {
  const { register, watch, setValue } = useFormContext();
  const [programData, setProgramData] = useState([]);
  const [studyMode, setStudyMode] = useState([]);
  const programCode = watch("education.programCode");
  const studyModeCode = watch("education.studyModeCode");
  const refferedBy = watch("education.refferedById");
  const fees = feeHelper(studyMode, programCode, studyModeCode);
  useEffect(() => {
    (async function () {
      const response = await getProgramsData();
      setProgramData(response);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (programCode) {
        const response = await getStudyModeData(programCode);
        setStudyMode(response);
      }
    })();
  }, [programCode]);

  const { masterData } = props;
  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <span className="me-2">
            <Image src={EducationImg} alt="user" />
          </span>
          Education and Course details
        </GreenFormHeading>
      </AccordionSummary>
      <AccordionDetails>
        <div className="row">
          <div className="col-lg-4 mb-4">
            <StyledLabel required>Interested Program</StyledLabel>
            <select
              {...register("education.programCode")}
              className="form-control"
            >
              <option value="" key={`${0}_gender`}>
                Select Program
              </option>
              {programData?.length &&
                programData?.map((item: IMasterData) => {
                  return (
                    <option value={item?.code} key={`${item?.code}_program`}>
                      {" "}
                      {item?.name}{" "}
                    </option>
                  );
                })}
            </select>
          </div>
          {!!studyMode?.length && (
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Course Fees</StyledLabel>
              {studyMode?.length &&
                studyMode?.map((item: any) => {
                  {
                    return item?.studyModes?.map((studyModeItem) => {
                      return (
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input me-2"
                            type={"radio"}
                            {...register("education.studyModeCode")}
                            value={studyModeItem?.studyModeCode}
                          />
                          {studyModeItem?.studyModeCode}
                        </div>
                      );
                    });
                  }
                })}
            </div>
          )}
          {!!fees?.length && (
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Course Mode</StyledLabel>
              <div className="form-check form-check-inline">
                {fees?.map((feeItem: any) => {
                  return (
                    <>
                      <input
                        type={"radio"}
                        className="form-check-input me-2"
                        {...register("education.programFees")}
                        value={feeItem?.fee}
                        onChange={(e) =>
                          setValue("education.programMode", feeItem?.feeMode)
                        }
                      />
                      {feeItem?.feeMode}
                      {feeItem?.fee}
                      <input
                        type={"hidden"}
                        {...register("education.programMode")}
                      />
                    </>
                  );
                })}
              </div>
            </div>
          )}
          <div className="col-lg-4 mb-4">
            <StyledLabel required>Highest Qualification</StyledLabel>
            <select
              {...register("education.qualificationCode")}
              className="form-control"
            >
              <option value="" key={`${0}_qualificationCode`}>
                Select Highest Qualification
              </option>
              {masterData?.highestQualificationData?.length &&
                masterData?.highestQualificationData?.map(
                  (item: IMasterData) => {
                    return (
                      <option
                        value={item?.code}
                        key={`${item?.code}_qualificationCode`}
                      >
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  }
                )}
            </select>
          </div>
          <div className="col-lg-4 mb-4">
            <StyledLabel required>High School Name</StyledLabel>
            <input
              className="form-control"
              type={"text"}
              placeholder="High School Name"
              {...register("education.highSchoolName")}
            />
          </div>

          <div className="col-lg-4 mb-4">
            <StyledLabel required>Referred by Agent/Social Media</StyledLabel>
            <select
              {...register("education.refferedById")}
              className="form-control"
            >
              <option value="" key={`${0}_refferedById`}>
                Select
              </option>
              <option value={refferedById.agent} key={`${0}_refferedById`}>
                Agent
              </option>
              <option value={refferedById.social} key={`${0}_refferedById`}>
                Social Media
              </option>
            </select>
          </div>
          {refferedBy === refferedById.agent && (
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Agent Name</StyledLabel>
              <select
                {...register("education.agentCode")}
                className="form-control"
              >
                <option value="" key={`${0}_agentCode`}>
                  Select
                </option>
                {masterData?.agentData?.length &&
                  masterData?.agentData?.map((item: IMasterData) => {
                    return (
                      <option
                        value={item?.code}
                        key={`${item?.code}_agentCode`}
                      >
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
          {refferedBy === refferedById.social && (
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Agent Name</StyledLabel>
              <select
                {...register("education.socialMediaCode")}
                className="form-control"
              >
                <option value="" key={`${0}_socialMediaCode`}>
                  Select
                </option>
                {masterData?.socialMediaData?.length &&
                  masterData?.socialMediaData?.map((item: IMasterData) => {
                    return (
                      <option
                        value={item?.code}
                        key={`${item?.code}_socialMediaCode`}
                      >
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
          <div className="col-lg-4 mb-4">
            <StyledLabel required>Student Type</StyledLabel>
            <select
              {...register("education.studentTypeCode")}
              className="form-control"
            >
              <option value="" key={`${0}_studentTypeCode`}>
                Select Student Type
              </option>
              {masterData?.studentTypeData?.length &&
                masterData?.studentTypeData?.map((item: IMasterData) => {
                  return (
                    <option
                      value={item?.code}
                      key={`${item?.code}_studentTypeCode`}
                    >
                      {" "}
                      {item?.name}{" "}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

const Sponsor = (props: any) => {
  const { register, watch } = useFormContext();
  const { masterData } = props;
  const activeSponsor = watch("sponsor.isActive");
  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <Image alt="Dollar" src={DollarIcon} className="me-2" />
          Are you Sponsored Candidate?{" "}
          <span className="text-danger me-2">*</span>
        </GreenFormHeading>

        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`sponsor.isActive`)}
          value={"true"}
        />
        <label className="form-check-label me-2">Yes</label>
        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`sponsor.isActive`)}
          value={"false"}
        />
        <label className="form-check-label">No</label>
      </AccordionSummary>
      <AccordionDetails hidden={activeSponsor !== "true"}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Sponsor Type</StyledLabel>
              <select
                {...register("sponsor.sponsorModeCode")}
                className="form-control"
              >
                <option value="" key={`${0}_sponsorModeCode`}>
                  Select Sponsor Type
                </option>
                {masterData?.sponsorModeData?.length &&
                  masterData?.sponsorModeData?.map((item: IMasterData) => {
                    return (
                      <option
                        value={item?.code}
                        key={`${item?.code}_sponsorModeCode`}
                      >
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="col-lg-4 mb-4">
              <StyledLabel required>Sponsor Name</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("sponsor.name")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Email Address</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("sponsor.email")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Phone Number</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("sponsor.mobileNumber")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Address</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("sponsor.address")}
              />
            </div>
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

const Employment = (props: any) => {
  const { register, watch } = useFormContext();
  const { masterData } = props;
  const activeSponsor = watch("sponsor.isActive");
  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <Image alt="Dollar" src={DollarIcon} className="me-2" />
          Are you Employed? <span className="text-danger me-2">*</span>
        </GreenFormHeading>

        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`employment.isActive`)}
          value={"true"}
        />
        <label className="form-check-label me-2">Yes</label>
        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`employment.isActive`)}
          value={"false"}
        />
        <label className="form-check-label">No</label>
      </AccordionSummary>
      <AccordionDetails hidden={activeSponsor !== "true"}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Employment Status</StyledLabel>
              <select
                {...register("employment.employmentStatusCode")}
                className="form-control"
              >
                <option value="" key={`${0}_employmentStatusCode`}>
                  Select Employment Status
                </option>
                {masterData?.employmentStatusData?.length &&
                  masterData?.employmentStatusData?.map((item: IMasterData) => {
                    return (
                      <option
                        value={item?.code}
                        key={`${item?.code}_employmentStatusCode`}
                      >
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Employer</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("employment.employer")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Job Title</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("employment.jobTitle")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Industry</StyledLabel>
              <select
                {...register("employment.employmentIndustryCode")}
                className="form-control"
              >
                <option value="" key={`${0}_employmentIndustryCode`}>
                  Select Industry
                </option>
                {masterData?.employmentIndustryData?.length &&
                  masterData?.employmentIndustryData?.map(
                    (item: IMasterData) => {
                      return (
                        <option
                          value={item?.code}
                          key={`${item?.code}_employmentIndustryCode`}
                        >
                          {" "}
                          {item?.name}{" "}
                        </option>
                      );
                    }
                  )}
              </select>
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Manager Name</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("employment.managerName")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Office Address</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("employment.officeAddress")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Office Number</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("employment.officeMobileNumber")}
              />
            </div>
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

const Kin = (props: any) => {
  const { register, watch } = useFormContext();
  const { masterData } = props;
  const activeSponsor = watch("sponsor.isActive");
  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <Image alt="Dollar" src={DollarIcon} className="me-2" />
          Next of Kin? <span className="text-danger me-2">*</span>
        </GreenFormHeading>

        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`kin.isActive`)}
          value={"true"}
        />
        <label className="form-check-label me-2">Yes</label>
        <input
          className="form-check-input me-2"
          type="radio"
          {...register(`kin.isActive`)}
          value={"false"}
        />
        <label className="form-check-label">No</label>
      </AccordionSummary>
      <AccordionDetails hidden={activeSponsor !== "true"}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Full Name</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("kin.fullName")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>RelationShip</StyledLabel>
              <select
                {...register("kin.relationshipCode")}
                className="form-control"
              >
                <option value="" key={`${0}_relationshipCode`}>
                  Select Relationship
                </option>
                {masterData?.relationData?.length &&
                  masterData?.relationData?.map((item: IMasterData) => {
                    return (
                      <option
                        value={item?.code}
                        key={`${item?.code}_relationshipCode`}
                      >
                        {" "}
                        {item?.name}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Email</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("kin.email")}
              />
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Mobile Number</StyledLabel>
              <input
                className="form-control"
                type={"text"}
                placeholder="text"
                {...register("kin.mobileNumber")}
              />
            </div>
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

const feeHelper = (
  studyMode: any,
  programCode: string,
  studyModeCode: string
) => {
  let result = [];

  if (studyMode.length && programCode && studyModeCode) {
    const program = studyMode.find((item) => item.programCode === programCode);
    const { fees } = program?.studyModes?.find(
      (item) => item.studyModeCode === studyModeCode
    );
    result = fees;
  }
  return result;
};
