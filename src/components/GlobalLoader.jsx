import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";
// import Loader from "./components/Loader"; // Import your existing Loader component

const GlobalLoader = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Trigger the loader when the route changes
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false); // Stop loader after a delay
    }, 500); // Simulate a short loading delay

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export default GlobalLoader;
