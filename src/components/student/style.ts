import styled from "styled-components";

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
  background: #FFFFFF;
  padding: 30px;
  max-width: 420px;
  border-radius: 5px;
  margin-top: 16px;
  @media (max-width: 480px) {
    top: ${({ isProceed }) => (isProceed ? "62%" : "55%")};
    margin:15px;
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
  line-height:50px;
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
  display:block;
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
