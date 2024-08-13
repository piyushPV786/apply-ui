export enum refferedById {
  agent = "Agent",
  social = "Social Media",
}

export enum nationalityStatusEnum {
  PRSA = "PRSA",
  SA = "SA",
  IdentificationNumberSmart = "Identification number must be 13 digits and contain only numbers for smartID, e.g.- YYMMDD1234567",
  IdentificationNumberPassport = "Passport number must be valid, e.g:- P4366918",
}

export enum ErrorMessage {
  discountErrorMessage = "Discount Code Not Applicable",
}

export enum SuccessMessage {
  discountSuccessMessage = "Discount Applied Successfully With Discount Percentage ",
}

export const patternForSMARTID =
  /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))((\d{4})(\d{3})|(\d{7}))$/;

export const patternForPassport = /^[A-Z0-9]{6,9}$/;