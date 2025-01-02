import React from "react";
import { Link } from "react-router-dom";
import Label from "./Label";
import { useQuery } from "@tanstack/react-query";
import { getTransferHistory } from "../../../../util/queries/accountQueries";
import Cookies from "js-cookie";

const Recet = () => {
  const token = Cookies.get("authToken");

  // Fetch transfer history
  const {
    data: transferHistory,
    isLoading: isLoadingTransferHistory,
    isError: isErrorTransferHistory,
  } = useQuery({
    queryKey: ["transferHistory"],
    queryFn: () => getTransferHistory(token),
    enabled: !!token,
  });

  console.log("transferHistory", transferHistory);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-bold text-2xl">Recent Transactions</h1>
        <Link to="/transactions">
          <h6 className="text-lg font-bold text-theme-primary hover:underline">
            See all
          </h6>
        </Link>
      </div>

      <div className="flex flex-col gap-4 py-4">
        {isLoadingTransferHistory ? (
          <p className="text-center text-gray-500">Loading transactions...</p>
        ) : isErrorTransferHistory || !transferHistory?.data?.length ? (
          <p className="text-center text-gray-500">No recent transactions available.</p>
        ) : (
          transferHistory.data.slice(0, 5).map((transaction) => (
            <Label
              key={transaction.transaction_id}
              heading={transaction.item || "N/A"}
              subheading={transaction.category || "N/A"}
              amount={transaction.amount || "0"}
              date={new Date(transaction.date).toLocaleDateString() || "N/A"}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Recet;
