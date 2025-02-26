import { updateInterceptors } from "../../services";
import { useLoader } from "../LoaderContext";
import { useEffect } from "react";

export const Spinner = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
    </div>
  );
};

const Loader = (props) => {
  const data = useLoader();
  useEffect(() => {
    updateInterceptors(data?.setLoading);
  }, []);
  return data?.loading ? (
    <>
      <Spinner />
    </>
  ) : (
    <></>
  );
};

export default Loader;
