import Close from "mdi-material-ui/Close";

import { Dialog, DialogContent, Grid, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { GreenFormHeading } from "../common/common";

import StyledButton from "../button/button";
import rmatimage from "../../../public/assets/images/rmatlogo.png";
import infoicon from "../../../public/assets/images/info.png";

const RmatCredentialDialog = ({ rmatOpen, setRmatOpen }) => {
  const router = useRouter();

  return (
    <div>
      <Dialog
        open={rmatOpen.state}
        maxWidth="lg"
        onClose={() => {
          setRmatOpen({
            state: false,
            rmaturl: "",
            password: "",
            username: "",
          });
        }}
      >
        <Grid className="d-flex justify-content-end p-3">
          <IconButton
            size="small"
            onClick={() => {
              setRmatOpen({
                state: false,
                rmaturl: "",
                password: "",
                username: "",
              });
            }}
          >
            <Close />
          </IconButton>
        </Grid>
        <DialogContent className="mb-5">
          <Grid
            container
            sm={12}
            xs={12}
            md={12}
            className="d-flex justify-content-center align-items-center p-2"
          >
            <Grid md={12} item className="text-center mb-2">
              <Image width="100" height="100" src={rmatimage} alt={"PayIcon"} />
            </Grid>
            <Grid item md={12} className="text-center mb-2">
              <GreenFormHeading style={{ fontSize: "24px" }}>
                RMAT Test Details
              </GreenFormHeading>
            </Grid>
            <Grid item md={12} className="text-center">
              <Image width="25" height="25" src={infoicon} alt={"PayIcon"} />{" "}
              Team is waiting for your test result to proceed for further
              admission process
            </Grid>

            <Grid
              container
              md={12}
              sm={12}
              className="mt-3"
              rowSpacing={2}
              columnSpacing={10}
            >
              <Grid item md={4} sm={4} className="text-center">
                <div> RMAT Test URL</div>
                <a href={rmatOpen?.rmaturl}>{rmatOpen?.rmaturl}</a>
              </Grid>
              <Grid item md={4} sm={4} className="text-center">
                <div>Username</div>
                <strong>{rmatOpen?.username}</strong>
              </Grid>
              <Grid item md={4} sm={4} className="text-center">
                <div>Password</div>
                <strong>{rmatOpen?.password}</strong>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container md={12} sm={12} className="mt-5">
                <Grid item md={12} sm={12} className="text-center">
                  <StyledButton
                    onClick={() =>
                      window.open("https://rmatuat.regenesys.net/")
                    }
                    title={"Take RMAT Test"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RmatCredentialDialog;
