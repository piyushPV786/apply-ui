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
    const url = `${apiUrls?.academicBaseUrl}${apiEndPoint?.programs}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }

  async getApplicationData(applicationCode: string) {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    const route = apiEndPoint?.applicationDetails
      .replace(":applicationCode", applicationCode)
      .replace(":leadCode", studentDetails?.leadCode);
    const url = `${apiUrls?.applyBaseUrl}${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    console.log("result", result);
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
  async getIdentificationType() {
    const url = `${apiUrls?.commonBaseUrl}${apiEndPoint?.identificationType}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : null;
    return result;
  }
}

export default new ApplicationFormServices();
