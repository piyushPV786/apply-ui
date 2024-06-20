import { Grid, TextField } from "@mui/material";
import { personalInfoData } from "./data/personalInfoData";
import { Typography } from "@material-ui/core";
import { EducationData } from "./data/educationData";
import { AddressData } from "./data/address";
import { sponsorInfoData } from "./data/sponsorData";
import { employmentData } from "./data/employmentData";
import { kinInfoData } from "./data/kinData";
import { NationalityData, NationalityStatusEnum } from "./data/nationality";
import NationalityStatus from "./components/NationalityStatus";
import { ReferredByData } from "./data/referredByData";

const ErrorType = {
  Custom: "custom",
  Required: "required",
  Validate: "validPhoneNumber",
  Manual: "manual",
  Valid: "validate",
};
const ErrorComponent = ({ errors }: any) => {
  const GenerateArray = (DataArray, Data) => {
    return DataArray?.map((i) => {
      const value = errors?.[Data]?.[i?.name];

      return value?.type === ErrorType?.Custom
        ? value?.message
        : value?.type === ErrorType?.Valid
        ? value?.message
        : value?.type === ErrorType?.Required
        ? `Please enter ${i?.label}`
        : value?.type === ErrorType?.Validate
        ? value?.message
        : value?.type === ErrorType?.Manual
        ? value?.message
        : undefined;
    })?.filter((error) => error !== undefined);
  };
  const personalInfoDataLead = GenerateArray(personalInfoData, "lead");
  const educationData = GenerateArray(EducationData, "education");
  const sponsorData = GenerateArray(sponsorInfoData, "sponsor");
  const EmploymentData = GenerateArray(employmentData, "employment");
  const NextOfKin = GenerateArray(kinInfoData, "kin");
  const referredByData = GenerateArray(ReferredByData, "education");
  const Nationality = GenerateArray(NationalityData, "lead") || [];
  const nationalities = Nationality.includes(NationalityStatusEnum?.Error)
    ? [NationalityStatusEnum?.Error]
    : Nationality;

  const personalInfoDataLeadUpdate = [
    ...personalInfoDataLead,
    ...nationalities,
  ];

  const AddressArray = () => {
    const Addresses: any = {
      postal: [],
      residential: [],
    };

    AddressData?.map((addressField) => {
      if (errors?.address?.length > 0) {
        errors?.address?.forEach((err, index) => {
          const prefix =
            index === 0
              ? "Please enter postal"
              : index === 1
              ? "Please enter residential"
              : "";

          if (err) {
            const errorMessage =
              err[addressField.name]?.type === ErrorType.Custom
                ? `${prefix} ${err[addressField?.name]?.message}`
                : err[addressField?.name]?.type === ErrorType.Required
                ? `${prefix} ${addressField?.label}`
                : undefined;

            if (index === 0) {
              Addresses?.postal.push(errorMessage);
            } else if (index === 1) {
              Addresses?.residential.push(errorMessage);
            }
          }
        });
      }
    });

    return Addresses;
  };

  const PostalAddress = AddressArray()?.postal;
  const ResidentialAddress = AddressArray()?.residential;

  return (
    <Grid container sx={{ p: 2 }}>
      {referredByData?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={12} md={1.5} lg={1.5}>
            <label className="form-check-label terms-conditions">
              Referred By :
            </label>
          </Grid>
          <Grid xs={12} md={11} lg={11}>
            <Typography variant="body2" color="error">
              {referredByData?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
      {personalInfoDataLeadUpdate?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={12} md={1.5} lg={1.5}>
            <label className="form-check-label terms-conditions">
              Personal Information:
            </label>
          </Grid>
          <Grid xs={12} md={11} lg={11}>
            <Typography variant="body2" color="error">
              {personalInfoDataLeadUpdate?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
      {educationData?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={12} md={1.5} lg={1.5}>
            <label className="form-check-label terms-conditions">
              Education and Module Details:
            </label>
          </Grid>
          <Grid xs={12} md={11} lg={11}>
            <Typography variant="body2" color="error">
              {educationData?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}

      {PostalAddress.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={12} md={1.5} lg={1.5}>
            <label className="form-check-label terms-conditions">
              Postal Address Details
            </label>
          </Grid>
          <Grid xs={12} md={11} lg={11}>
            <Typography variant="body2" color="error">
              {PostalAddress?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
      {ResidentialAddress?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={12} md={1.5} lg={1.5}>
            <label className="form-check-label terms-conditions">
              Residential Address Details:
            </label>
          </Grid>
          <Grid xs={12} md={11} lg={11}>
            <Typography variant="body2" color="error">
              {ResidentialAddress?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
      {sponsorData?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={12} md={1.5} lg={1.5}>
            <label className="form-check-label terms-conditions">
              Sponsor Details:
            </label>
          </Grid>
          <Grid xs={12} md={11} lg={11}>
            <Typography variant="body2" color="error">
              {sponsorData?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
      {EmploymentData?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={12} md={1.5} lg={1.5}>
            <label className="form-check-label terms-conditions">
              Employed Details:
            </label>
          </Grid>
          <Grid xs={12} md={11} lg={11}>
            <Typography variant="body2" color="error">
              {EmploymentData?.filter((error) => error)?.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      )}
      {NextOfKin?.length > 0 && (
        <Grid item xs={12}>
          <Grid item xs={12} md={1.5} lg={1.5}>
            <label className="form-check-label terms-conditions">
              Nex Of Kin Details:
            </label>
          </Grid>
          <Grid xs={12} md={11} lg={11}>
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
