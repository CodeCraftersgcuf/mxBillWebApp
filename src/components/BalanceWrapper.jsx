import React from "react";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../util/queries/accountQueries";
const BalanceWrapper = ({ children }) => {
  const token = Cookies.get("authToken");

  const {
    data: balanceData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(token),
    enabled: !!token,
    refetchInterval: 5000,
  });

  if (!token) {
    console.error("Token is missing. Redirecting to login...");
    // Optional: Redirect to login if token is missing
  }

  if (isError) {
    console.error("Error fetching user balance:", error);
  }
  console.log("balanceData", balanceData);
  const balanceDisplayData = [
    {
      title: "Total Bill Payment",
      amount: balanceData?.totalBillPayment ?? 0,
    },
    {
      title: "Current Balance",
      amount: balanceData?.balance ?? 0,
    },
    {
      title: "Total Wallet Deposit",
      amount: balanceData?.totalIncome ?? 0,
    },
  ];

  return (
    <>
      {children({ balanceDisplayData, isLoading })}
    </>
  );
};

export default BalanceWrapper;
