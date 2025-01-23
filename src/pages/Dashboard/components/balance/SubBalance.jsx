import React from "react";

const SubBalance = ({ amount = "0", title = "N/A", paddingBottom = "" }) => {
  // Format the amount with commas for thousands separator
  const formattedAmount = Number(amount).toLocaleString('en-US');

  return (
    <div className={`flex flex-col gap-1 items-center ${paddingBottom} mb-4 `}>
      <h1 className="text-center text-xl md:text-4xl font-bold truncate">
        ₦ {formattedAmount}
      </h1>
      <h6 className="text-center text-[11px] md:text-lg capitalize">{title}</h6>
    </div>
  );
};

export default SubBalance;
