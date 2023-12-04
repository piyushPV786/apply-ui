import "../../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoaderContextProvider } from "../components/LoaderContext";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoaderContextProvider>
        <Loader />
      </LoaderContextProvider>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar
      />
    </>
  );
}
