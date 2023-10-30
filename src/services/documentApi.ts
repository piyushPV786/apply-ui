import { apiEndPoint, apiUrls } from "./config";
import { apiServer, refreshApiServer } from "./index";
import { apiStatus } from "../context/common";
import { getLocalStorageData } from "../Util/Util";
import { StorageName } from "../components/common/constant";
import axios from "axios";

class DocumentApplicationServices {
  commonBaseUrl: string | undefined = apiUrls?.commonBaseUrl;
  applyBaseUrl: string | undefined = apiUrls?.applyBaseUrl;

  async uploadDocuments(payload, applicationCode) {
    const url = `${this.applyBaseUrl}${apiEndPoint?.application}/${applicationCode}/document`;
    const response = await apiServer.post(url, payload);
    if (
      response?.status == apiStatus.success ||
      response?.status == apiStatus.success1
    ) {
      return response?.data;
    } else {
      return null;
    }
  }

  async downloadDeclarationLetter(applicationCode) {
    const url = `${this.applyBaseUrl}${apiEndPoint?.application}/${applicationCode}/${apiEndPoint?.declarationForm}`;
    const response = await apiServer.get(url, { responseType: "blob" });

    if (
      response?.status == apiStatus.success ||
      response?.status == apiStatus.success1
    ) {
      return response;
    } else {
      return null;
    }
  }

  async getDocumentsByApplicationCode(applicationCode) {
    const url = `${this.applyBaseUrl}${apiEndPoint?.application}/${apiEndPoint?.document}s/${applicationCode}`;
    const response = await apiServer.get(url);

    if (
      response?.status == apiStatus.success ||
      response?.status == apiStatus.success1
    ) {
      console.log("rs", response);
      return response?.data?.data;
    } else {
      return null;
    }
  }

  // async getFilePreview(fileName, studentCode) {
  //   const url = `/document?filename=${fileName}.${fileExt}`;
  //   await apiServer.get(url).then(({ data: url }) => {
  //     const fileUrl = url?.data?.split("?");
  //     const data = fileUrl[0];
  //     const ext = data.split(".").pop();
  //     axios
  //       .get(url?.data, {
  //         responseType: "arraybuffer",
  //       })
  //       .then((response) => {
  //         const file = new Blob([response.data], {
  //           type: ext === "pdf" ? "application/pdf" : "image/jpeg",
  //         });
  //         const fileURL = URL.createObjectURL(file);
  //         window.open(fileURL);
  //       })
  //       .catch((error) => {
  //         console.log("Error viewing file", error.message);
  //       });
  //   });
  // }

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

  async getApplicationData(applicationCode: string) {
    const studentDetails = getLocalStorageData(StorageName.STUDENT_DETAIL);
    const route = apiEndPoint?.applicationDetails
      .replace(":applicationCode", applicationCode)
      .replace(":leadCode", studentDetails?.leadCode);
    const url = `${apiUrls?.applyBaseUrl}${route}`;
    const response = await apiServer.get(url);
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }
}

export default new DocumentApplicationServices();
