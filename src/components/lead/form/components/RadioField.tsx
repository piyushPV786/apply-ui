import { Controller, useFormContext } from "react-hook-form";
import { StyledLabel } from "../../../common/common";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const RadioField = ({ registerName, defaultValue, defaultChecked }: any) => {
  const { register, control } = useFormContext();

  return (
    <FormControl component="fieldset">
      <Controller
        control={control}
        {...register(registerName)}
        defaultValue={defaultValue} // Set the default value here
        render={({ field }) => {
          return (
            <RadioGroup row {...field}>
              <FormControlLabel
                value={"yes"}
                control={
                  <Radio
                    sx={{
                      color: "#008554",
                      "&.Mui-checked": {
                        color: "#008554",
                      },
                    }}
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                value={"no"}
                control={
                  <Radio
                    sx={{
                      color: "#008554",
                      "&.Mui-checked": {
                        color: "#008554",
                      },
                    }}
                  />
                }
                label="No"
              />
            </RadioGroup>
          );
        }}
      />
    </FormControl>
  );
};

export default RadioField;
