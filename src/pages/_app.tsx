import "../../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

import {
  LoaderContext,
  LoaderContextProvider,
  useLoader,
} from "../components/LoaderContext";
import { updateIntercepters } from "../services";

interface RouterContextProps {
  isRouting: boolean;
}

export const RouterContext = createContext<RouterContextProps>({
  isRouting: false,
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isRouting, setIsRouting] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsRouting(true);
    const handleComplete = () => setIsRouting(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <RouterContext.Provider value={{ isRouting }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useIsRouting() {
  const { isRouting } = useContext<any>(RouterContext);
  return isRouting;
}

const Loader = (props) => {
  const data = useLoader();
  useEffect(() => {
    updateIntercepters(data?.setLoading);
  }, []);
  return data?.loading ? <CircularProgress color="success" /> : <></>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RouterProvider>
      <LoaderContextProvider>
        <Loader>
          <Component {...pageProps} />
        </Loader>
        <ToastContainer
          position="bottom-right"
          autoClose={3500}
          hideProgressBar
        />
      </LoaderContextProvider>
    </RouterProvider>
  );
}
