import { useRouter } from "next/router";
import LeadForm, { StepperContainer } from "../../components/lead";
import Header from "../../components/common/header";
import StepperComponent from "../../components/stepper/stepper";

const Form = () => {
  const router = useRouter();
  const applicationCode = router?.query?.applicationCode;
  return applicationCode ? (
    <>
      <LeadForm applicationCode={`${applicationCode}`} />
    </>
  ) : (
    <></>
  );
};
export default Form;
