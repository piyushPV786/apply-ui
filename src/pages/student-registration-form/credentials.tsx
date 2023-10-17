import { LoginCredentials } from "../../components/loginCredentialPage/Credentialpage";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const username = JSON.parse(
      sessionStorage.getItem("activeLeadDetail") as any
    ).username;

    const password = JSON.parse(
      sessionStorage.getItem("activeLeadDetail") as any
    ).password;
  }, []);

  return (
    <div>
      <LoginCredentials />
    </div>
  );
}
