import { getLocalStorageData } from "../Util/Util";
import { StorageName } from "../components/common/constant";
import { createCreditVettingForType } from "../components/common/types";
import { apiEndPoint, apiUrls } from "./config";
import { apiServer } from "./index";

class ApplicationFormServices {
  async getMasterData() {
    const url = `${apiUrls?.baseApiURL}apply/${apiEndPoint?.loadMasterData}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }
  async getSalesAgentData() {
    const url = `${apiUrls?.baseApiURL}user-management/${apiEndPoint?.salesAgent}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;

    return result;
  }

  async getProgramData() {
    const url = `${apiUrls?.baseApiURL}academics/${
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
          : `${applicationCode}?isDraft=true`,
      )
      .replace(":leadId", studentDetails?.leadId);
    const url = `${apiUrls?.baseApiURL}apply/${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async getStudentProgram(programCode: string) {
    const route = apiEndPoint?.studentProgram.replace(
      ":programCode",
      programCode,
    );
    const url = `${apiUrls?.baseApiURL}finance/${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async getStateList(countryCode: string) {
    const route = apiEndPoint?.stateDetails.replace(
      ":countryCode",
      countryCode,
    );
    const url = `${apiUrls?.baseApiURL}common/${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }
  async getNationalityStatus() {
    const url = `${apiUrls?.baseApiURL}common/${apiEndPoint?.nationalityStatus}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async getStudyModes() {
    const url = `${apiUrls?.baseApiURL}common/${apiEndPoint?.studyModes}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async getIdentificationType() {
    const url = `${apiUrls?.baseApiURL}common/${apiEndPoint?.identificationType}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async createDraft(payload) {
    const url = `${apiUrls?.baseApiURL}apply/${apiEndPoint?.draft}`;
    const response = await apiServer.post(url, payload);
    const result = response?.data ? response?.data : null;
    return result;
  }
  async updateDraft(payload, applicationCode) {
    const url = `${apiUrls?.baseApiURL}apply/${apiEndPoint?.draft}/${applicationCode}`;
    const response = await apiServer.put(url, payload);
    const result = response?.data ? response?.data : null;
    return result;
  }

  async createLead(payload, isDraft) {
    const url = `${apiUrls?.baseApiURL}apply/${apiEndPoint?.lead}?isDraft=${isDraft}`;
    const response = await apiServer.post(url, payload);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async updateLead(payload, applicationCode) {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    const url = `${apiUrls?.baseApiURL}apply/${apiEndPoint?.lead}/${studentDetails?.leadId}/${apiEndPoint?.application}/${applicationCode}?isDraft=false`;
    const response = await apiServer.put(url, payload);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }
  async getTermsAndConditionFile(name: string, email: string) {
    const Name = name.replace(/ /g, "-");

    let route = apiEndPoint?.termAndCondFile.replace(":name", Name);
    route = route.replace(":email", email);
    const url = `${apiUrls?.baseApiURL}apply/${route}`;
    const response = await apiServer.get(url, { responseType: "blob" });
    const result = response?.data ? response?.data : null;
    return result;
  }
  async checkDuplicateEmail(email: string) {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    const route = apiEndPoint?.checkDuplicateEmail
      .replace(":email", email)
      .replace(":leadId", studentDetails?.leadId);
    const url = `${apiUrls?.baseApiURL}apply/${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }
  async checkDuplicateIdNumber(idNumber: string) {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    const route = apiEndPoint?.checkDuplicateIdNumber
      .replace(":idNumber", idNumber)
      .replace(":leadId", studentDetails?.leadId);
    const url = `${apiUrls?.baseApiURL}apply/${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async updateCreditReport(
    id: string,
    updateCreditPayload: {
      createCreditVettingFor: createCreditVettingForType;
    },
  ) {
    const url = `${apiUrls?.baseApiURL}finance/${apiEndPoint?.updateCredit}/${id}/new`;
    const response = await apiServer.post(url, updateCreditPayload);
    const result = response?.data ? response?.data : null;
    return result;
  }
}

export default new ApplicationFormServices();
