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
  completed?: boolean;
}
function StepperComponent(props: IStepperProps) {
  const { active, completed } = props;
  // console.log({ active, completed });
  return (
      <StyledStepper
        style={{ background: "#dde1e3" }}
        activeStep={active}
        alternativeLabel
      >
        {steps.map((label, idx) => (
          <Step key={label}>
            <StepLabel icon={<CircleIcon active={steps[active] === label} />}>
              {label}
            </StepLabel>
          </Step>
        ))}
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
  background: ${({ active }) => (active ? "#008554" : "transparent")};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: ${({ active }) =>
    active ? "2.5px solid #008554" : "2.5px solid #707070"}; ;
`;
