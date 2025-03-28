import React, { useContext } from "react";
import Header from "./components/Header";
import AcountCan from "./components/AcountCan";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getFundAccountNo } from "../../util/queries/accountQueries";
import { AuthContext } from "../../context/AuthContext";

const FundWallet = () => {
  const { accountBalance } = useContext(AuthContext);

  const token = Cookies.get("authToken");

  // Fetch account details from the API
  const {
    data: accountData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["accountBalance"],
    queryFn: () => getFundAccountNo(token),
    enabled: !!token,
  });
  console.log("accountData", accountData);
  // Handle loading and error states
  if (isLoading) {
    return (
      <p className="text-center text-gray-500">Loading account details...</p>
    );
  }

  if (isError || !accountData?.data) {
    return (
      <p className="text-center text-red-500">
        Failed to fetch account details.
      </p>
    );
  }

  const { accountNumber, expiryDate } = accountData.data;
  console.log("accountNumber", accountNumber);
  return (
    <div className="p-0 md:p-4">
      {/* Header Component */}
      <Header
        heading="Fund wallet"
        amount={accountBalance || 0} // Update if you want to pass a balance dynamically
        Subheading="Current Balance"
      />

      {/* Instructions */}
      <div className="text-start md:text-center my-4 ms-4 flex flex-col gap-4 mb-12">
        <h1 className="text-xl font-bold">How To Fund Your Wallet</h1>
        <h1 className="text-[1rem] md:text-xl">
          To make bill payments, fund your wallet by following these steps:
        </h1>
        <h1 className="text-[1rem] md:text-xl">
          1. Copy the bank account details below.
        </h1>
        <h1 className="text-[1rem] md:text-xl">
          2. Open your banking app and select VFD Microfinance Bank (VFD MFB).
        </h1>
        <h1 className="text-[1rem] md:text-xl">
          3. Transfer your desired amount to the provided account name:Max Bill
          Pay.
        </h1>
        <h1 className="text-[1rem] md:text-xl">
          4. Wait 10-45 seconds to receive a notification and see the funds in
          your wallet.
        </h1>
        <h1 className="text-[1rem] md:text-xl">
          5. If funds don't appear within 5 minutes, visit the Help Center and
          contact Support.
        </h1>
        <h1>That's it! Now you're ready to pay bills with ease.</h1>
      </div>

      {/* Expiry Notice */}
      <h1 className="text-center text-green-600 font-bold text-sm md:text-xl">
        Account Number is valid until {new Date(expiryDate).toLocaleString()}
      </h1>

      {/* Account Details */}
      <div className="flex items-center justify-center mx-2 md:mx-0">
        <AcountCan
          accountName="Your Account Name" // Update if account name is fetched dynamically
          bankName="VFD Microfinance Bank"
          accountNumber={accountNumber || "N/A"}
        />
      </div>
    </div>
  );
};

export default FundWallet;
