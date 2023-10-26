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
import { personalInfoData } from "./data/personalInfoData";
import TextField from "./components/TextField";
import DateField from "./components/DateField";
import EmailField from "./components/EmailField";

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
  console.log("errors ======>", Errors);

  useEffect(() => {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    setValue("lead.mobileNumber", studentDetails?.mobileNumber);
  }, []);

  console.log("master Data ========>", masterData);

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
            {personalInfoData?.map((element) => (
              <>
                {element?.type === "text" && (
                  <TextField
                    element={element}
                    Errors={Errors}
                    registerName={`lead.${element?.name}`}
                    disabled={element?.disabled}
                  />
                )}
                {element?.type === "select" && (
                  <div className="col-lg-4 mb-4">
                    <CommonAutocomplete
                      options={
                        masterData[element?.key]
                          ? masterData[element?.key]
                          : element.option
                      }
                      label={element?.label}
                      registerName={`lead.${element?.name}`}
                      required={true}
                    />
                    {Errors && Errors[element?.name] && (
                      <div className="invalid-feedback">
                        {element?.errorMessage}
                      </div>
                    )}
                  </div>
                )}
                {element?.type === "date" && (
                  <DateField
                    element={element}
                    Errors={Errors}
                    registerName={`lead.${element?.name}`}
                  />
                )}
                {element?.type === "email" && (
                  <EmailField
                    element={element}
                    Errors={Errors}
                    registerName={`lead.${element?.name}`}
                  />
                )}
              </>
            ))}
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
