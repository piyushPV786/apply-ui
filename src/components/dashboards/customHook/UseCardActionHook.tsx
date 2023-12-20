import {
  APPLICATION_STATUS,
  CommonEnums,
  UPLOAD_DOCUMENT_BUTTON_STATUS,
  BURSARY_BUTTON_STATUS,
} from "../../common/constant";
import DashboardApplicationServices from "../../../services/dashboardApplication";
import { downloadDocument } from "../../../Util/Util";
import { useState } from "react";

const UseCardActionHook = (applicationDetail) => {
  const { status, education, sponsor, document, studentCode } =
    applicationDetail;

  const [openCredentialDialog, setOpenCredentialDialog] = useState(false);

  const [rmatOpen, setRmatOpen] = useState({
    state: false,
    rmaturl: "",
    password: "",
    username: "",
  });

  const getRmatDetails = async () => {
    const response = await DashboardApplicationServices.getRmatDetails(
      applicationDetail?.applicationCode
    );

    setRmatOpen({
      state: true,
      rmaturl: response?.url,
      password: response?.password,
      username: response?.username,
    });
  };

  const isEditBTN =
    status === CommonEnums.FEES_PENDING_STATUS ||
    status === CommonEnums.APP_FEE_DOC_VER_PEND ||
    status === CommonEnums.DRAFT_STATUS ||
    status === CommonEnums.APP_ENROLLED_ACCEPTED;

  const isRmatBTN = status === CommonEnums.RMAT_PENDING;

  const isPayBTN =
    status === CommonEnums.RESUB_APP_FEE_PROOF ||
    status === CommonEnums.APP_ENROLLED_ACCEPTED ||
    status === APPLICATION_STATUS.APPLICATION_FEE_PENDING;

  const payBtnTitle =
    status === CommonEnums.APP_ENROLLED_ACCEPTED
      ? "Pay Program Fee"
      : "Pay Application Fee";

  const isUploadBTN = UPLOAD_DOCUMENT_BUTTON_STATUS.includes(status);

  const isUploadBTNTitle =
    status === CommonEnums.BURSARY_LETTER_PEND &&
    education?.studentTypeCode === CommonEnums?.BURSARY
      ? "Upload Bursary Letter"
      : "Upload Documents";

  const isBursaryBTN =
    BURSARY_BUTTON_STATUS.includes(status) &&
    education?.studentTypeCode === CommonEnums?.BURSARY;
  const isAdamiteBTN = status === CommonEnums.PROG_ADMITTED;
  const documentData = document?.filter((item) => {
    return (
      (item?.documentTypeCode === CommonEnums.CONFIRMATION_LETTER &&
        status === CommonEnums?.PROG_ADMITTED) ||
      item?.documentTypeCode === CommonEnums.ACCEPTANCE_LETTER ||
      item?.documentTypeCode === CommonEnums.WELCOME_LETTER
    );
  });

  const getDownloadDocument = async (documentDetail) => {
    const { name } = documentDetail;
    const documentResponse = await DashboardApplicationServices?.getDocumentURL(
      name,
      studentCode
    );
    downloadDocument(documentResponse?.data, name);
  };

  return {
    isEditBTN,
    isRmatBTN,
    isUploadBTNTitle,
    isPayBTN,
    payBtnTitle,
    isUploadBTN,
    isBursaryBTN,
    isAdamiteBTN,
    documentData,
    getDownloadDocument,
    openCredentialDialog,
    setOpenCredentialDialog,
    rmatOpen,
    getRmatDetails,
    setRmatOpen,
  };
};

export default UseCardActionHook;