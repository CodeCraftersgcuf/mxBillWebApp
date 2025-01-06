import React from "react";
import { Link } from "react-router-dom";

const LowBalance = ({
  show = false,
  onClose = () => {},
  fundLink = "#",
  errorMessage,
  isFundWallet = false,
  setParentState = () => {},
}) => {
  if (!show) return null;

  return (
    <div className="modal absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-start pt-[100px] justify-center">
      <div className="main bg-white w-full md:w-[40%] p-6 rounded-lg flex flex-col gap-6 relative">
        {/* Warning Icon and Message */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-red-500 text-5xl">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <h2 className="text-xl font-bold">{errorMessage}</h2>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-theme-primary text-white p-3 rounded-lg w-full font-bold text-lg hover:bg-theme-secondary transition"
          >
            Close
          </button>
          {isFundWallet && (
            <Link to={fundLink} className="w-full">
              <button className="bg-theme-primary text-white p-3 rounded-lg w-full font-bold text-lg hover:bg-theme-secondary transition">
                Fund Wallet
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LowBalance;
