import React from "react";

const ReceiptModel = ({
  show = false,
  onClose = () => {},
  amountPaid = "N/A",
  billerCategory = "N/A",
  billerProvider = "N/A",
  billerItem = "N/A",
  transactionDate = "N/A",
  transactionId = "N/A",
  status = "N/A",
  token = "N/A",
}) => {
  if (!show) return null;

  return (
    <div className="modal absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="main bg-gray-100 w-full md:w-[40%] p-6 rounded-lg flex flex-col gap-6 shadow-lg relative">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-black">E-Receipt</h2>

        {/* Receipt Details */}
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-bold text-black text-[13px] md:text-[16px]">Amount Paid (NGN)</span>
            <span className="text-xl font-bold text-black text-[13px] md:text-[16px]">{amountPaid}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-black text-[13px] md:text-[16px]">Biller Category</span>
            <span className="text-black text-[13px] md:text-[16px]" >{billerCategory}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-black text-[13px] md:text-[16px]">Biller Provider</span>
            <span className="text-black text-[13px] md:text-[16px]" >{billerProvider}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-black text-[13px] md:text-[16px]">Biller Item</span>
            <span className="font-bold text-black text-[13px] md:text-[16px]">{billerItem}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-semibold text-black text-[13px] md:text-[16px]">Transaction Date</span>
            <span className="text-black text-[13px] md:text-[16px]" >{transactionDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-black text-[13px] md:text-[16px]">Transaction ID</span>
            <span className="text-black text-[13px] md:text-[16px]" >{transactionId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-black text-[13px] md:text-[16px]">Status</span>
            <span
              className={`text-white text-sm px-3 py-1 rounded ${
                status === "completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {status}
            </span>
          </div>
          {token !== "N/A" && (
            <div className="flex justify-between items-center">
              <span className="font-semibold text-black text-[13px] md:text-[16px]">Token</span>
              <span className="text-black text-[13px] md:text-[16px]" >{token}</span>
            </div>
          )}
        </div>

        {/* Go Back Button */}
        <button
          onClick={onClose}
          className="bg-[#130534] text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-[#2e1862] transition w-full"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ReceiptModel;
