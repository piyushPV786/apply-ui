import { useRouter } from "next/router";
import DocumentUploadSuccessPage from "../../../components/documents/DocumentUploadSuccess";
import DocumentSaveSuccess from "../../../components/documents/DocumentSaveSuccess";

const StudentPreview = () => {
  const router = useRouter();
  const result = router?.query?.result;
  if (result == "uploadSuccess") return <DocumentUploadSuccessPage />;
  if (result == "draftSaveSuccess") return <DocumentSaveSuccess />;
};

export default StudentPreview;
