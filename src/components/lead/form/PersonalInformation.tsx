import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import Image from "next/image";
import UserCircleIcon from "../../../../public/assets/images/user-circle-svgrepo-com.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CommonAutocomplete from "./components/CommonAutocomplete ";

const PersonalInformation = (props: any) => {
  const { masterData } = props?.masterData;
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
              {!!masterData?.genderData?.length && (
                <CommonAutocomplete
                  options={masterData?.genderData}
                  label="Gender"
                  registerName={"lead.gender"}
                  required={true}
                />
              )}
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
              {!!masterData?.nationalityData?.length && (
                <CommonAutocomplete
                  options={masterData?.nationalityData}
                  label="Nationality"
                  registerName={"lead.nationality"}
                  required={true}
                />
              )}
            </div>

            <div className="col-lg-4 mb-4">
              {!!masterData?.languageData?.length && (
                <CommonAutocomplete
                  options={masterData?.languageData}
                  label="Home Language"
                  registerName={"lead.language"}
                  required={true}
                />
              )}
            </div>

            <div className="col-lg-4 mb-4">
              {!!masterData?.raceData?.length && (
                <CommonAutocomplete
                  options={masterData?.raceData}
                  label="Race"
                  registerName={"lead.race"}
                  required={true}
                />
              )}
            </div>
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default PersonalInformation;
