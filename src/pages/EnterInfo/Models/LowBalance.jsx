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
    <div className="modal fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="main bg-white w-full max-w-[80%] md:max-w-[30%] p-3 rounded-lg flex flex-col gap-3 relative">
        {/* Warning Icon and Message */}
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="text-red-500 text-3xl">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <h2 className="text-sm md:text-base font-semibold">{errorMessage}</h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-3">
          <button
            onClick={onClose}
            className="bg-theme-primary text-white py-2 rounded-lg font-bold text-sm hover:bg-theme-secondary transition"
          >
            Close
          </button>
          {isFundWallet && (
            <Link to={fundLink} className="w-full">
              <button className="bg-theme-primary text-white py-2 rounded-lg font-bold text-sm hover:bg-theme-secondary transition">
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
