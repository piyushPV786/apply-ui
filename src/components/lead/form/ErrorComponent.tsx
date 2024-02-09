import { Grid, TextField } from "@mui/material";
import { personalInfoData } from "./data/personalInfoData";
import { Typography } from "@material-ui/core";
import { EducationData } from "./data/educationData";
import { AddressData } from "./data/address";
import { sponsorInfoData } from "./data/sponsorData";
import { employmentData } from "./data/employmentData";
import { kinInfoData } from "./data/kinData";
const ErrorType = {
  Custom: "custom",
  Required: "required",
};
const ErrorComponent = ({ errors }: any) => {
  const GenerateArray = (DataArray, Data) => {
    return DataArray?.map((i) => {
      const value = errors?.[Data]?.[i?.name];

      return value?.type === ErrorType?.Custom
        ? value?.message
        : value?.type === ErrorType?.Required
        ? `Please enter ${i?.label}`
        : undefined;
    })?.filter((error) => error !== undefined);
  };
  const personalInfoDataLead = personalInfoData
    ?.map((i) => {
      const value = errors?.lead?.[i?.name];
      return value?.type === ErrorType?.Custom
        ? value?.message
        : value?.type === ErrorType?.Required
        ? `Please enter ${i?.label}`
        : undefined;
    })
    ?.filter((error) => error !== undefined);
  const educationData = GenerateArray(EducationData, "education");
  const sponsorData = GenerateArray(sponsorInfoData, "sponsor");
  const EmploymentData = GenerateArray(employmentData, "employment");
  const NextOfKin = GenerateArray(kinInfoData, "kin");
  const addressData = AddressData?.map((addressField, index) => {
    const error = errors?.address?.find(
      (errorField) => errorField[addressField.name]
    );

    if (error) {
      if (error[addressField.name].type === ErrorType.Custom) {
        return error[addressField.name].message;
      } else if (error[addressField.name].type === ErrorType.Required) {
        return `Please enter ${addressField.label}`;
      }
    }
    return undefined;
  })?.filter((error) => error !== undefined);

  return (
    <Grid container sx={{ p: 2 }}>
      {personalInfoDataLead?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={1.5}>
            <label className="form-check-label terms-conditions">
              Personal Information:
            </label>
          </Grid>
          <Grid xs={11}>
            <Typography variant="body2" color="error">
              {personalInfoDataLead?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
      {educationData?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={2}>
            <label className="form-check-label terms-conditions">
              Education and Module Details:
            </label>
          </Grid>
          <Grid xs={10}>
            <Typography variant="body2" color="error">
              {educationData?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
      {addressData?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={2}>
            <label className="form-check-label terms-conditions">
              Address Details:
            </label>
          </Grid>
          <Grid xs={10}>
            <Typography variant="body2" color="error">
              {addressData?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
      {sponsorData?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={2}>
            <label className="form-check-label terms-conditions">
              Sponsor Details:
            </label>
          </Grid>
          <Grid xs={10}>
            <Typography variant="body2" color="error">
              {sponsorData?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
      {EmploymentData?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={2}>
            <label className="form-check-label terms-conditions">
              Employed Details:
            </label>
          </Grid>
          <Grid xs={10}>
            <Typography variant="body2" color="error">
              {EmploymentData?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
      {NextOfKin?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={2}>
            <label className="form-check-label terms-conditions">
              Nex Of Kin Details:
            </label>
          </Grid>
          <Grid xs={10}>
            <Typography variant="body2" color="error">
              {NextOfKin?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
export default ErrorComponent;
