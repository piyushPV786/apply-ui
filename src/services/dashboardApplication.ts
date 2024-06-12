import { apiEndPoint, apiUrls } from "./config";
import { apiServer } from "./index";

class DashboardApplicationServices {
  async getApplicationData(leadId: string) {
    const url = `${apiUrls?.applyBaseUrl}lead/${leadId}/application`;
    const response = await apiServer.get(url);
    return response?.data;
  }
  async getAllProgram() {
    const url = `${apiUrls?.academicBaseUrl}${apiEndPoint?.programs}`;
    const response = await apiServer.get(url);
    return response?.data?.data ? response?.data?.data : [];
  }
  async getDocumentURL(fileName: string, studentCode: string) {
    const filetype = fileName.split(".")[1];
    const url = `${apiUrls?.commonBaseUrl}${apiEndPoint?.document}?filename=${fileName}&filetype=${filetype}&studentCode=${studentCode}`;
    const response = await apiServer.get(url);
    return response?.data;
  }
  async getRmatDetails(studentCode) {
    const route = apiEndPoint?.rmat.replace(":studentCode", studentCode);
    const url = `${apiUrls?.applyBaseUrl}${route}`;
    const response = await apiServer.get(url);
    return response?.data?.data ? response?.data?.data : [];
  }
}

export default new DashboardApplicationServices();
