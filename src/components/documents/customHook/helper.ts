import axios from "axios";

export const documentPayload = (data, isDraft, masterData, progress) => {
  let result = {};
  if (masterData?.documentTypes && masterData?.userDetails?.lead?.studentCode) {
    let Files: any = [];
    masterData?.documentTypes.forEach((element) => {
      const fileObj = data[element?.code];
      const docCode = masterData?.documents?.find(
        (data) => data.documentTypeCode === element?.code,
      );
      if (
        (fileObj && fileObj?.length && fileObj?.[0]?.size > 0) ||
        (fileObj && fileObj?.file?.length > 0)
      ) {
        let Obj = {
          documentTypeCode: element?.code,
          fileName: fileObj?.[0]?.name || fileObj?.file?.[0]?.name,
          fileType: `.${fileObj?.[0]?.name?.split(".").pop() || fileObj?.file?.[0]?.name?.split(".").pop()}`,
          documentCode: progress[element?.code]?.documentCode || docCode?.code,
        };
        Files.push(Obj);
      }
    });
    if (Files?.length) {
      result = {
        files: Files,
        paymentModeCode: "OFFLINE",
        isDraft: isDraft,
        studentCode: masterData?.userDetails?.lead?.studentCode,
      };
    }
  }
  return result;
};

export const studentBursaryPayload = (res, masterData) => {
  let result = {
    bursaryId: res?.id,
    sanctionedAmount: 0,
    financialYear: new Date().getFullYear(),
    enrolmentCode: masterData?.userDetails?.applicationCode,
    studentCode: masterData?.userDetails?.lead?.studentCode,
    status: "BURSARY-REQUESTED",
    isActive: true,
  };

  return result;
};

export const signedUrlPayload = (response, payload) => {
  const signPayload: any = [];
  if (payload?.files) {
    payload?.files?.forEach((element, index) => {
      const ext = element?.fileName?.split(".").pop();
      const document = response?.find(
        (item) => item?.documenttypeCode === element?.documentTypeCode,
      );
      if (document) {
        signPayload?.push({
          fileName: `${document?.documentCode}.${ext}`,
          filetype: `${ext}`,
          studentCode: payload?.studentCode,
          file: element?.file[0],
          documentCode: document?.documentCode,
        });
      }
    });
  }
  return signPayload;
};

export const viewProofDetails = (url: string) => {
  const fileUrl = url.split("?");
  const data = fileUrl[0];
  const ext = data.split(".").pop();
  axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const file = new Blob([response.data], {
        type: ext === "pdf" ? "application/pdf" : "image/jpeg",
      });

      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
    .catch((error) => {
      console.log("Error viewing file", error.message);
    });
};
