import { useRouter } from "next/router";
import DocumentUploadPage from "../../components/documents";
import PaymentPage from "../../components/Payments";

const PaymentPreview = () => {
  const router = useRouter();
  const applicationCode = router?.query?.applicationCode;

  return <PaymentPage applicationCode={applicationCode} />;
};

export default PaymentPreview;
