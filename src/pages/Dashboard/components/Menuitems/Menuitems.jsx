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

  const handleCategoryClick = (category) => {
    if (category.isCategory === 1) {
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
      icon: category.icon || "https://via.placeholder.com/150",
      name: category.categoryTitle || category.category,
      iconType: "image",
      isCategory: category.isCategory,
    })) || [];

  return (
    <div
      className={`w-[95%] -translate-y-6 mx-auto bg-white shadow-lg py-3 gap-2  md:p-4 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 md:gap-4 rounded-xl	`}
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
