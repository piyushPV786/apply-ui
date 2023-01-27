import { Accordion } from "@material-ui/core";
import styled from "styled-components";
import {
  StyledLink,
  SuccessMsgContainer,
  ToasterContainer,
} from "../student/style";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { Snackbar } from "@material-ui/core";



export const GreenFormHeading = styled.p`
  font-size: 17px;
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
      {props?.children}{" "}
      {required && !props?.forceHide && <span className="text-danger">*</span>}
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

export const Toaster = ({ success, message, setShowToast, show }) => (
  <Snackbar
    autoHideDuration={1000}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    open={show}
    onClose={() => {
      setShowToast(!show);
    }}
    key={"bottom"}
  >
    <ToasterContainer success={success}>
      <CheckCircleRoundedIcon style={{ color: "#0eb276", fontSize: "30px" }} />
      <SuccessMsgContainer>
        <StyledLink>
          {success ? "Success" : "Error"}
          <br />
          <span
            style={{
              color: "black",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {message}
          </span>
        </StyledLink>
      </SuccessMsgContainer>
    </ToasterContainer>
  </Snackbar>
);
