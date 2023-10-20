import { useRouter } from "next/router";
import LeadForm from "../../components/lead";

const Form = () => {
  const router = useRouter();
  const applicationCode = router?.query?.applicationCode;
  return applicationCode ? (
    <LeadForm applicationCode={`${applicationCode}`} />
  ) : (
    <></>
  );
};
export default Form;
