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

  const { data: transactionDetails } = useQuery({
    queryKey: ["transactionDetails", selectedTransactionId],
    queryFn: () => getTrsansactionDetails({ id: selectedTransactionId, token }),
    enabled: !!token && !!selectedTransactionId,
  });

  const handleTransactionClick = (transaction) => {
    setSelectedTransactionId(transaction.transaction_id);
    setShowReceipt(true);
  };

  const { data: transferHistory, isLoading, isError } = useQuery({
    queryKey: ["transferHistory"],
    queryFn: () => getTransferHistory(token),
    enabled: !!token,
  });

  return (
    <div className="p-3 sm:p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-bold text-lg sm:text-xl">Recent Transactions</h1>
        <Link to="/transactions">
          <h6 className="text-sm sm:text-base font-bold text-theme-primary hover:underline">
            See all
          </h6>
        </Link>
      </div>

      {/* Transaction List */}
      <div className="flex flex-col gap-3 py-3 sm:gap-4 sm:py-4">
        {isLoading ? (
          <p className="text-center text-sm sm:text-base text-gray-500">
            Loading transactions...
          </p>
        ) : isError || !transferHistory?.data?.length ? (
          <p className="text-center text-sm sm:text-base text-gray-500">
            No recent transactions available.
          </p>
        ) : (
          transferHistory.data.slice(0, 5).map((transaction) => (
            <div
              key={transaction.transaction_id}
              onClick={() => handleTransactionClick(transaction)}
            >
              <Label
                heading={transaction.item || "N/A"}
                subheading={transaction.category || "N/A"}
                amount={transaction.amount || "0"}
                date={
                  new Date(transaction.date).toLocaleDateString() || "N/A"
                }
              />
            </div>
          ))
        )}
      </div>

      {/* Receipt Modal */}
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
