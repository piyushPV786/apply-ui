import React from "react";
import { GreenFormHeading } from "../common/common";
import { PaymentContainer, MainContainer } from "../payment/payment";
import Image from "next/image";
import PayIcon from "../../../public/assets/images/pay.png";
import Link from "next/link";

import { Button } from "@material-ui/core";

export const DocumentSuccess = (props: any) => {
  return (
    <>
      <MainContainer style={{ paddingBottom: "1rem" }}>
        <PaymentContainer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "70%", backgroundColor: "whitesmoke" }}>
              <div className="text-center mb-2">
                <Image width="190" height="170" src={PayIcon} alt={"PayIcon"} />
              </div>
              <div className="text-center w-100">
                <GreenFormHeading style={{ fontSize: "24px" }}>
                  Welcome to Regenesys!
                </GreenFormHeading>
                <p>
                  Your Login ID Created Successfully for ReGenius and <br />
                  Student Management System (SMS)
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <div className="text-center w-100">
                  <h6>ReGenius URL</h6>
                  <Link
                    href={`http://regeniusuat.regenesys.net/`}
                    target="blank"
                  >
                    http://regeniusuat.regenesys.net/
                  </Link>
                </div>
                <div className="text-center w-100">
                  <h6>Student Management System URL (SMS)</h6>
                  <Link
                    href={`https://portal.regenesys.net/login/index.php`}
                    target="blank"
                  >
                    https://portal.regenesys.net/login/index.php
                  </Link>
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <div className="text-center w-100">
                  <p style={{ marginBottom: "0%" }}>Username</p>
                  <h5>Karn.Sharma@gmail.com</h5>
                </div>
                <div className="text-center w-100">
                  <p style={{ marginBottom: "0%" }}>Password</p>
                  <h5>wp9dh%sKgK</h5>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <button
                  style={{ color: "#008554", border: "1px solid #008554" }}
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </PaymentContainer>
      </MainContainer>
    </>
  );
};
