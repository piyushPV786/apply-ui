import { CachedOutlined } from "@material-ui/icons";
import { ApplicationContainer, StyledStatusBedge } from "../login/style";
import { studentApplicationAllStatus } from "../common/common";
import {
  ActionButtons,
  CardAction,
  DocumentInformation,
  EducationDetails,
  UserInformation,
  UserNumberInformation,
} from "./Components";

const ApplicationCard = ({
  applicationDetail,
  getApplicationData,
  allProgram,
}) => {
  return (
    <>
      <ApplicationContainer className="container bg-white p-0 app-card border rounded overflow-hidden">
        <div className="d-flex flex-row justify-content-between">
          <div
            className="refresh-icon"
            onClick={() => {
              getApplicationData();
            }}
          >
            <CachedOutlined
              titleAccess="Refresh Application"
              className="m-2 refresh-button"
            />
          </div>
          <div className="status-sec">
            <StyledStatusBedge status={applicationDetail?.status}>
              {studentApplicationAllStatus[applicationDetail?.status] ??
                applicationDetail?.status}
            </StyledStatusBedge>
          </div>
        </div>
        <div className="row px-4">
          <UserInformation userInfo={applicationDetail?.lead} />
        </div>
        <EducationDetails
          educationInfo={applicationDetail?.education}
          allProgram={allProgram}
        />
        <UserNumberInformation applicationDetail={applicationDetail} />
        <CardAction>
          <DocumentInformation applicationDetail={applicationDetail} />
          <ActionButtons applicationDetail={applicationDetail} />
        </CardAction>
      </ApplicationContainer>
    </>
  );
};

export default ApplicationCard;
