import React from "react";

const MakePayment = ({
  show = false,
  BillName = "N/A",
  AccountName = "N/A",
  Amount = "N/A",
  ChargeApplied = "N/A",
  total = "N/A",
  Balance = "N/A",
  onClose = () => {},
}) => {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-end justify-center"
      onClick={handleOutsideClick}
    >
      <div className="main bg-white w-full md:w-[60%] p-4 rounded-t-lg flex flex-col gap-4">
        <div className="flex items-center justify-between text-2xl">
          <h1 className="font-bold">Bill Name</h1>
          <h1>{BillName}</h1>
        </div>
        <div className="flex items-center justify-between text-2xl">
          <h1 className="font-bold">Account Name</h1>
          <h1>{AccountName}</h1>
        </div>
        <div className="flex items-center justify-between text-2xl">
          <h1 className="font-bold">Amount</h1>
          <h1>{Amount}</h1>
        </div>
        <div className="flex items-center justify-between text-2xl">
          <h1 className="font-bold">Charges Applied</h1>
          <h1>{ChargeApplied}</h1>
        </div>
        <div className="flex items-center justify-between text-2xl">
          <h1 className="font-bold">Total Payment</h1>
          <h1>{total}</h1>
        </div>
        <div className="bg-theme-primary text-white p-2 flex items-center justify-between text-2xl rounded-lg">
          <h1 className="font-bold flex items-center gap-2">
            <i className="fa-solid fa-wallet"></i>
            Balance
          </h1>
          <h1>{Balance}</h1>
        </div>
        <div>
          <button className="bg-theme-primary text-white p-2 py-4 font-bold text-2xl rounded-lg hover:bg-theme-secondary transition duration-300 w-full">
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
