import { useRouter } from "next/router";
import DocumentUploadPage from "../../components/documents";

const StudentPreview = () => {
  const router = useRouter();
  const applicationCode = router?.query?.applicationCode;

  return <DocumentUploadPage applicationCode={applicationCode} />;
};

export default StudentPreview;
