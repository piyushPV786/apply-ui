import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { Green } from "../common/common";
import Image from "next/image";
import EditIcon from '../../../public/assets/images/edit-icon.svg';
import UploadIcon from '../../../public/assets/images/upload.svg';
import PayIcon from '../../../public/assets/images/pay-pay.svg';
interface IButoonProps {
  title?: string;
  onClick?: (...args: any) => void;
  color?: string;
  className?: string;
  disabled?: boolean;
  isGreenWhiteCombination?: boolean;
  style?: any;
  type?: string;
  roundBtn?: boolean;
  isEditBtn?: boolean;
  isPayBtn?: boolean;
  isUploadBtn?: boolean;
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
  isEditBtn = false,
  isPayBtn = false,
  isUploadBtn = false,
  ...rest
}: IButoonProps) => {
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
      {isEditBtn && (
        <span className="me-3">
          <Image alt="edit" width="20"  src={EditIcon} />
        </span>
      )}
      {isPayBtn && (
        <span className="me-3">
          <Image alt="pay" src={PayIcon} />
        </span>
      )}
      {isUploadBtn && (
        <span className="me-3">
          <Image alt="upload" src={UploadIcon} />
        </span>
      )}
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
