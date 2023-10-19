import StyledButton from "../button/button";
import Header from "../common/header";
import { MainContainer, PaymentContainer } from "../login/style";
import ApplicationCard from "./ApplicationCard";
import NoApplication from "./NoApplication";
import UseDashboardHook from "./customHook/UseDashboardHook";
import { useEffect } from "react";

const ApplicationDashboard = () => {
  const { applicationData, allPrograms, getApplicationData } =
    UseDashboardHook();
  return (
    <>
      <MainContainer>
        <Header />
        <div className="container-fluid application-page mt-4">
          <div style={{ paddingBottom: "1rem" }}>
            <PaymentContainer>
              {applicationData?.length === 0 && <NoApplication />}
              {applicationData?.length > 0 && (
                <div className="row">
                  <div className="col-md-8">
                    <h2 className="app-header">My Applications</h2>
                    <p className="grey-text">
                      Here are all applications that you've applied through
                      Regenesys
                    </p>
                  </div>
                  <div className="col-md-4 d-flex align-items-start justify-content-end">
                    <div className="d-flex justify-content-end">
                      <StyledButton
                        onClick={() => {}}
                        className="button-shadow apply-button"
                        title="Apply a New Application"
                      />
                    </div>
                  </div>
                </div>
              )}
              {applicationData?.length > 0 && (
                <div className="row">
                  {applicationData?.map((applicationDetail) => (
                    <div className="col-md-6 mb-2">
                      <ApplicationCard
                        applicationDetail={applicationDetail}
                        allPrograms={allPrograms}
                        getApplicationData={getApplicationData}
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
