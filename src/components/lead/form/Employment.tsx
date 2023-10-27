import { useFormContext } from "react-hook-form";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import Image from "next/image";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DollarIcon from "../../../../public/assets/images/dollar-symbol-svgrepo-com.svg";
import { IMasterData } from "../../common/types";
import CommonAutocomplete from "./components/CommonAutocomplete ";
import RadioField from "./components/RadioField";
import { employmentData } from "./data/employmentData";
import TextField from "./components/TextField";
import { useAddressHook } from "../customHooks/addressHooks";

const Employment = (props: any) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const { masterData, applicationData } = props?.masterData;

  const activeEmp = watch("employment.isActive");
  const Errors = errors["employment"] as any;

  const countryDetail = watch(`employment.country`);
  const stateDetails: any = useAddressHook(countryDetail);
  const stateList = stateDetails[countryDetail];

  return (
    <StyledAccordion
      defaultExpanded={false}
      expanded={activeEmp === "true" || activeEmp === true}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <GreenFormHeading>
          <Image alt="Dollar" src={DollarIcon} className="me-2" />
          Are you Employed? <span className="text-danger me-2">*</span>
        </GreenFormHeading>
        <RadioField
          registerName={"employment.isActive"}
          defaultValue={applicationData?.employment?.isActive}
          defaultChecked={applicationData?.employment?.isActive}
        />
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid">
          <div className="row">
            {employmentData?.map((element) => (
              <>
                {element?.type === "text" && (
                  <TextField
                    element={element}
                    Errors={Errors}
                    registerName={`employment.${element?.name}`}
                  />
                )}
                {element?.type === "select" && element?.key !== "state" && (
                  <div className="col-lg-4 mb-4">
                    <CommonAutocomplete
                      options={
                        masterData[element?.key]
                          ? masterData[element?.key]
                          : element.option
                      }
                      label={element?.label}
                      registerName={`employment.${element?.name}`}
                      required={true}
                      defaultValue={
                        applicationData && applicationData?.employment
                          ? applicationData?.employment[element?.name]
                          : null
                      }
                    />
                    {Errors && Errors[element?.name] && (
                      <div className="invalid-feedback">
                        {element?.errorMessage}
                      </div>
                    )}
                  </div>
                )}
                {element?.type === "select" && element?.key === "state" && (
                  <div className="col-lg-4 mb-4">
                    <CommonAutocomplete
                      options={stateList ? stateList : element.option}
                      label={element?.label}
                      registerName={`employment.${element?.name}`}
                      required={true}
                      defaultValue={
                        applicationData && applicationData?.employment
                          ? applicationData?.employment[element?.name]
                          : null
                      }
                    />
                    {Errors && Errors[element?.name] && (
                      <div className="invalid-feedback">
                        {element?.errorMessage}
                      </div>
                    )}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Employment;
