import React from "react";
import { Link } from "react-router-dom";

const Item = ({
  title = "N/A",
  icon = "",
  iconType = "bx",
  textSize = "sm",
  iconSize = "2xl",
  circleSize = "14",
  link = "#",
}) => {
  return (
    <Link to={link}>
      <div className="flex flex-col items-center justify-center gap-2">
        <div
          className={`w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center rounded-full bg-[#130534]`}
        >
          {iconType === "image" ? (
            <img
              src={icon}
              alt={title}
              className={`w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain`}
            />
          ) : (
            <i className={`${icon} text-white text-lg sm:text-xl lg:text-2xl`}></i>
          )}
        </div>
        <p className={`capitalize text-xs sm:text-sm lg:text-base text-center `}>
          {title}
        </p>
      </div>
    </Link>
  );
};

export default Item;
