import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { Green } from "../common/common";
import Image from "next/image";
import EditIcon from "../../../public/assets/images/edit-icon.svg";
import UploadIcon from "../../../public/assets/images/upload.svg";
import PayIcon from "../../../public/assets/images/pay-pay.svg";
import RmatImg from "../../../public/assets/images/rmat.png";
import { ArrowDownwardOutlined } from "@material-ui/icons";

interface IButoonProps {
  title?: string;
  onClick?: (...args: any) => void;
  color?: string;
  className?: string;
  form?: string;
  disabled?: boolean;
  isGreenWhiteCombination?: boolean;
  style?: any;
  type?: string;
  roundBtn?: boolean;
  isEditBtn?: boolean;
  isPayBtn?: boolean;
  isRMATBtn?: boolean;
  isUploadBtn?: boolean;
  isDownloadBtn?: boolean;
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
  isRMATBtn = false,
  isUploadBtn = false,
  isDownloadBtn = false,
  form = "",
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
      type={type}
      onClick={onClick}
      form={form}
    >
      <>
        {isEditBtn && (
          <span className="me-3">
            <Image alt="edit" width="20" src={EditIcon} />
          </span>
        )}
        {isPayBtn && (
          <span className="me-3">
            <Image alt="pay" src={PayIcon} />
          </span>
        )}
        {isRMATBtn && (
          <span className="me-2">
            <Image alt="pay" src={RmatImg} />
          </span>
        )}
        {isUploadBtn && (
          <span className="me-3">
            <Image alt="upload" src={UploadIcon} />
          </span>
        )}
        {isDownloadBtn && (
          <StyledDownloadIcon className="me-1 icon-additinal">
            <ArrowDownwardOutlined />
            {/* <Image alt="download" src={DownloadIcon} width={18} height={18} /> */}
          </StyledDownloadIcon>
        )}
        {title}
      </>
    </MyButton>
  );
};

export default StyledButton;

const MyButton = styled(Button)<any>`
  border-radius: ${({ roundBtn }) => (roundBtn ? "20px" : "")}!important;
  background: ${({ isGreenWhiteCombination, disabled }) =>
    isGreenWhiteCombination
      ? "white!important"
      : disabled
      ? "#d2d2d2!important"
      : "#008554 !important"};
  border: 1px solid #008554 !important;
  .MuiButton-label {
    color: ${({ isGreenWhiteCombination, disabled }) =>
      isGreenWhiteCombination
        ? Green
        : disabled
        ? "#b6b6b6!important"
        : "white"};
  }
  // opacity: ${({ disabled }) => (disabled ? 0.3 : 1)}!important;
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

const StyledDownloadIcon = styled.span``;
