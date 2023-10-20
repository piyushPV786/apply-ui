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
}

export default new ApplicationFormServices();
