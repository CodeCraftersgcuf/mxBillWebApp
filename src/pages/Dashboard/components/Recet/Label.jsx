import React from "react";

const Label = ({
  heading = "N/A",
  subheading = "N/A",
  amount = "N/A",
  date = "N/A",
}) => {
  return (
    <div className="flex items-center border-2 border-black rounded-lg p-2 sm:p-3 gap-2 sm:gap-4 shadow-md bg-white">
      {/* Icon Container */}
      <div className="bg-[#2E1033] text-white w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full">
        <i className="bx bx-phone text-base sm:text-lg"></i>
      </div>

      {/* Content */}
      <div className="flex flex-col w-full gap-1">
        {/* Heading and Amount */}
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-sm sm:text-base capitalize">
            {heading}
          </h1>
          <h1 className="font-bold text-sm sm:text-base text-black">
            ₦{amount}
          </h1>
        </div>

        {/* Subheading and Date */}
        <div className="flex items-center justify-between">
          <h1 className="text-gray-700 text-xs sm:text-sm">{subheading}</h1>
          <h1 className="text-gray-500 text-xs sm:text-sm">{date}</h1>
        </div>
      </div>
    </div>
  );
};

export default Label;
