import { apiEndPoint, apiUrls } from "./config";
import { apiServer } from "./index";

class ApplicationFormServices {
  async getMasterData() {
    const url = `${apiUrls?.applyBaseUrl}${apiEndPoint?.loadMasterData}`;
    const response = await apiServer.get(url);
    return response?.data;
  }
  async getSalesAgentData() {
    const url = `${apiUrls?.userManagementBaseUrl}${apiEndPoint?.loadMasterData}`;
    const response = await apiServer.get(url);
    return response?.data;
  }
}

export default new ApplicationFormServices();
