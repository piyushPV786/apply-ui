import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import Header from "../../components/common/header";
import PersonalInformation from "../../components/lead/form/PersonalInformation";
import Address from "../../components/lead/form/Address";
import Education from "../../components/lead/form/Education";
import Sponsor from "../../components/lead/form/Sponser";
import Employment from "../../components/lead/form/Employment";
import Kin from "../../components/lead/form/Kin";
import { useFormHook } from "./customHooks/formHooks";
import StepperComponent from "../../components/stepper/stepper";
import styled from "styled-components";
import { CircularProgress, Container } from "@material-ui/core";
import { useHelperHook } from "./customHooks/helperHook";
import TermsAndCondition from "./form/TermsAndCondition";
import StyledButton from "../button/button";
import { FormContainer, MainContainer } from "../login/style";
import { mapFormDefaultValue } from "../../Util/Util";
import "react-phone-number-input/style.css";
import { Stack } from "@mui/material";
import { Spinner } from "../Loader";

interface IProps {
  applicationCode: string;
}

const LeadForm = (props: IProps) => {
  const methods = useForm();
  const { watch, handleSubmit, setError } = methods;
  const masterData = useFormHook(props?.applicationCode);
  const { saveApplication, saveApplicationAsDraft } = useHelperHook(
    masterData,
    watch,
    setError
  );
  const programCode = watch("education.programCode");
  const applicationData: any = masterData?.applicationData;
  //Setting values in form after data fetch
  useEffect(() => {
    if (masterData?.applicationData) {
      mapFormDefaultValue(masterData?.applicationData, methods.setValue);
    }
  }, [applicationData?.applicationCode]);
  //form code  ends
  if (!masterData?.masterData) {
    return (
      <>
        <Stack alignItems="center">
          <Spinner />
        </Stack>
      </>
    );
  }

  return (
    <MainContainer>
      <Header />
      <StepperContainer>
        <StepperComponent active={0} />
      </StepperContainer>
      <FormProvider {...methods}>
        {masterData?.masterData && (
          <FormContainer>
            <div className="application-form">
              <form>
                <PersonalInformation masterData={masterData} />
                <Address masterData={masterData} />
                <Education masterData={masterData} />
                <Sponsor masterData={masterData} />
                <Employment masterData={masterData} />
                <Kin masterData={masterData} />
                <TermsAndCondition />
                <div className="mt-4 text-center">
                  <StyledButton
                    style={{ marginRight: "10px" }}
                    onClick={saveApplicationAsDraft}
                    className="form-button btn-space"
                    title="Save As Draft"
                  />
                  <StyledButton
                    disabled={!watch("lead.isAgreedTermsAndConditions")}
                    onClick={handleSubmit((d) => saveApplication(d))}
                    className="form-button btn-space"
                    title="Save & Next"
                  />
                </div>
              </form>
            </div>
          </FormContainer>
        )}
      </FormProvider>
    </MainContainer>
  );
};
export default LeadForm;

export const StepperContainer = styled(Container)`
  width: 50%;
  @media (max-width: 510px) {
    width: 100%;
  }
`;
