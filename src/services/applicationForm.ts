import { apiEndPoint, apiUrls } from "./config";
import apiServer from "./index";

class ApplicationFormServices {
  async getMasterData() {
    const url = `${apiUrls?.applyBaseUrl}${apiEndPoint?.loadMasterData}`;
    const response = await apiServer.get(url);
    return response;
  }
}

export default new ApplicationFormServices();
