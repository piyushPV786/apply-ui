import React, { createContext, useState, useContext, ReactNode } from "react";

// Interface for the context data
interface LoaderContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a context with the LoaderContextProps interface
const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

// LoaderContextProvider component to provide the loader state
interface LoaderContextProviderProps {
  children: ReactNode;
}

const LoaderContextProvider: React.FC<LoaderContextProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

// Custom hook to consume the loader context
const useLoader = (): LoaderContextProps => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderContextProvider");
  }
  return context;
};

export { LoaderContextProvider, useLoader };
