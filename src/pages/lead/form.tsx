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

const LeadForm = () => {
  const { masterData, methods, saveApplication, saveApplicationAsDraft } =
    LeadFormCustomHook();

  return (
    <MainContainer>
      <Header />
      <StepperContainer>
        <StepperComponent active={0} />
      </StepperContainer>
      <FormProvider {...methods}>
        <form>
          <PersonalInformation masterData={masterData} />
          <Address masterData={masterData} />
          <Education masterData={masterData} />
          <Sponsor masterData={masterData} />
          <Employment masterData={masterData} />
          <Kin masterData={masterData} />
          <button onClick={saveApplication}>Save</button>
          <button onClick={saveApplicationAsDraft}>Save As Draft</button>
        </form>
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
