import React, { useContext, useEffect } from "react";
import Header from "./components/Header";
import AcountCan from "./components/AcountCan";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";

const FundWallet = () => {
  const { accountBalance } = useContext(AuthContext);

  useEffect(() => {
    // Debug Cookies and Context
    console.log("Cookies accountBalance:", Cookies.get("accountBalance"));
    console.log("AuthContext accountBalance:", accountBalance);
  }, [accountBalance]);

  return (
    <div className="p-4">
      <Header
        heading="Fund wallet"
        amount={accountBalance || 0} // Default to 0 if accountBalance is null
        Subheading="Current Balance"
      />
      <div className="my-4 text-center flex flex-col gap-4 mb-12">
        <h1 className="text-xl font-semibold">
          To make bill payments, fund your wallet by following these steps:
        </h1>
        <h1 className="text-xl font-semibold">
          1. Copy The bank account details below.
        </h1>
        <h1 className="text-xl font-semibold">
          2. Open your banking app and select VFD microfinance Bank (VFd MFB).
        </h1>
      </div>
      <h1 className="text-center text-green-600 font-bold text-xl">
        Account Number is valid until Dec, 03 at 12:42PM
      </h1>
      <div className="flex items-center justify-center">
        <AcountCan
          accountName="demo account name"
          bankName="demo bank name"
          accountNumber="123123123"
        />
      </div>
    </div>
  );
};

export default FundWallet;
