import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import Image from "next/image";
import { IMasterData } from "../../common/types";
import UserCircleIcon from "../../../../public/assets/images/user-circle-svgrepo-com.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

export default PersonalInformation;
