import { isValidEmail, validateNumber } from "../../../../Util/Util";

export const kinInfoData = [
  {
    name: "fullName",
    key: "fullName",
    label: "Full Name",
    type: "text",
    required: false,
    errorMessage: "Please enter your name",
    hidden: false,
    disabled: false,
    placeholder: "e.g Robert",
  },
  {
    name: "relationship",
    label: "Relationship",
    type: "select",
    key: "relationData",
    option: [],
    required: false,
    errorMessage: "Please enter relation ship",
    hidden: false,
    disabled: false,
    placeholder: "",
  },
  {
    name: "email",
    key: "email",
    label: "Email",
    type: "email",
    validate: isValidEmail,
    required: false,
    errorMessage: "Please enter kin email",
    validateErrorMessage:
      "you have entered an invalid email address. Please try again",
    hidden: false,
    disabled: false,
    placeholder: "e.g Robert",
  },
  {
    name: "mobileNumber",
    countryCodeRegisterName: "mobileCountryCode",
    key: "mobileNumber",
    label: "Mobile Number",
    type: "mobileNumber",
    validate: validateNumber,
    required: false,
    errorMessage: "Please enter kin mobile number",
    validateErrorMessage: "Invalid phone number",
    hidden: false,
    disabled: false,
    placeholder: "e.g Robert",
  },
];
