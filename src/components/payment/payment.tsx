import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { StepperContainer } from "../../pages/student-registration-form/application-form";
import { Grid, Container, Box } from "@material-ui/core";
import { Green, GreenFormHeading, StyledLabel } from "../common/common";
import { useFormContext } from "react-hook-form";
import { HighestQualificationElement, Mode } from "../common/types";

const Payment = (props: any) => {
  const { watch,register } = useFormContext();
  const allFields = watch();
  const selectedQualification: string =
    props?.qualifications &&
    props.qualifications?.find(
      (item: HighestQualificationElement) =>
        item?.id == allFields?.interestedQualificationId
    )?.qualification;
  console.log({ selectedQualification });
  const selectedStudyMode: string =
    props?.studyMode &&
    props.studyMode?.find((item: Mode) => item?.id == allFields?.studyMode)
      ?.qualification;
  console.log({ selectedQualification });

  return (
    <>
      <MainContainer>
        {" "}
        <PaymentHeading>
          <div className="col-md-12">
            <StyleHeading>
              <GreenFormHeading style={{ fontSize: "20px" }}>
                Order Summary
              </GreenFormHeading>
            </StyleHeading>
          </div>
        </PaymentHeading>
        <PaymentContainer>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4">
                <StyledLabel style={{ fontSize: "16px" }}>
                  Proposal Qualification
                </StyledLabel>
                <div>
                  <strong>{selectedQualification}</strong>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <StyledLabel style={{ fontSize: "16px" }}>
                  Study Mode
                </StyledLabel>
                <div>
                  <strong>{selectedStudyMode}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4 w-75">
                <StyledLabel required style={{ fontSize: "16px" }}>
                  Currency Selection
                </StyledLabel>
                <select
                  className="form-select"
                  {...register(`currency`, { required: true })}
                >
                  {[] &&
                    [{ id: 21, currency: "Rs" }].map(({ id, currency }) => (
                      <option
                        selected={id === allFields?.currency}
                        key={id}
                        value={Number(id)}
                      >
                        {currency}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <StyledLabel style={{ fontSize: "16px" }}>
                  Application Fee
                </StyledLabel>
                <div>
                  <strong>INR 2100.00</strong>
                </div>
              </div>
            </div>
          </div>
        </PaymentContainer>
      </MainContainer>
    </>
  );
};

export default Payment;

const MainContainer = styled.div`
  background: #fff;
  width: 100%;
  margin: 0 5rem;
`;

const PaymentContainer = styled.div`
  width: 100%;
  padding: 1rem 10px;
`;

const PaymentHeading = styled(PaymentContainer)`
  border-bottom: 2px solid ${Green};
  padding: 1rem 10px;
`;
const StyleHeading = styled.div``;
