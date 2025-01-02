import React from 'react';

const Label = ({ heading = 'N/A', subheading = 'N/A', amount = 'N/A', date = 'N/A' }) => {
  return (
    <div className="flex items-center border-2 border-black rounded-lg p-4 gap-4 shadow-md bg-white">
      {/* Icon Container */}
      <div className="icon-can bg-[#2E1033] text-white w-14 h-14 flex items-center justify-center rounded-full">
        <i className="bx bx-phone text-2xl"></i>
      </div>
      
      {/* Content */}
      <div className="flex flex-col w-full">
        {/* Heading and Amount */}
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg capitalize">{heading}</h1>
          <h1 className="font-bold text-lg text-black">₦{amount}</h1>
        </div>
        
        {/* Subheading and Date */}
        <div className="flex items-center justify-between">
          <h1 className="text-gray-700 text-sm">{subheading}</h1>
          <h1 className="text-gray-500 text-sm">{date}</h1>
        </div>
      </div>
    </div>
  );
};

export default Label;
