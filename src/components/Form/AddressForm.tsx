import { useEffect } from "react";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import AddressImg from "../../../public/assets/images/address-card-outlined-svgrepo-com.svg";
import AdvanceDropDown from "../dropdown/Dropdown";
import {
  formOptions,
  onlyAlphabets,
  sortAscending,
  capitalizeFirstLetter,
  onlyAlphabetsOrNumbersDash,
  formDirtyState,
} from "../../Util/Util";
const Address = "address";
const resPostalAddress = `${Address}[1].street`;
const resCountry = `${Address}[1].country`;
const resPostalCode = `${Address}[1].zipcode`;
const resCity = `${Address}[1].city`;
const resState = `${Address}[1].state`;
const postalAddress = `${Address}[0].street`;
const postalCountry = `${Address}[0].country`;
const postalZipCode = `${Address}[0].zipcode`;
const postalCity = `${Address}[0].city`;
const postalState = `${Address}[0].state`;
const isSameAsPostalAddress = `${Address}.isSameAsPostalAddress`;
const addressType = `${Address}[0].addressType`;
const addressTypeResidential = `${Address}[1].addressType`;
export const AddressForm = ({
  countryData = [],
  leadId = "",
  getStateData,
  posStateData,
  resStateData,
}: any) => {
  const CountryData = countryData;
  const {
    setValue,
    register,
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const error = errors[Address] as any;
  const touchedField = touchedFields[Address] as any;
  const resPostalAddressVal: string = watch(resPostalAddress);
  const resCountryVal: string = watch(resCountry);
  const resPostalCodeVal: string = watch(resPostalCode);
  const resCityVal: string = watch(resCity);
  const resStateVal: string = watch(resState);
  const isSameAsPostalAddressVal = watch(isSameAsPostalAddress, false);
  const postalAddressVal: string = watch(postalAddress);
  const postalCountryVal: string = watch(postalCountry);
  const postalZipCodeVal: string = watch(postalZipCode);
  const postalCityVal: string = watch(postalCity);
  const postalStateVal: string = watch(postalState);
  useEffect(() => {
    setValue(`${addressType}`, "POSTAL");
    setValue(`${addressTypeResidential}`, "RESIDENTIAL");
    if (postalCountryVal) {
      getStateData(postalCountryVal, "POSTAL");
    }

    if (resCountryVal) {
      getStateData(resCountryVal, "RESIDENTIAL");
    }
  }, [leadId]);

  return (
    <>
      <StyledAccordion defaultExpanded={true} className="card-shadow">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <GreenFormHeading>
            <span className="me-2">
              <Image src={AddressImg} alt="address card" />
            </span>
            Address
          </GreenFormHeading>
        </AccordionSummary>
        <AccordionDetails>
          <div className="container-fluid form-padding">
            <div className="row">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Residential Address</StyledLabel>
                    <input
                      type="text"
                      {...register(`${resPostalAddress}`, {
                        required: true,
                      })}
                      value={resPostalAddressVal}
                      className="form-control"
                      id="postalAddress"
                      placeholder="e.g 10 church street"
                      onChange={(e) => {
                        const value = e.target.value;
                        const name = e.target.name;
                        if (onlyAlphabetsOrNumbersDash(value)) {
                          setValue(
                            name,
                            capitalizeFirstLetter(value),
                            formDirtyState
                          );
                        }
                      }}
                    />
                    {error && error[1]?.street && (
                      <div className="invalid-feedback">
                        Please enter Residential Address
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <AdvanceDropDown
                      value={resCountryVal}
                      label="Country"
                      options={CountryData?.sort((a, b) =>
                        sortAscending(a, b, "name")
                      )}
                      name={resCountry}
                      register={register}
                      mapKey="code"
                      onChange={(e: any) => {
                        getStateData(e.target.value, "RESIDENTIAL");
                        const value = e.target.value;
                        setValue(resCountry, value, formOptions);
                      }}
                    />
                    {error && error[1]?.country && (
                      <div className="invalid-feedback">
                        Please enter Residential Country
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <AdvanceDropDown
                      register={register}
                      options={resStateData?.sort((a, b) =>
                        sortAscending(a, b, "name")
                      )}
                      mapKey="isoCode"
                      value={resStateVal}
                      name={resState}
                      onChange={(e) => {
                        const value = e.target.value;
                        const name = e.target.name;
                        if (onlyAlphabets(value)) {
                          setValue(
                            name,
                            capitalizeFirstLetter(value),
                            formDirtyState
                          );
                        }
                      }}
                      label="State/Provinces"
                    />
                    {error && error[1]?.state && (
                      <div className="invalid-feedback">
                        Please enter Residential State
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>City</StyledLabel>
                    <input
                      {...register(`${resCity}`, {
                        required: true,
                      })}
                      className="form-control"
                      value={resCityVal}
                      defaultValue={resCityVal}
                      onChange={(e) => {
                        const value = e.target.value;
                        const name = e.target.name;
                        if (onlyAlphabets(value)) {
                          setValue(
                            name,
                            capitalizeFirstLetter(value),
                            formDirtyState
                          );
                        }
                      }}
                    />
                    {error && error[1]?.city && (
                      <div className="invalid-feedback">
                        Please enter Residential City
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Pin Code / Zip Code</StyledLabel>
                    <input
                      value={resPostalCodeVal}
                      defaultValue={resPostalCodeVal}
                      {...register(`${resPostalCode}`, {
                        required: true,
                        maxLength: 10,
                        minLength: 4,
                      })}
                      type="number"
                      className="form-control"
                      id="postalCode"
                      placeholder="Enter Zip/Postal Code"
                    />
                    {error && error[1]?.zipcode && (
                      <div className="invalid-feedback">
                        {error[1]?.zipcode.type === "maxLength"
                          ? "Max length exceeded"
                          : error[1]?.zipcode.type === "minLength"
                          ? "Minimum length should be 4"
                          : "Please enter Zip/Postal Code"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="mb-4">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={isSameAsPostalAddressVal}
                    {...register(`${isSameAsPostalAddress}`, {
                      required: false,
                    })}
                    onClick={(e) => {
                      setValue(
                        `${isSameAsPostalAddress}`,
                        e?.currentTarget?.checked,
                        formDirtyState
                      );
                      if (e?.currentTarget?.checked) {
                        setValue(
                          `${postalAddress}`,
                          resPostalAddressVal,
                          formDirtyState
                        );
                        setValue(
                          `${postalZipCode}`,
                          resPostalCodeVal,
                          formDirtyState
                        );
                        setValue(`${postalCity}`, resCityVal, formDirtyState);
                        setValue(`${postalState}`, resStateVal, formDirtyState);
                        setValue(
                          `${postalCountry}`,
                          resCountryVal,
                          formOptions
                        );
                      } else if (!e?.currentTarget?.checked) {
                        setValue(`${postalAddress}`, "");
                        setValue(`${postalZipCode}`, "");
                        setValue(`${postalCity}`, "");
                        setValue(`${postalState}`, "");
                        setValue(`${postalCountry}`, "");
                      }
                    }}
                  />
                  <label className="form-check-label m1-2 same-address">
                    Select if same as Residential Address
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Postal Address</StyledLabel>
                  <input
                    value={postalAddressVal}
                    defaultValue={postalAddressVal}
                    type="text"
                    {...register(`${postalAddress}`, { required: true })}
                    className="form-control"
                    id="postalAddress"
                    placeholder="e.g 10 church street"
                    onChange={(e) => {
                      const value = e.target.value;
                      const name = e.target.name;
                      if (onlyAlphabetsOrNumbersDash(value)) {
                        setValue(
                          name,
                          capitalizeFirstLetter(value),
                          formDirtyState
                        );
                      }
                    }}
                  />
                  {error && error[0]?.street && (
                    <div className="invalid-feedback">
                      Please enter Postal Address
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <AdvanceDropDown
                    value={postalCountryVal}
                    options={CountryData.sort((a, b) =>
                      sortAscending(a, b, "name")
                    )}
                    register={register}
                    mapKey="code"
                    name={postalCountry}
                    onChange={(e: any) => {
                      getStateData(e.target.value, "POSTAL");
                      const value = e.target.value;
                      setValue(
                        postalCountry,
                        capitalizeFirstLetter(value),
                        formOptions
                      );
                    }}
                    label="Country"
                  />

                  {error && error[0]?.country && (
                    <div className="invalid-feedback">
                      Please enter Postal Country
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <AdvanceDropDown
                    value={postalStateVal}
                    options={
                      isSameAsPostalAddressVal == false
                        ? posStateData?.sort((a, b) =>
                            sortAscending(a, b, "name")
                          )
                        : resStateData.sort((a, b) =>
                            sortAscending(a, b, "name")
                          )
                    }
                    register={register}
                    mapKey="isoCode"
                    name={postalState}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      setValue(
                        postalState,
                        capitalizeFirstLetter(value),
                        formOptions
                      );
                    }}
                    label="State/Provinces"
                  />
                  {isSameAsPostalAddressVal && !resStateVal && (
                    <div className="invalid-feedback">
                      Please enter Postal State
                    </div>
                  )}

                  {error && error[0]?.state && (
                    <div className="invalid-feedback">
                      Please enter Postal State
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>City</StyledLabel>
                  <input
                    value={postalCityVal}
                    defaultValue={postalCityVal}
                    className="form-control"
                    {...register(`${postalCity}`, {
                      required: true,
                    })}
                    onChange={(e) => {
                      const value = e.target.value;
                      const name = e.target.name;
                      if (onlyAlphabets(value)) {
                        setValue(
                          name,
                          capitalizeFirstLetter(value),
                          formDirtyState
                        );
                      }
                    }}
                  />
                  {error && error[0]?.city && (
                    <div className="invalid-feedback">Please enter City</div>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Pin Code / Zip Code</StyledLabel>
                  <input
                    value={postalZipCodeVal}
                    {...register(`${postalZipCode}`, {
                      required: true,
                      maxLength: 10,
                      minLength: 4,
                    })}
                    onKeyUp={(e) => {
                      if (e.code === "Minus") {
                        setValue(`${postalZipCode}`, "");
                      }
                    }}
                    type="number"
                    maxLength={6}
                    className="form-control"
                    id="postalZipCode"
                    placeholder="Enter Zip/Postal Code"
                  />
                  {error && error[0]?.zipcode && (
                    <div className="invalid-feedback">
                      {error[0]?.zipcode.type === "maxLength"
                        ? "Max length exceeded"
                        : error[0]?.zipcode.type === "minLength"
                        ? "Minimum length should be 4"
                        : "Please enter Zip/Postal Code"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};
