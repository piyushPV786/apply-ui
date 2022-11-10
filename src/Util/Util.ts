export const mapFormData = (data: any) => {
  let formData = data;
  if (formData) {
    for (let [key, value] of Object.entries(formData)) {
      if (key == "kinDetails" && formData[key]?.isKin == "no") {
        delete formData[key];
      }
      if (key == "sponsor" && formData[key]?.isSponsored === "no") {
        delete formData[key];
      }
      if (key == "employment" && formData[key]?.isEmployed == "no") {
        delete formData[key];
      }
      if (key === "mobileNumber") {
        delete formData[key];
      }
      if (key.includes("Id") && typeof formData[key] !== "object") {
        formData[key] = Number(value);
      }
      if (
        key === "identificationPassportNumber" &&
        typeof formData[key] !== "object"
      ) {
        formData[key] = Number(value);
      }
      if (key === "postalZipCode" && typeof formData[key] !== "object") {
        formData[key] = Number(value);
      }
      if (key === "residentialZipCode" && typeof formData[key] !== "object") {
        formData[key] = Number(value);
      }
      if (typeof formData[key] === "object") {
        mapFormData(formData[key]);
      }
    }

    return formData;
  }
};
