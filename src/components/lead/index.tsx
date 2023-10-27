import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import Header from "../../components/common/header";
import { MainContainer } from "../../components/payment/payment";
import PersonalInformation from "../../components/lead/form/PersonalInformation";
import Address from "../../components/lead/form/Address";
import Education from "../../components/lead/form/Education";
import Sponsor from "../../components/lead/form/Sponser";
import Employment from "../../components/lead/form/Employment";
import Kin from "../../components/lead/form/Kin";
import { useFormHook } from "./customHooks/formHooks";
import StepperComponent from "../../components/stepper/stepper";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import { useHelperHook } from "./customHooks/helperHook";
import TermsAndCondition from "./form/TermsAndCondition";
import StyledButton from "../button/button";
import { FormContainer } from "../login/style";
import { mapFormDefaultValue } from "../../Util/Util";
import "react-phone-number-input/style.css";

interface IProps {
  applicationCode: string;
}

const LeadForm = (props: IProps) => {
  const methods = useForm();
  const { watch, handleSubmit } = methods;
  const masterData = useFormHook(props?.applicationCode);
  const { saveApplication, saveApplicationAsDraft } = useHelperHook(
    methods.watch
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
    return <>asdasdasdasd</>;
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
                    // onClick={handleSubmit((d) => saveApplicationAsDraft(d))}
                    onClick={saveApplicationAsDraft}
                    className="form-button btn-space"
                    title="Save As Draft"
                  />
                  <StyledButton
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
