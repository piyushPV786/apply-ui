import * as React from "react";
import {
  Box,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import styled from "styled-components";
const steps = ["Information", "Payment", "Upload Document"];
interface IStepperProps {
  active: number;
  isFormSubmitted: boolean;
  isPaymentDone: boolean;
}
function StepperComponent(props: IStepperProps) {
  const { active, isFormSubmitted, isPaymentDone } = props;

  return (
    <StyledStepper
      style={{ background: "#dde1e3" }}
      activeStep={active}
      alternativeLabel
    >
      <Step key={"12"}>
        <StepLabel
          icon={
            <CircleIcon
              isFormSubmitted={isFormSubmitted}
              active={!isFormSubmitted || active > 0}
            />
          }
        >
          {steps[0]}
        </StepLabel>
      </Step>
      <Step key={"23"}>
        <StepLabel
          icon={
            <CircleIcon
              isFormSubmitted={isFormSubmitted}
              active={isFormSubmitted || active >= 1}
            />
          }
        >
          {steps[1]}
        </StepLabel>
      </Step>
      <Step key={"34"}>
        <StepLabel
          icon={
            <CircleIcon isFormSubmitted={isFormSubmitted} active={active > 1} />
          }
        >
          {steps[2]}
        </StepLabel>
      </Step>
      {/* ))} */}
    </StyledStepper>
  );
}

export default StepperComponent;

const StyledStepper = styled(Stepper)`
  .MuiStepConnector-alternativeLabel {
    left: calc(-50% + 13px);
    right: calc(50% + 13px);
  }
  .MuiStepLabel-label {
    color: #707070;
    font-weight: 500;
    text-transform: uppercase;
  }
  .MuiStepLabel-label.MuiStepLabel-active {
    color: #008554;
    font-weight: 500;
    text-transform: uppercase;
  }
`;

const CircleIcon = styled.span<any>`
  background: ${({ active, isFormSubmitted }) =>
    active ? "#008554" : "transparent"};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: ${({ active }) =>
    active ? "2.5px solid #008554" : "2.5px solid #707070"}; ;
`;
