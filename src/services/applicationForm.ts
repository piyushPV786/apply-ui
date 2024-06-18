import { getLocalStorageData } from "../Util/Util";
import { StorageName } from "../components/common/constant";
import { apiEndPoint, apiUrls } from "./config";
import { apiServer } from "./index";

class ApplicationFormServices {
  async getMasterData() {
    const url = `${apiUrls?.applyBaseUrl}${apiEndPoint?.loadMasterData}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }
  async getSalesAgentData() {
    const url = `${apiUrls?.userManagementBaseUrl}${apiEndPoint?.salesAgent}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;

    return result;
  }

  async getProgramData() {
    const url = `${apiUrls?.academicBaseUrl}${
      apiEndPoint?.programs
    }?project=${false}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async getApplicationData(applicationCode: string) {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    const route = apiEndPoint?.applicationDetails
      .replace(
        ":applicationCode",
        applicationCode.includes("RAPP")
          ? applicationCode
          : `${applicationCode}?isDraft=true`
      )
      .replace(":leadId", studentDetails?.leadId);
    const url = `${apiUrls?.applyBaseUrl}${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async getStudentProgram(programCode: string) {
    const route = apiEndPoint?.studentProgram.replace(
      ":programCode",
      programCode
    );
    const url = `${apiUrls?.financeBaseUrl}${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async getStateList(countryCode: string) {
    const route = apiEndPoint?.stateDetails.replace(
      ":countryCode",
      countryCode
    );
    const url = `${apiUrls?.commonBaseUrl}${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }
  async getNationalityStatus() {
    const url = `${apiUrls?.commonBaseUrl}${apiEndPoint?.nationalityStatus}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async getStudyModes() {
    const url = `${apiUrls?.commonBaseUrl}${apiEndPoint?.studyModes}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async getIdentificationType() {
    const url = `${apiUrls?.commonBaseUrl}${apiEndPoint?.identificationType}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async createDraft(payload) {
    const url = `${apiUrls?.applyBaseUrl}${apiEndPoint?.draft}`;
    const response = await apiServer.post(url, payload);
    const result = response?.data ? response?.data : null;
    return result;
  }
  async updateDraft(payload, applicationCode) {
    const url = `${apiUrls?.applyBaseUrl}${apiEndPoint?.draft}/${applicationCode}`;
    const response = await apiServer.put(url, payload);
    const result = response?.data ? response?.data : null;
    return result;
  }

  async createLead(payload, isDraft) {
    const url = `${apiUrls?.applyBaseUrl}${apiEndPoint?.lead}?isDraft=${isDraft}`;
    const response = await apiServer.post(url, payload);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async updateLead(payload, applicationCode) {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    const url = `${apiUrls?.applyBaseUrl}${apiEndPoint?.lead}/${studentDetails?.leadId}/${apiEndPoint?.application}/${applicationCode}?isDraft=false`;
    const response = await apiServer.put(url, payload);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }
  async getTermsAndConditionFile(name: string, email: string) {
    const Name = name.replace(/ /g, "-");

    let route = apiEndPoint?.termAndCondFile.replace(":name", Name);
    route = route.replace(":email", email);
    const url = `${apiUrls?.applyBaseUrl}${route}`;
    const response = await apiServer.get(url, { responseType: "blob" });
    const result = response?.data ? response?.data : null;
    return result;
  }
  async checkDuplicateEmail(email: string) {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    const route = apiEndPoint?.checkDuplicateEmail
      .replace(":email", email)
      .replace(":leadId", studentDetails?.leadId);
    const url = `${apiUrls?.applyBaseUrl}${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }
  async checkDuplicateIdNumber(idNumber: string) {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    const route = apiEndPoint?.checkDuplicateIdNumber
      .replace(":idNumber", idNumber)
      .replace(":leadId", studentDetails?.leadId);
    const url = `${apiUrls?.applyBaseUrl}${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async updateCreditReport(id: string, updateCreditPayload : { isImmediate : boolean}) {
    const url = `${apiUrls?.financeBaseUrl}${apiEndPoint?.updateCredit}/${id}/new`;
    const response = await apiServer.patch(url, updateCreditPayload);
    const result = response?.data ? response?.data : null;
    return result;
  }
}

export default new ApplicationFormServices();
