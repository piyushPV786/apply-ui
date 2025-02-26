import { validateNumber } from "../../../../Util/Util";

export const employmentData = [
  {
    name: "employmentStatusCode",
    label: "Employment Status",
    type: "employmentSelect",
    key: "employmentStatusData",
    option: [],
    required: false,
    errorMessage: "Please select employment status",
    hidden: false,
    disabled: false,
    placeholder: "",
  },
  {
    name: "employer",
    key: "employer",
    label: "Employer",
    type: "text",
    required: false,
    errorMessage: "Please enter employer",
    hidden: false,
    disabled: false,
    placeholder: "",
    numric: false,
  },
  {
    name: "jobTitle",
    key: "jobTitle",
    label: "Job Title",
    type: "text",
    required: false,
    errorMessage: "Please enter Job Title",
    hidden: false,
    disabled: false,
    placeholder: "",
    numric: false,
  },
  {
    name: "employmentIndustryCode",
    label: "Industry",
    type: "select",
    key: "employmentIndustryData",
    option: [],
    required: false,
    errorMessage: "Please select industry",
    hidden: false,
    disabled: false,
    placeholder: "",
  },
  {
    name: "managerName",
    key: "managerName",
    label: "Manager Name",
    type: "text",
    required: false,
    errorMessage: "Please enter manager name",
    hidden: false,
    disabled: false,
    placeholder: "",
    numric: false,
  },
  {
    name: "officeMobileNumber",
    countryCodeRegisterName: "officeMobileCountryCode",
    key: "officeMobileNumber",
    label: "Office Number",
    type: "mobileNumber",
    validate: validateNumber,
    required: false,
    errorMessage: "Please enter office mobile number",
    validateErrorMessage: "Invalid phone number",
    hidden: false,
    disabled: false,
    placeholder: "",
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    key: "countryData",
    option: [],
    required: false,
    errorMessage: "Please select country",
    hidden: false,
    disabled: false,
    placeholder: "",
  },
  {
    name: "state",
    label: "State/Provinces",
    type: "select",
    key: "state",
    option: [],
    required: false,
    errorMessage: "Please select State",
    hidden: false,
    disabled: false,
    placeholder: "",
  },
  {
    name: "city",
    key: "city",
    label: "City",
    type: "text",
    required: false,
    errorMessage: "Please enter your city name",
    hidden: false,
    disabled: false,
    placeholder: "",
    numric: false,
  },
  {
    name: "zipCode",
    key: "zipCode",
    label: "Pin Code / Zip Code",
    type: "zipCode",
    required: false,
    errorMessage: "Please enter Pin Code / Zip Code",
    hidden: false,
    disabled: false,
    placeholder: "",
    numric: true,
    rhfOptions: {
      maxLength: 10,
      minLength: 4,
      min: 1,
    },
  },
];

export const employedData = [
  {
    name: "jobTitle",
    key: "jobTitle",
    label: "Job Title",
    type: "text",
    required: false,
    errorMessage: "Please enter Job Title",
    hidden: false,
    disabled: false,
    placeholder: "",
    numric: false,
  },
  {
    name: "employmentIndustryCode",
    label: "Industry",
    type: "select",
    key: "employmentIndustryData",
    option: [],
    required: false,
    errorMessage: "Please select industry",
    hidden: false,
    disabled: false,
    placeholder: "",
  },
];
