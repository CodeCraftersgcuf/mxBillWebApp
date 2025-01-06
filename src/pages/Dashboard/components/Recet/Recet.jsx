import React, { useState } from "react";
import { Link } from "react-router-dom";
import Label from "./Label";
import { useQuery } from "@tanstack/react-query";
import { getTransferHistory } from "../../../../util/queries/accountQueries";
import Cookies from "js-cookie";
import ReceiptModel from "../../../transaction/components/ReceiptModel";
import { getTrsansactionDetails } from "../../../../util/queries/appQueries";

const Recet = () => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const token = Cookies.get("authToken");
  const { data: transactionDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["transactionDetails", selectedTransactionId],
    queryFn: () => getTrsansactionDetails({ id: selectedTransactionId, token }),
    enabled: !!token && !!selectedTransactionId,
  });

  const handleTransactionClick = (transaction) => {
    setSelectedTransactionId(transaction.transaction_id); // Pass the correct ID to fetch details
    setShowReceipt(true);
  };
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
          <p className="text-center text-gray-500">
            No recent transactions available.
          </p>
        ) : (
          transferHistory.data.slice(0, 5).map((transaction) => (
            <div
              key={transaction.transaction_id}
              onClick={() => handleTransactionClick(transaction)}
            >
              <Label
                key={transaction.transaction_id}
                heading={transaction.item || "N/A"}
                subheading={transaction.category || "N/A"}
                amount={transaction.amount || "0"}
                date={new Date(transaction.date).toLocaleDateString() || "N/A"}
              />
            </div>
          ))
        )}
      </div>
      <ReceiptModel
        show={showReceipt}
        onClose={() => setShowReceipt(false)}
        amountPaid={`₦${transactionDetails?.data?.amount || "loading..."}`}
        billerCategory={transactionDetails?.data?.category || "loading..."}
        billerProvider={transactionDetails?.data?.provider || "loading..."}
        billerItem={transactionDetails?.data?.item || "loading..."}
        transactionDate={
          transactionDetails?.data?.transactionDate
            ? new Date(transactionDetails.data.transactionDate).toLocaleString()
            : "loading..."
        }
        transactionId={transactionDetails?.data?.transactionId || "loading..."}
        status={transactionDetails?.data?.status || "loading..."}
        token={transactionDetails?.data?.token || "N/A"}
      />
    </div>
  );
};

export default Recet;
