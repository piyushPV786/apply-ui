import { apiEndPoint, apiUrls } from "./config";
import { apiServer } from "./index";

class DashboardApplicationServices {
  async getApplicationData(leadCode: string) {
    const url = `${apiUrls?.applyBaseUrl}lead/${leadCode}/application`;
    const response = await apiServer.get(url);
    return response?.data;
  }
  async getAllProgram() {
    const url = `${apiUrls?.academicBaseUrl}${apiEndPoint?.programAll}`;
    const response = await apiServer.get(url);
    return response?.data;
  }
}

export default new DashboardApplicationServices();
