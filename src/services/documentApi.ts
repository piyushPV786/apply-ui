import { apiEndPoint, apiUrls } from "./config";
import { apiServer } from "./index";
import { apiStatus } from "../context/common";
import { getLocalStorageData } from "../Util/Util";
import { StorageName } from "../components/common/constant";
import axios from "axios";

class DocumentApplicationServices {
  commonBaseUrl: string | undefined = apiUrls?.commonBaseUrl;
  applyBaseUrl: string | undefined = apiUrls?.applyBaseUrl;
  documentBaseURl: string | undefined = apiUrls?.documentBaseURl;

  async uploadDocuments(payload, applicationCode) {
    try {
      const url = `${this.applyBaseUrl}${apiEndPoint?.application}/${applicationCode}/document`;
      const response = await apiServer.post(url, payload);
      if (
        response?.status == apiStatus.success ||
        response?.status == apiStatus.success1
      ) {
        return response?.data?.data;
      } else {
        return null;
      }
    } catch (e) {}
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
      return response?.data?.data;
    } else {
      return null;
    }
  }

  async getFileUrl(fileName, studentCode) {
    const url = `${this.commonBaseUrl}document?filename=${fileName}&studentCode=${studentCode}`;
    const response = await apiServer.get(url);

    return response?.data?.data ? response?.data?.data : null;
  }

  async getFileSignUrl(fileName, filetype, studentCode) {
    const url = `${this.commonBaseUrl}document/upload?filename=${fileName}&filetype=${filetype}&&studentCode=${studentCode}`;
    const response = await apiServer.get(url);
    return response?.data?.data ? response?.data?.data : null;
  }

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

  async updateBursary(payload) {
    const route = apiEndPoint?.bursary;
    const url = `${apiUrls?.financeBaseUrl}${route}`;
    const response = await apiServer.post(url, { ...payload });
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }

  async updateStudentBursary(payload) {
    const route = `${apiEndPoint?.bursary}/${apiEndPoint.student}`;
    const url = `${apiUrls?.financeBaseUrl}${route}`;
    const response = await apiServer.post(url, { ...payload });
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }
  async uploadDocumentToAws(url, files, setUploadPercent?) {
    const response = await axios.put(url, files, {
      onUploadProgress: setUploadPercent,
    });
    return response ? response : null;
  }
  async updateDocumentStatus(documentCode: string) {
    const route = apiEndPoint?.updateDocumentStatus.replace(
      ":documentCode",
      documentCode
    );
    const url = `${apiUrls?.documentBaseURl}${route}`;
    const response = await apiServer.patch(url);
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }

  async DocumentCode() {
    const url = `${this.commonBaseUrl}${apiEndPoint?.documentCode}`;
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

  async documentUpdate(payload) {
    const url = `${this.documentBaseURl}${apiEndPoint?.document}`;
    const response = await apiServer.post(url, { ...payload });
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }

  async documentRemove(payload) {
    const url = `${this.documentBaseURl}${apiEndPoint?.documentRemove}/${payload}`;
    const response = await apiServer.delete(url);
    const result = response?.data?.data ? response?.data?.data : {};
    return result;
  }
}

export default new DocumentApplicationServices();
