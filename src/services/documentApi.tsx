import { apiEndPoint, apiUrls } from "./config";
import { apiServer, refreshApiServer } from "./index";
import { apiStatus } from "../context/common";

class DocumentApplicationServices {
  commonBaseUrl: string | undefined = apiUrls?.commonBaseUrl;

  async DocumentType() {
    const url = `${this.commonBaseUrl}${apiEndPoint?.commonDocuments}?projectDocument=false`;
    const response = await apiServer.get(url);
    if (
      response?.status == apiStatus.success ||
      response?.status == apiStatus.success1
    ) {
      return response?.data?.data;
    } else {
      return null;
    }
  }
}

export default new DocumentApplicationServices();
