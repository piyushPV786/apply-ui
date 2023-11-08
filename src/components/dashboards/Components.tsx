import { Grid } from "@mui/material";
import { ContentCard, StudentIdCard } from "../login/style";
import { Green } from "../common/common";
import Dropdown from "react-bootstrap/Dropdown";
import LoginCredentialDialog from "./loginCridentialDialog";
import RmatCredentialDialog from "./rmatDetailsDialog";
import {
  capitalizeFirstLetter,
  convertCodeToName,
  transformDate,
} from "../../Util/Util";
import StyledButton from "../button/button";
import UseCardActionHook from "./customHook/UseCardActionHook";
import { useRouter } from "next/router";

export const EducationDetails = ({ educationInfo, allProgram }) => {
  return (
    <div className="row px-4">
      <div className="col-md-6">
        <div className="mt-2 w-100 app-card-block">
          <p className="mb-0" style={{ color: `#5a636a` }}>
            Interested Program
          </p>
          <strong>
            {convertCodeToName(allProgram, educationInfo?.programCode)}
          </strong>
        </div>
      </div>
      <div className="col-md-3">
        <div className="mt-2 w-100 app-card-block">
          <p className="mb-0" style={{ color: `#5a636a` }}>
            Study Type
          </p>
          <strong>{educationInfo?.studentTypeCode}</strong>
        </div>
      </div>
      <div className="col-md-3">
        <div className="mt-2 w-100 app-card-block">
          <p className="mb-0" style={{ color: `#5a636a` }}>
            Study Mode
          </p>
          <strong>{educationInfo?.studyModeCode}</strong>
        </div>
      </div>
    </div>
  );
};

export const UserInformation = ({ userInfo }) => {
  return (
    <>
      <div className="col-md-6">
        <div className="mt-3 w-100 app-card-block">
          <p className="mb-0" style={{ color: `#5a636a` }}>
            Name
          </p>
          <strong>{`${userInfo?.firstName} ${userInfo?.lastName}`}</strong>
        </div>
      </div>
      <div className="col-md-6">
        <div className="mt-3 w-100 app-card-block">
          <p className="mb-0" style={{ color: `#5a636a` }}>
            Last updated
          </p>
          <strong>{transformDate(new Date(userInfo?.updatedAt))}</strong>
        </div>
      </div>
    </>
  );
};

export const UserNumberInformation = ({ applicationDetail }) => {
  return (
    <div className="row px-6">
      <div className="d-flex flex-row ">
        {applicationDetail?.applicationCode && (
          <StudentIdCard bgColor="#235290">
            Application No: {applicationDetail?.applicationCode}
          </StudentIdCard>
        )}
        {applicationDetail?.studentCode && (
          <StudentIdCard bgColor="#235290">
            Student No: {applicationDetail?.studentCode}
          </StudentIdCard>
        )}
      </div>
    </div>
  );
};

export const CardAction = (props) => {
  return (
    <div className="w-100 mt-4 ">
      <Grid
        container
        sx={{
          padding: "10px 16px 10px",
          borderTop: `1px solid ${Green}`,
          backgroundColor: "#f4f2f1",
          minHeight: "64px",
        }}
        sm={12}
      >
        {props.children}
      </Grid>
    </div>
  );
};

export const DocumentInformation = ({ applicationDetail }) => {
  const { documentData, getDownloadDocument } =
    UseCardActionHook(applicationDetail);

  return (
    <Grid sm={3} item>
      {!!documentData?.length && (
        <Dropdown style={{ width: "100%" }}>
          <ContentCard variant="success" id="dropdown-basic">
            Downloads
          </ContentCard>
          <Dropdown.Menu>
            {documentData?.map((item) => (
              <Dropdown.Item
                onClick={() => getDownloadDocument(item)}
              >{`${capitalizeFirstLetter(
                item?.documentTypeCode.split("-")[0].toLowerCase()
              )} ${item?.documentTypeCode
                .split("-")[1]
                .toLowerCase()}`}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Grid>
  );
};

export const ActionButtons = ({ applicationDetail }) => {
  const router = useRouter();
  const {
    isEditBTN,
    isRmatBTN,
    isPayBTN,
    payBtnTitle,
    isUploadBTN,
    isBursaryBTN,
    isUploadBTNTitle,
    isAdamiteBTN,
    openCredentialDialog,
    setOpenCredentialDialog,
    rmatOpen,
    setRmatOpen,
    getRmatDetails,
  } = UseCardActionHook(applicationDetail);

  return (
    <Grid
      container
      sx={{
        justifyContent: "flex-end",
      }}
      className="d-flex flex-row"
      sm={9}
      spacing={1}
    >
      <LoginCredentialDialog
        openCredentialDialog={openCredentialDialog}
        setOpenCredentialDialog={setOpenCredentialDialog}
        applicationDetail={applicationDetail}
      />
      <RmatCredentialDialog rmatOpen={rmatOpen} setRmatOpen={setRmatOpen} />
      {isEditBTN && (
        <Grid item>
          <Grid item>
            <StyledButton
              className="card-button"
              isGreenWhiteCombination={true}
              title="Edit"
              onClick={() => {
                router.push(
                  `/application/${applicationDetail?.applicationCode}`
                );
              }}
              isEditBtn
            />
          </Grid>
        </Grid>
      )}
      {isRmatBTN && (
        <Grid item>
          <StyledButton
            isRMATBtn
            onClick={() => {
              getRmatDetails();
            }}
            title="Take RMAT Test"
          />
        </Grid>
      )}
      {isPayBTN && (
        <Grid item>
          <StyledButton
            isPayBtn
            onClick={() => {
              router.push(`/payments/${applicationDetail?.applicationCode}`);
            }}
            className="card-button"
            title={payBtnTitle}
          />
        </Grid>
      )}
      {isUploadBTN && (
        <Grid item>
          <StyledButton
            onClick={() => {
              router.push(`/uploads/${applicationDetail?.applicationCode}`);
            }}
            className="card-button"
            title={isUploadBTNTitle}
            isUploadBtn
          />
        </Grid>
      )}
      {isBursaryBTN && (
        <Grid item>
          <StyledButton
            onClick={() => {
              router.push(`/uploads/${applicationDetail?.applicationCode}`);
            }}
            className="card-button"
            title="Upload Employee Bursary Letter"
          />
        </Grid>
      )}
      {isAdamiteBTN && (
        <Grid item>
          <StyledButton
            onClick={() => {
              setOpenCredentialDialog(true);
            }}
            className="card-button"
            title="view login credentials"
          />
        </Grid>
      )}
    </Grid>
  );
};
