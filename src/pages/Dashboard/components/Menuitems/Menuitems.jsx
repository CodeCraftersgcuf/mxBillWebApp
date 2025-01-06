import React from "react";
import Item from "./Item";
import { useQuery } from "@tanstack/react-query";
import { getBillerCategories } from "../../../../util/queries/appQueries";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const MenuItems = ({ textSize, icon, circleSize, perColumn = "8" }) => {
  const token = Cookies.get("authToken");
  const navigate = useNavigate();

  const {
    data: billerCategories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["billerCategories"],
    queryFn: () => getBillerCategories(token),
    enabled: !!token,
  });

  if (isError) {
    console.error("Error fetching biller categories:", isError);
  }

  console.log("billerCategories", billerCategories);

  const handleCategoryClick = (category) => {
    if (category.isCategory === 1) {
      console.log("Navigating with state:", { icon: category.icon });
      navigate(`/${category.id}`, { state: { icon: category.icon } });
    }
    if (category.name === "Deposit") {
      navigate("/fund/wallet");
    }
    if (category.name === "History") {
      navigate("/transactions");
    }
  };

  const itemsFromAPI =
    billerCategories?.data?.map((category) => ({
      id: category.id,
      icon: category.icon || "https://via.placeholder.com/150", // Use API icon, fallback to placeholder if missing
      name: category.categoryTitle || category.category, // Use categoryTitle if available
      iconType: "image", // Indicate that these are image-based icons
      isCategory: category.isCategory, // Include isCategory for navigation check
    })) || [];

  return (
    <div
      className={`w-[95%] -translate-y-6 mx-auto bg-white shadow-lg rounded p-4 grid grid-cols-2 md:grid-cols-6 sm:grid-cols-4   lg:grid-cols-8 gap-2`}
    >
      {itemsFromAPI.map((item, index) => (
        <div key={index} onClick={() => handleCategoryClick(item)}>
          <Item
            title={item.name}
            icon={item.icon}
            iconType={item.iconType}
            textSize={textSize}
            iconSize={icon}
            circleSize={circleSize}
          />
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
