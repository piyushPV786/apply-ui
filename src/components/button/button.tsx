import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
interface IButoonProps {
  title?: string;
  onClick?: (...args: any) => void;
  color?: string;
  disabled?: boolean;
}
const StyledButton = ({
  title = "",
  onClick,
  color,
  disabled = false,
}: IButoonProps) => {
  console.log({ title });
  return (
    <MyButton disabled={disabled} color={color} onClick={onClick}>
      {title}
    </MyButton>
  );
};

export default StyledButton;

const MyButton = styled(Button)<any>`
  background: #008554 !important;
  padding: 0.5rem 4rem !important;
  color: #ffffff !important;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)}!important;
`;
