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
import NationalityStatus from "./components/NationalityStatus";
import PhoneInput from "react-phone-number-input";
import {
  emailValidation,
  getLocalStorageData,
  isValidDate,
} from "../../../Util/Util";
import { useEffect } from "react";
import { StorageName } from "../../common/constant";

const PersonalInformation = (props: any) => {
  const { masterData, nationalityStatus, identificationType } =
    props?.masterData;
  const {
    register,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const Errors = errors["lead"] as any;

  useEffect(() => {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    setValue("lead.mobileNumber", studentDetails?.mobileNumber);
  }, []);

  console.log("errors ==========>", watch());

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
          Personal Information
        </GreenFormHeading>
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid form-padding">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <StyledLabel required>First Name</StyledLabel>
              <input
                {...register("lead.firstName", {
                  required: true,
                })}
                className="form-control"
                placeholder="e.g Robert"
                type={"text"}
              />
              {Errors?.firstName && (
                <>
                  <div className="invalid-feedback">
                    Please enter your First Name
                  </div>
                </>
              )}
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
                {...register("lead.lastName", {
                  required: true,
                })}
                type={"text"}
                className="form-control"
              />
              {Errors?.lastName && (
                <div className="invalid-feedback">Please enter Last Name</div>
              )}
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
              {Errors?.gender && (
                <div className="invalid-feedback">Please enter Gender</div>
              )}
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Date of Birth</StyledLabel>
              <input
                className="form-control"
                type={"date"}
                placeholder="dateofBirth"
                {...register("lead.dateofBirth", {
                  required: true,
                  validate: isValidDate,
                })}
              />
              {Errors?.dateofBirth && (
                <div className="invalid-feedback">
                  {Errors?.dateOfBirth?.type === "validate"
                    ? "Please enter valid date"
                    : "Please enter valid  Date of Birth"}
                </div>
              )}
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Email</StyledLabel>
              <input
                className="form-control"
                type={"email"}
                placeholder="email"
                {...register("lead.email", {
                  required: true,
                })}
                onBlur={async (e) => {
                  if (e.target.value) {
                    const res = await emailValidation(e);
                    if (
                      res?.message == "Provided email address alredy exists"
                    ) {
                      setError("lead.email", {
                        type: "custom",
                        message: "Provided email address already exists",
                      });
                    } else if (
                      res?.message ==
                      "you have entered an invalid email address. Please try again"
                    ) {
                      setError("lead.email", {
                        type: "custom",
                        message:
                          "you have entered an invalid email address. Please try again",
                      });
                    } else if (res?.message == "clear") {
                      clearErrors("lead.email");
                    }
                  } else if (e.target.value == "") {
                    setError("lead.email", {
                      type: "custom",
                      message: "Please enter Email",
                    });
                  }
                }}
              />
              {Errors?.email && (
                <div className="invalid-feedback">
                  {Errors?.email?.type === "custom" && Errors?.email?.message}
                </div>
              )}
            </div>
            <div className="col-lg-4 mb-4">
              <StyledLabel required>Mobile Number</StyledLabel>
              <div className="disabled">
                <PhoneInput
                  id="1"
                  international
                  disabled
                  countryCallingCodeEditable={false}
                  placeholder="Select Country Code*"
                  {...register("lead.mobileNumber", { required: false })}
                  onCountryChange={(value: any) => {
                    return;
                  }}
                  onBlur={() => {
                    return;
                  }}
                  onChange={() => {
                    return;
                  }}
                />
              </div>

              {/* <input
                type={"text"}
                className="form-control"
                {...register("lead.mobileNumber", {
                  required: true,
                })}
              /> */}
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
              {Errors?.language && (
                <div className="invalid-feedback">
                  Please select Home Language
                </div>
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
              {Errors?.race && (
                <div className="invalid-feedback">Please select Race</div>
              )}
            </div>
          </div>

          <NationalityStatus
            masterData={masterData}
            nationalityStatus={nationalityStatus}
            identificationType={identificationType}
          />
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default PersonalInformation;
