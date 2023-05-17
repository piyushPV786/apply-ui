import {
  Info,
  ErrorOutline,
  Warning,
  CheckCircleOutline,
} from "@material-ui/icons/";
import { AlertEnums } from "../common/constant";
import styled, { css } from "styled-components";

interface IAlertProps {
  children: string;
  severity?: AlertEnums;
}
interface IStyledAlertProps {
  className: string;
  variant?: AlertEnums;
}

const AlertBox = ({ children, severity = AlertEnums.INFO }: IAlertProps) => {
  return (
    <StyledAlert
      variant={severity}
      className="p-2 d-flex shadow border-start border-4 rounded-end align-items-center"
    >
      {severity === AlertEnums.INFO && (
        <Info
          fontSize="large"
          style={{ paddingRight: "10px", fill: "#3b90ff" }}
        />
      )}
      {severity === AlertEnums.DANGER && (
        <ErrorOutline
          fontSize="large"
          color="secondary"
          style={{ paddingRight: "10px", fill: "#d33534" }}
        />
      )}
      {severity === AlertEnums.WARNING && (
        <Warning
          fontSize="large"
          style={{ paddingRight: "10px", fill: "#ff5400" }}
        />
      )}
      {severity === AlertEnums.SUCCESS && (
        <CheckCircleOutline
          fontSize="large"
          color="inherit"
          style={{ paddingRight: "10px", fill: "#42ae42" }}
        />
      )}

      {children}
    </StyledAlert>
  );
};

export default AlertBox;

const StyledAlert = styled.div<IStyledAlertProps>`
  max-width: 400px;
  ${({ variant }) =>
    variant == AlertEnums.INFO &&
    css`
      background-color: #3b90ff20;
      border-color: #3b90ff !important;
    `}
  ${({ variant }) =>
    variant == AlertEnums.DANGER &&
    css`
      background-color: #d3353420 !important;
      border-color: #d33534 !important;
    `};
  ${({ variant }) =>
    variant == AlertEnums.WARNING &&
    css`
      background-color: #ff540020 !important;
      border-color: #ff5400 !important;
    `};
  ${({ variant }) =>
    variant == AlertEnums.SUCCESS &&
    css`
      background-color: #42ae4220 !important;
      border-color: #42ae42 !important;
    `};
`;
