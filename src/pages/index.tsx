import Head from "next/head";
import StudentLogin from "../components/student/login";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Apply-UI</title>
        <meta name="Apply-UI" content="Apply-UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StudentLogin />
    </div>
  );
}
