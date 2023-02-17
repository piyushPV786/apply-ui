import Head from "next/head";
import StudentLogin from "../components/student/login";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Regenesys- Student Application Form</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StudentLogin />
    </div>
  );
}
