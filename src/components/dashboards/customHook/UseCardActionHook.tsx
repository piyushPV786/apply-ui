import { APPLICATION_STATUS, CommonEnums } from "../../common/constant";

const UseCardActionHook = (applicationDetail) => {
  console.log("application Details =============>", applicationDetail);
  const { status, educationDetail, sponsor } = applicationDetail;
  const isEditBTN =
    status === CommonEnums.FEES_PENDING_STATUS ||
    status === CommonEnums.APP_FEE_DOC_VER_PEND ||
    status === CommonEnums.DRAFT_STATUS ||
    status === CommonEnums.APP_ENROLLED_ACCEPTED;

  const isRmatBTN = status === CommonEnums.RMAT_PENDING;

  const isPayBTN =
    status === CommonEnums.RESUB_APP_FEE_PROOF ||
    status === CommonEnums.APP_ENROLLED_ACCEPTED;

  const payBtnTitle =
    status === CommonEnums.APP_ENROLLED_ACCEPTED
      ? "Pay Program Fee"
      : "Pay Application Fee";

  const isUploadBTN =
    status === APPLICATION_STATUS.APPLICATION_DOCUMENTS_UPLOADED;

  const isBursaryBTN =
    status === CommonEnums.APP_ENROLLED_ACCEPTED &&
    educationDetail?.studentTypeCode === CommonEnums?.BURSARY &&
    sponsor?.sponsorModeType === CommonEnums?.EMPLOYEE_BURSARY;
  const isAdamiteBTN = status === CommonEnums.PROG_ADMITTED;
  return {
    isEditBTN,
    isRmatBTN,
    isPayBTN,
    payBtnTitle,
    isUploadBTN,
    isBursaryBTN,
    isAdamiteBTN,
  };
};

export default UseCardActionHook;
