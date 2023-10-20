import { FormProvider } from "react-hook-form";
import Header from "../../components/common/header";
import { MainContainer } from "../../components/payment/payment";
import PersonalInformation from "../../components/lead/form/PersonalInformation";
import Address from "../../components/lead/form/Address";
import Education from "../../components/lead/form/Education";
import Sponsor from "../../components/lead/form/Sponser";
import Employment from "../../components/lead/form/Employment";
import Kin from "../../components/lead/form/Kin";
import LeadFormCustomHook from "../../components/lead/customHooks/LeadFormCustomHook";
import StepperComponent from "../../components/stepper/stepper";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import { FormContainer } from "../../components/login/style";
import StyledButton from "../../components/button/button";
import TermsAndCondition from "../../components/lead/form/TermsAndCondition";

const LeadForm = () => {
  const router: any = useRouter();
  const applicationCode = router.query.applicationCode;
  const { masterData, methods, saveApplication, saveApplicationAsDraft } =
    LeadFormCustomHook();

  return (
    <MainContainer>
      <Header />
      <StepperContainer>
        <StepperComponent active={0} />
      </StepperContainer>
      <FormProvider {...methods}>
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
                  onClick={saveApplicationAsDraft}
                  className="form-button btn-space"
                  title="Save As Draft"
                />
                <StyledButton
                  onClick={saveApplication}
                  className="form-button btn-space"
                  title="Save & Next"
                />
              </div>
            </form>
          </div>
        </FormContainer>
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
