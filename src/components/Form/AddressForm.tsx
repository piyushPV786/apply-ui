import React, { useEffect } from "react";
import {
  GreenFormHeading,
  StyledAccordion,
  StyledLabel,
} from "../common/common";
import { AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useFormContext } from "react-hook-form";
const RESEDENTIALADDRESS = "address";
const resPostalAddress = `${RESEDENTIALADDRESS}.residentialAddress`;
const resCountry = `${RESEDENTIALADDRESS}.residentialCountry`;
const resPostalCode = `${RESEDENTIALADDRESS}.residentialZipCode`;
const resCity = `${RESEDENTIALADDRESS}.residentialCity`;
const resState = `${RESEDENTIALADDRESS}.residentialState`;
export const AddressForm = () => {
  const { setValue, register, watch, getValues } = useFormContext();

  const {
    postalAddress,
    postalCountry,
    postalZipCode,
    postalCity,
    postalState,
    isSameAsPostalAddress = false,
  } = watch();

  const resPostalAddressVal: string = watch(resPostalAddress);
  const resCountryVal: string = watch(resCountry);
  const resPostalCodeVal: string = watch(resPostalCode);
  const resCityVal: string = watch(resCity);
  const resStateVal: string = watch(resState);
  return (
    <>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <GreenFormHeading>
            <span className="me-2">
              <img
                src={"/assets/images/address-card-outlined-svgrepo-com.svg"}
              />
            </span>
            Address
          </GreenFormHeading>
        </AccordionSummary>
        <AccordionDetails>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel required>Postal Address</StyledLabel>
                  <input
                    value={postalAddress}
                    defaultValue={postalAddress}
                    type="text"
                    {...register("postalAddress", { required: true })}
                    className="form-control"
                    id="postalAddress"
                    placeholder="e.g 10 church street"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <StyledLabel hideLabel={true}></StyledLabel>

                <div className="mb-4">
                  <select
                    className="form-select"
                    value={postalCountry}
                    defaultValue={postalCountry}
                    {...register("postalCountry", { required: true })}
                  >
                    <option selected>Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <StyledLabel hideLabel={true}></StyledLabel>
                  <input
                    value={+postalZipCode}
                    defaultValue={+postalZipCode}
                    {...register("postalZipCode", { required: true })}
                    type="text"
                    className="form-control"
                    id="postalZipCode"
                    placeholder="Enter Zip/Postal Code"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-4">
                  <select
                    className="form-select"
                    value={postalCity}
                    defaultValue={postalCity}
                    {...register("postalCity", { required: true })}
                  >
                    <option selected>Select City</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-4">
                  <select
                    className="form-select"
                    value={postalState}
                    defaultValue={postalState}
                    {...register("postalState", { required: true })}
                  >
                    <option selected>Select State/ Province</option>
                    <option value="MP">MP</option>
                    <option value="UP">UP</option>
                    <option value="Other">Other</option>
                  </select>
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
                    onClick={(e) => {
                      setValue(
                        "isSameAsPostalAddress",
                        e?.currentTarget?.checked
                      );
                      if (e?.currentTarget?.checked) {
                        setValue(`${resPostalAddress}`, postalAddress);
                        setValue(`${resPostalCode}`, postalZipCode);
                      }
                    }}
                    {...register("isSameAsPostalAddress", {})}
                  />
                  <label className="form-check-label ms-2">
                    Select if same with Postal Address
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel required>Residential Address</StyledLabel>
                    <input
                      type="text"
                      {...register(`${resPostalAddress}`, { required: true })}
                      value={resPostalAddressVal}
                      className="form-control"
                      id="postalAddress"
                      placeholder="e.g 10 church street"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <StyledLabel hideLabel={true}></StyledLabel>

                  <div className="mb-4">
                    <select
                      className="form-select"
                      value={
                        isSameAsPostalAddress ? postalCountry : resCountryVal
                      }
                      defaultValue={
                        isSameAsPostalAddress ? postalCountry : resCountryVal
                      }
                      {...register(`${resCountry}`, { required: true })}
                    >
                      <option selected>Select Country</option>
                      <option value="India">India</option>
                      <option value="UAE">UAE</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <StyledLabel hideLabel={true}></StyledLabel>
                    <input
                      value={+resPostalCodeVal}
                      defaultValue={+resPostalCodeVal}
                      {...register(`${resPostalCode}`, { required: true })}
                      type="text"
                      className="form-control"
                      id="postalCode"
                      placeholder="Enter Zip/Postal Code"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-4">
                    <select
                      className="form-select"
                      value={isSameAsPostalAddress ? postalCity : resCityVal}
                      defaultValue={
                        isSameAsPostalAddress ? postalCity : resCityVal
                      }
                      {...register(`${resCity}`, { required: true })}
                    >
                      <option selected>Select City</option>
                      <option value="Mumbai">Mumbai</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-4">
                    <select
                      className="form-select"
                      value={isSameAsPostalAddress ? postalState : resStateVal}
                      defaultValue={
                        isSameAsPostalAddress ? postalState : resStateVal
                      }
                      {...register(`${resState}`, { required: true })}
                    >
                      <option selected>Select State/ Province</option>
                      <option value="MP">MP</option>
                      <option value="UP">UP</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};
