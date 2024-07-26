import Image from "next/image";
import { useEffect, useState } from "react";
import { GreyStyledAccordion, StyledLabel } from "../../../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import AddressImg from "../../../../../public/assets/images/address-card-outlined-svgrepo-com.svg";
import CommonAutocomplete from "./CommonAutocomplete ";
import { Controller, useFormContext } from "react-hook-form";
import { nationalityStatusEnum } from "../../../../constants";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  formatDate,
  idNumberValidation,
  isValidExpiryDate,
} from "../../../../Util/Util";

const NationalityStatus = (props: any) => {
  const { masterData, nationalityStatus, identificationType, applicationData } =
    props?.masterData;
  const {
    trigger,
    formState: { errors },
    watch,
    setValue,
    setError,
    control,
    clearErrors,
  } = useFormContext();

  const [nationalityStatusValue, setNationalityStatus] = useState("");
  const nationalityStatusWatch = watch("lead.nationalityStatus");
  const docTypeWatch = watch("lead.identificationDocumentType");

  useEffect(() => {
    if (nationalityStatusWatch) {
      setNationalityStatus(nationalityStatusWatch);
      if (nationalityStatusWatch === nationalityStatusEnum.PRSA) {
        setValue("lead.permenantResident", nationalityStatusEnum.SA);
      } else if (nationalityStatusWatch === nationalityStatusEnum.SA) {
        setValue("lead.nationality", nationalityStatusEnum.SA);
        clearErrors("lead.nationality");
      }
    }
  }, [nationalityStatusWatch]);

  const Errors = errors["lead"] as any;

  const validateIdNumber = (value: string) => {
    if (docTypeWatch === "SMARTID") {
      if (!/^\d{13}$/.test(value)) {
        return "Identification number must be 13 digits and contain only numbers for smartID.";
      }
    }
    return true;
  };

  return (
    <GreyStyledAccordion
      expanded={!!nationalityStatusValue}
      defaultExpanded={false}
    >
      <AccordionSummary className="nationality-card">
        <div className="me-4">
          <span className="me-2">
            <Image className="user-icon-circle" src={AddressImg} alt="user" />
          </span>
          <StyledLabel required>Nationality Status</StyledLabel>
        </div>
        {!!nationalityStatus?.length && (
          <CommonAutocomplete
            defaultValue={applicationData?.lead?.nationalityStatus}
            options={nationalityStatus}
            label={null}
            registerName={"lead.nationalityStatus"}
            required={true}
            onChange={() => {
              setValue("lead.nationality", "");
              setValue("lead.identificationDocumentType", "");
              setValue("lead.identificationNumber", "");
            }}
          />
        )}
        <div>
          {Errors?.nationalityStatus && (
            <div className="invalid-feedback">
              Please Select Nationality Status
            </div>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="container-fluid form-padding">
          <div className="row">
            {!!masterData?.nationalityData?.length &&
              nationalityStatusValue === nationalityStatusEnum.PRSA && (
                <div className="col-md-4 mb-4">
                  <CommonAutocomplete
                    options={masterData?.nationalityData}
                    label="Permanent Resident"
                    registerName={"lead.permenantResident"}
                    required={true}
                    disabled={true}
                    defaultValue={"ZAR"}
                  />
                  {Errors?.permanentResident && nationalityStatusWatch && (
                    <div className="invalid-feedback">
                      Please Select Permanent Resident
                    </div>
                  )}
                </div>
              )}

            <div className="col-md-4 mb-4">
              {!!masterData?.nationalityData?.length &&
                nationalityStatusValue && (
                  <CommonAutocomplete
                    defaultValue={
                      nationalityStatusValue === nationalityStatusEnum.SA
                        ? nationalityStatusEnum.SA
                        : null
                    }
                    disabled={
                      nationalityStatusValue === nationalityStatusEnum.SA
                    }
                    options={masterData?.nationalityData}
                    label="Nationality"
                    registerName={"lead.nationality"}
                    required={true}
                  />
                )}
              {Errors?.nationality && nationalityStatusWatch && (
                <div className="invalid-feedback">
                  Please Select Nationality
                </div>
              )}
            </div>
            <div className="col-md-4 mb-4">
              {!!identificationType?.length && (
                <CommonAutocomplete
                  defaultValue={
                    applicationData?.lead?.identificationDocumentType
                  }
                  options={identificationType}
                  label="Identification Document Type"
                  registerName={"lead.identificationDocumentType"}
                  required={true}
                />
              )}
              {Errors?.identificationDocumentType && nationalityStatusWatch && (
                <div className="invalid-feedback">
                  Please Select Document Type
                </div>
              )}
            </div>
            {docTypeWatch == "PASSPORT" && (
              <div className="col-md-4 mb-4">
                <StyledLabel required>Expiry Date</StyledLabel>
                <Controller
                  name="lead.passportExpiryDate"
                  control={control}
                  defaultValue={null}
                  rules={{
                    required: "Expiry Date is required",
                    validate: isValidExpiryDate,
                  }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        value={
                          field.value ? dayjs(new Date(field.value)) : null
                        }
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "2px solid #ced4da",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "8px !important",
                          },
                          width: "100%",
                        }}
                        minDate={dayjs(new Date())}
                      />
                    </LocalizationProvider>
                  )}
                />
                {Errors?.passportExpiryDate && nationalityStatusWatch && (
                  <div className="invalid-feedback">
                    {Errors?.passportExpiryDate?.message}
                  </div>
                )}
              </div>
            )}
            <div className="col-lg-4 mb-4">
              <StyledLabel required> Identification Number</StyledLabel>
              <Controller
                name="lead.identificationNumber"
                control={control}
                rules={{
                  required: "Identification number is required",
                  validate: validateIdNumber,
                }}
                render={({ field }) => (
                  <>
                    <input
                      className="form-control"
                      type="text"
                      {...field}
                      onBlur={async (e) => {
                        const result = await idNumberValidation(
                          e?.target?.value.trim()
                        );
                        if (result != true) {
                          setError("lead.identificationNumber", {
                            type: "custom",
                            message: result,
                          });
                        }
                      }}
                    />
                    <div className="invalid-feedback">
                      {Errors?.identificationNumber &&
                        nationalityStatusWatch &&
                        Errors?.identificationNumber?.message}
                    </div>
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </AccordionDetails>
    </GreyStyledAccordion>
  );
};

export default NationalityStatus;
