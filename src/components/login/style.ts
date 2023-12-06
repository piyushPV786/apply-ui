import styled from "styled-components";
import { getStatusColor } from "../../Util/Util";
import Dropdown from "react-bootstrap/Dropdown";
import { Accordion } from "@material-ui/core";
import { DefaultGrey } from "../common/common";
import { Container } from "@mui/material";

export const ApplicationFormContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
};

export const SuccessMsgContainer = styled.div`
  display: flex;
`;
export const ToasterContainer = styled.div<any>`
  display: flex;
  column-gap: 10px;
  width: 310px;
  background: ${({ success }) => (success ? "#e6f4e7" : "#d9534f")};
  height: 75px;
  color: white;
  padding: 1rem;
  display: flex;
  border-radius: 5px;
  align-items: center;
`;
export const StyleFooter = styled.div`
  position: absolute;
  bottom: 10px;
  color: white;
  a,
  a:hover {
    color: #fcd400;
  }
  @media screen and (min-width: 410px) and (max-width: 450px) {
    bottom: 260px;
    font-size: 14px;
  }
  @media screen and (min-width: 380px) and (max-width: 395px) {
    bottom: 160px;
    font-size: 14px;
  }
  @media screen and (min-width: 320px) and (max-width: 380px) {
    bottom: 60px;
    font-size: 12px;
  }
`;
export const ApplicationFormContainer = styled.div<any>`
  text-align: center;
  background: #ffffff;
  padding: 18px;
  max-width: 420px;
  border-radius: 5px;
  @media (max-width: 480px) {
    top: ${({ isProceed }) => (isProceed ? "62%" : "55%")};
    margin: 15px;
  }
`;

export const Item = styled.div`
  text-align: center;
  button {
    text-align: center;
    width: 100%;
    margin-bottom: 0.7rem;
  }
`;
export const GreenText = styled.span`
  color: #008554;
  font-size: 14px;
  line-height: 50px;
  font-family: "Roboto-Medium";
`;
export const Title = styled(GreenText)``;

export const Heading = styled.span`
  color: #fcd400;
  font-size: 18px;
  font-weight: bold;
  padding: 1rem 0;
  position: relative;
  text-align: center;
  display: block;
`;

export const StyledLink = styled.span`
  color: #008554;
  cursor: pointer;
`;

const url = "/assets/images/bg.jpg";
export const ImageContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background-image: url(${url});
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
`;
export const MainContainer = styled.div`
  background: #dde1e3;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-bottom: 1rem;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch !important;
`;

export const PaymentContainer = styled.div`
  width: 100%;
  padding: 1.5rem;
`;

export const ApplicationContainer = styled.div`
  position: relative;
`;

export const StyledStatusBedge = styled.div<any>`
  background: ${({ status }) => `${getStatusColor(status)}`};
  color: white;
  padding: 2px 5px;
  border: 1px solid;
  position: relative;
  margin-right: 0 !important;
  border-top: 0;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 5px;
  padding: 5px 20px;
  letter-spacing: 0.5px;
  font-size: 14px;
`;

export const StudentIdCard = styled.div<{ bgColor?: string }>`
  background: ${({ bgColor }) => bgColor || "#235290"};
  color: white;
  max-width: 250px;
  border-radius: 3px;
  padding: 2px 8px;
  margin: 15px 5px 0 0;
  font-size: 13px;
  span {
    font-weight: bold;
  }
`;

export const ContentCard = styled(Dropdown.Toggle)`
  height: 34px;
  background-color: #008554;
  font-size: 0.86rem;
  border-radius: 4px;
`;

export const FormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

export const StyleContainer = styled.div`
  display: flex;
  column-gap: 10px;
  padding: 1rem 0.2rem;
  width: 500;
`;

export const StyleFeeCards = styled.div`
  background: #dde1e3;
  padding: 6px;
  font-size: 14px;
  font-family: roboto;
  font-weight: 600;
  border-radius: 2px;
  box-shadow: 0px 0px 30px 0px rgb(82 63 105 / 15%);
  border: 2px solid #fff;
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
`;

export const InnerContainer = styled(Container)`
  background-color: #faeeda;
  padding: 16px;
  margin-top: 16px;
  display: flex !important;
  justify-content: space-between;
  align-items: center;
`;

export const FileUploadContainer = styled(Container)<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  border: 1px solid;
  padding: 0.7rem;
  background: #f5f5f5;
  ${({ disabled }) =>
    disabled &&
    `
  pointer-events:noneimportant;
  color: #bebdbf!important
  
  `}
`;
