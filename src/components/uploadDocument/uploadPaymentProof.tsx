import { Box, Grid, Theme, Typography } from "@mui/material";
import { CloseOutlined, CloudUpload } from "@material-ui/icons";
import Styles from "./uploadPaymentProof.module.css";
import { useRef } from "react";
import {
  UseFormClearErrors,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";

interface UploadPaymentProofTypes {
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  watch: any;
  unregister: UseFormUnregister<any>;
  name: string;
  register: UseFormRegister<any>;
  errors: any;
}

export const fileValidation = (value) => {
  console.log(value);

  if (value) {
    if (value?.size > 2 * 1024 * 1024) {
      return "File size should be at most 2MB";
    }
  }

  return true;
};

const UploadPaymentProof = ({
  setValue,
  clearErrors,
  watch,
  unregister,
  register,
  name,
  errors,
}: UploadPaymentProofTypes) => {
  const fileUpload = useRef<any>(null);
  const onDocUploadClick = () => {
    const fileElement = fileUpload.current as HTMLInputElement;
    fileElement?.click() as any;
  };
  console.log(errors);

  return (
    <Grid container>
      <Box
        width="100%"
        className={Styles.UploadDocsContainer}
        onClick={() => onDocUploadClick()}
      >
        <Box width="100%" className="text-center">
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
            accept="image/pdf, image/jpeg, image/png"
            type="file"
            onChange={(e) =>
              e?.target?.files &&
              setValue(name, e?.target?.files[0], {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }
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
            Only PNG, JPEG and PDF files with max size of 2MB
          </Typography>
          <Box width="100%" onClick={(e) => e.stopPropagation()}>
            {!!watch(name) && (
              <Box className={Styles.Document}>
                <Box display="flex">
                  <Box textAlign="start" sx={{ pl: 2 }}>
                    <Typography variant="body1" color="primary">
                      {watch(name)?.name}
                    </Typography>
                    <Typography variant="body2"></Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CloseOutlined
                    color="error"
                    onClick={() => unregister(name)}
                  />
                </Box>
              </Box>
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
    </Grid>
  );
};

export default UploadPaymentProof;
