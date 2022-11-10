import { Accordion } from "@material-ui/core";
import styled from "styled-components";
export const GreenText = styled.span`
  color: #008554;
  font-weight: 700;
  font-size: 14px;
`;

export const GreenFormHeading = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #008554;
  margin: 0;

  @media (max-width: 510px) {
    font-size: 11px;
    img {
      width: 25px;
      height: 25px;
    }
  }
`;

export const Green = "#008554";
export const StyledLabel = (props: any) => {
  const {
    required = false,
    className = "form-label",
    style = { marginTop: props?.hideLabel ? "18px" : "auto" },
  } = { ...props };
  return (
    <label style={style} className={className}>
      {props?.children} {required && <span className="text-danger">*</span>}
    </label>
  ) as any;
};

export const StyledAccordion = styled(Accordion)`
  .MuiAccordionSummary-root {
    border-bottom: 3px solid ${Green}!important;
    height: 45px;
  }

  @media (max-width: 510px) {
    .MuiAccordionSummary-root {
      height: 60px;
    }
  }
`;
