import React from "react";
import { GreenFormHeading } from "../common/common";
import { PaymentContainer, MainContainer } from "../payment/payment";
import Image from "next/image";
import PayIcon from "../../../public/assets/images/pay.png";
import Link from "next/link";
import Styles from "./Credential.module.css";
import { Button } from "@material-ui/core";

export const DocumentSuccess = (props: any) => {
  return (
    <>
      <MainContainer style={{ paddingBottom: "1rem" }}>
        <PaymentContainer>
          <div className={Styles.container}>
            <div className={Styles.main}>
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
              <div className={Styles.links}>
                <div className="text-center w-100">
                  <h6>ReGenius URL</h6>
                  <Link
                    className={Styles.link}
                    href={`http://regeniusuat.regenesys.net/`}
                    target="blank"
                  >
                    http://regeniusuat.regenesys.net/
                  </Link>
                </div>
                <div className="text-center w-100">
                  <h6>Student Management System URL (SMS)</h6>
                  <Link
                    className={Styles.link}
                    href={`https://portal.regenesys.net/login/index.php`}
                    target="blank"
                  >
                    https://portal.regenesys.net/login/index.php
                  </Link>
                </div>
              </div>
              <div className={Styles.credentials}>
                <div className="text-center w-100">
                  <p className={Styles.user}>Username</p>
                  <h5>Karn.Sharma@gmail.com</h5>
                </div>
                <div className="text-center w-100">
                  <p className={Styles.user}>Password</p>
                  <h5>wp9dh%sKgK</h5>
                </div>
              </div>
              <div className={Styles.divbtn}>
                <button className={Styles.btn}>Back to Dashboard</button>
              </div>
            </div>
          </div>
        </PaymentContainer>
      </MainContainer>
    </>
  );
};
