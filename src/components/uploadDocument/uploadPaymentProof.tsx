import { Box, Grid, Theme, Typography } from "@mui/material";
import { Close, CloudUpload, Visibility } from "@material-ui/icons";
import Styles from "./uploadPaymentProof.module.css";
import { useRef } from "react";
import {
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";
import { Green, acceptedFileType } from "../common/common";
import { IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface UploadPaymentProofTypes {
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  watch: any;
  unregister: UseFormUnregister<any>;
  name: string;
  register: UseFormRegister<any>;
  errors: any;
  uploadPaymentProof: any;
  paymentStatusCheck: () => boolean;
}

export const fileValidation = (value) => {
  if (value) {
    if (value?.size > 3 * 1024 * 1024) {
      return "File size should be at most 3MB";
    }
    if (!acceptedFileType.includes(value?.type)) {
      return "Invalid file type please upload file with accepted file types ";
    }
  }

  return true;
};

const UploadPaymentProof = ({
  setValue,
  watch,
  unregister,
  register,
  name,
  errors,
  uploadPaymentProof,
  paymentStatusCheck,
}: UploadPaymentProofTypes) => {
  const fileUpload = useRef<any>(null);
  const onDocUploadClick = () => {
    const fileElement = fileUpload.current as HTMLInputElement;
    fileElement?.click() as any;
  };
  const router = useRouter();

  return (
    <Box
      width="70%"
      mx="auto"
      className={Styles.UploadDocsContainer}
      onClick={() => onDocUploadClick()}
    >
      <Box width="70%" className="text-center">
        <CloudUpload color={"primary"} />
        <input
          {...register(name, {
            validate: (value) => {
              return fileValidation(value);
            },
          })}
          name={name}
          className="d-none"
          ref={fileUpload}
          accept="application/pdf, image/jpeg, image/png"
          type="file"
          onChange={async (e) => {
            if (e?.target?.files) {
              const allowPayment = await paymentStatusCheck();

              if (allowPayment) {
                if (fileValidation(e?.target?.files[0]) === true) {
                  uploadPaymentProof(e?.target?.files);
                }
                setValue(name, e?.target?.files[0], {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              } else {
                toast.error("Invalid Payment Processing");
                router.push("/dashboard");
              }
            }
          }}
        />
        <Box className={Styles.GreenFormHeading}>
          Drag and drop, or <span className={Styles.Text}>browse</span> your
          file
        </Box>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ color: (theme: Theme) => theme.palette.grey[600] }}
        >
          Only PNG, JPEG and PDF files with max size of 3MB
        </Typography>
        <Box width="100%" onClick={(e) => e.stopPropagation()}>
          {!!watch(name) && (
            <Grid container className={Styles.Document}>
              <Grid item xs={10}>
                <Grid item sx={{ pl: 2 }}>
                  <Typography
                    variant="body1"
                    color={`${Green}`}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {watch(name)?.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton onClick={() => unregister(name)}>
                  <Close color="error" fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Box>
        <Box sx={{ pt: 2 }}>
          {errors ? (
            <Typography color="error" variant="body2">
              {errors?.file?.message}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default UploadPaymentProof;
