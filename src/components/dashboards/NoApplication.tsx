import Image from "next/image";
import { Green, GreenFormHeading } from "../common/common";
import StyledButton from "../button/button";
import ApplicationIcon from "../../../public/assets/images/new-application-icon.svg";
import { useRouter } from "next/router";

const NoApplication = () => {
  const router = useRouter();
  return (
    <div className="row">
      <div className="col-sm-12 col-lg-12 col-md-12">
        <div className=" d-flex justify-content-center text-center mb-2">
          <div
            style={{
              background: `${Green}`,
              borderRadius: "50%",
              padding: "1.5rem",
            }}
          >
            <Image
              width="50"
              height="50"
              src={ApplicationIcon}
              alt="Application Icon"
            />
          </div>
        </div>
        <div className="text-center w-100">
          <GreenFormHeading className="apply-text">
            No application yet
          </GreenFormHeading>
          <p className="grey-text mt-2 mb-3 mx-auto">
            Thank you for trusting Regenesys as your educational institution.
            Please apply for your interested qualification now.
          </p>
          <StyledButton
            className="button-shadow"
            onClick={() => {
              router.push("/application/new");
            }}
            title="Apply Now"
          />
        </div>
      </div>
    </div>
  );
};

export default NoApplication;
