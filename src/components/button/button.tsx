import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { Green } from "../common/common";
interface IButoonProps {
  title?: string;
  onClick?: (...args: any) => void;
  color?: string;
  className?: string;
  disabled?: boolean;
  isGreenWhiteCombination?: boolean;
  style?: any;
  type?: string;
  roundBtn?:boolean
}
const StyledButton = ({
  title = "",
  onClick,
  className,
  isGreenWhiteCombination = false,
  style,
  type,
  roundBtn = false,
  disabled,
  ...rest
}: IButoonProps) => {

  if(title === 'Save & Next') {
    console.log({disabled})
  }
  return (
    <MyButton
      {...rest}
      disabled={disabled}
      roundBtn={roundBtn}
      isGreenWhiteCombination={isGreenWhiteCombination}
      style={style}
      className={className}
      onClick={onClick}
    >
      {title}
    </MyButton>
  );
};

export default StyledButton;

const MyButton = styled(Button)<any>`
  border-radius: ${({ roundBtn }) => (roundBtn ? "20px" : "")}!important;
  background: ${({ isGreenWhiteCombination }) =>
    isGreenWhiteCombination ? "white!important" : "#008554 !important"};
  border: 1px solid #008554 !important;
  padding: 0.5rem 4rem !important;
  .MuiButton-label {
    color: ${({ isGreenWhiteCombination }) =>
      isGreenWhiteCombination ? Green : "white"};
  }
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)}!important;
  cursor: pointer;
  @media (max-width: 510px) {
    background: ${({ isGreenWhiteCombination }) =>
      isGreenWhiteCombination ? "#fff!important" : "#008554 !important"};
    padding: 6px 8px !important;
    .MuiButton-label {
      color: ${({ isGreenWhiteCombination }) =>
        isGreenWhiteCombination ? Green : "white"};
    }
  }
`;
