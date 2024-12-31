import React from 'react';

const ReceiptModel = ({
  show = false,
  onClose = () => {},
  amountPaid = 'N/A',
  billerCategory = 'N/A',
  billerProvider = 'N/A',
  billerItem = 'N/A',
  transactionDate = 'N/A',
  transactionId = 'N/A',
  status = 'N/A',
}) => {
  if (!show) return null;

  return (
    <div className="modal absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="main bg-white w-full md:w-[40%] p-6 rounded-lg flex flex-col gap-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center">E-Receipt</h2>

        {/* Receipt Details */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="font-bold">Amount Paid (NGN)</span>
            <span>{amountPaid}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Biller Category</span>
            <span>{billerCategory}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Biller Provider</span>
            <span>{billerProvider}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Biller Item</span>
            <span>{billerItem}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Transaction Date</span>
            <span>{transactionDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Transaction ID</span>
            <span>{transactionId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Status</span>
            <span className={`font-bold ${status === 'Completed' ? 'bg-green-500 text-white' : 'bg-gray-500'} p-2 rounded`}>{status}</span>
          </div>
        </div>

        {/* Go Back Button */}
        <button
          onClick={onClose}
          className="bg-theme-primary text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-theme-secondary transition w-full"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ReceiptModel;
