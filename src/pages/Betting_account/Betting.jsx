import React, { useEffect, useState } from "react";
import AccountCan from "./Components/AccountCan";
import { useQuery } from "@tanstack/react-query";
import { getBillerProviders } from "../../util/queries/appQueries";
import Cookies from "js-cookie";
import { useParams, useLocation } from "react-router-dom";

const Betting = () => {
  const { categoryId } = useParams(); // Get the categoryId from the route
  const { state } = useLocation(); // Retrieve the icon from the state
  console.log("This is the State: ", state);
  const [icon, setIcon] = useState(
    state?.icon || "https://via.placeholder.com/150"
  );

  const token = Cookies.get("authToken");

  const {
    data: billerProviders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["billerProviders", categoryId],
    queryFn: () => getBillerProviders(categoryId, token),
    enabled: !!token && !!categoryId,
  });

  if (isError) {
    console.error("Error fetching biller providers:", isError);
  }
  useEffect(() => {
    const iconss = Cookies.get("categoryIcon");
    if (iconss) {
      setIcon(iconss);
    }
  });

  console.log("billerProviders", billerProviders);

  const providers = billerProviders?.data || [];
  console.log("Providers: ", providers);
  const Title = billerProviders?.data?.[0]?.category || "Loading...";

  return (
    <div className="p-4 ">
      <div className="mx-w-[100%] md:max-w-[70%] mx-auto">
        <div className="bg-theme-primary text-white rounded-lg shadow-lg p-8 w-full flex flex-col items-center justify-center">
          <div className=" p-4 rounded-full">
            {/* Use the icon passed from the MenuItems */}
            <img
              src={icon || "https://via.placeholder.com/150"}
              alt="Category Icon"
              className="w-20 h-20 "
            />
          </div>
          <h1 className="uppercase font-bold mt-8 text-center">{Title}</h1>
        </div>
        <div className="bg-gray-400 my-4 w-full h-[4px] rounded"></div>
        <AccountCan providers={providers} categoryId={categoryId} />
      </div>
    </div>
  );
};

export default Betting;
