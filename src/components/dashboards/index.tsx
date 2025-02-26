import { useRouter } from "next/router";
import StyledButton from "../button/button";
import Header from "../common/header";
import { MainContainer, PaymentContainer } from "../login/style";
import ApplicationCard from "./ApplicationCard";
import NoApplication from "./NoApplication";
import UseDashboardHook from "./customHook/UseDashboardHook";

const ApplicationDashboard = () => {
  const router = useRouter();
  const { applicationData, getApplicationData, allProgram } =
    UseDashboardHook();
  return (
    <>
      <MainContainer>
        <Header />
        <div className="container-fluid application-page mt-4">
          <div style={{ paddingBottom: "1rem" }}>
            <PaymentContainer>
              {applicationData?.length === 0 && <NoApplication />}
              {applicationData && applicationData?.length > 0 && (
                <div className="row">
                  <div className="col-md-8">
                    <h2 className="app-header">My Applications</h2>
                    <p className="grey-text">
                      Here are all applications that you've applied through
                      Regenesys
                    </p>
                  </div>
                  {/* <div className="col-md-4 d-flex align-items-start justify-content-end">
                    <div className="d-flex justify-content-end">
                      <StyledButton
                        onClick={() => {
                          router.push("/application/new");
                        }}
                        className="button-shadow apply-button"
                        title="Apply a New Application"
                      />
                    </div>
                  </div> */}
                </div>
              )}
              {applicationData && applicationData?.length > 0 && (
                <div className="row">
                  {applicationData?.map((applicationDetail) => (
                    <div className="col-md-6 mb-2">
                      <ApplicationCard
                        applicationDetail={applicationDetail}
                        getApplicationData={getApplicationData}
                        allProgram={allProgram}
                      />
                    </div>
                  ))}
                </div>
              )}
            </PaymentContainer>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export default ApplicationDashboard;
