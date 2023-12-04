import axios from "axios";

export const documentPayload = (data, isDraft, masterData) => {
  let result = {};
  if (masterData?.documentTypes && masterData?.userDetails?.studentCode) {
    let Files: any = [];
    masterData?.documentTypes.forEach((element) => {
      const fileObj = data[element?.code];
      if (fileObj && fileObj?.length && fileObj[0]?.size > 0) {
        let Obj = {
          documentTypeCode: element?.code,
          fileName: fileObj[0]?.name,
          fileType: fileObj[0].type,
          file: fileObj,
        };
        Files.push(Obj);
      }
    });
    if (Files?.length) {
      result = {
        files: Files,
        paymentModeCode: "OFFLINE",
        isDraft: isDraft,
        studentCode: masterData?.userDetails?.studentCode,
      };
    }
  }
  return result;
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
