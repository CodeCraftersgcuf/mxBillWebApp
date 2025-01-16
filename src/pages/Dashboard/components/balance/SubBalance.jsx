import React from "react";

const SubBalance = ({ amount = "0", title = "N/A", paddingBottom = "" }) => {
  return (
    <div className={`flex flex-col gap-1 items-center ${paddingBottom} mb-4 `}>
      <h1 className="text-center text-xl md:text-4xl font-bold truncate">
        ₦ {amount}
      </h1>
      <h6 className="text-center text-[13px] md:text-lg capitalize">{title}</h6>
    </div>
  );
};

export default SubBalance;
