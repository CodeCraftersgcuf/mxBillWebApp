import React from "react";

const Label = ({
  heading = "N/A",
  subheading = "N/A",
  amount = "N/A",
  date = "N/A",
  logo = "as",
}) => {
  return (
    <div className="flex items-center border-2 border-black rounded-lg p-2 sm:p-3 gap-2 sm:gap-4 shadow-md bg-white">
      {/* Icon Container */}
      <div className="bg-[#130534] text-white w-10 sm:w-12 aspect-square flex items-center justify-center rounded-full">
      <img src={logo} alt="logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
      </div>

      {/* Content */}
      <div className="flex flex-col w-full gap-1">
        {/* Heading and Amount */}
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-sm sm:text-base capitalize">{heading}</h1>
          <h1 className="font-bold text-sm sm:text-base text-black">₦{amount}</h1>
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
