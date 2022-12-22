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
export const DefaultGrey = "#dde1e3";
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

// export const ApplicationLogo = ({ fill = "#61DAFB", style }:any) => {
//   return (
//     <svg
//       style={style}
//       xmlns={`/assets/images/application-icon.svg`}
//       viewBox="0 0 841.9 595.3"
//     >
//       <g fill="#61DAFB">
//         <path d="M666.3 ... 50.6zM320.8 78.4z" />
//         <circle cx="420.9" cy="296.5" r="45.7" />
//         <path d="M520.5 78.1z" />
//       </g>
//     </svg>
//   );
// };
