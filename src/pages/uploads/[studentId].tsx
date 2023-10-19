import { useRouter } from "next/router";
import DocumentUploads from "./index";

const StudentPreview = () => {
  const router: any = useRouter();
  const studentCode = router.query.studentCode;

  return <DocumentUploads />;
};

export default StudentPreview;
