// Transaction Component
import React, { useState } from "react";
import Balance from "../Dashboard/components/balance/Balance";
import Recet from "../Dashboard/components/Recet/Recet";
import ReceiptModel from "./components/ReceiptModel";
import BalanceWrapper from "../../components/BalanceWrapper";
import { useQuery } from "@tanstack/react-query";
import { getTrsansactionDetails } from "../../util/queries/appQueries";
import {getTransferHistory} from "../../util/queries/accountQueries";
import Cookies from "js-cookie";

const Transaction = () => {
  const token = Cookies.get("authToken");

  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Fetch transfer history
  const {
    data: transferHistory,
    isLoading: isLoadingHistory,
    isError: isErrorHistory,
  } = useQuery({
    queryKey: ["transferHistory"],
    queryFn: () => getTransferHistory(token),
    enabled: !!token,
  });

  // Fetch transaction details when a transaction is selected
  const {
    data: transactionDetails,
    isLoading: isLoadingDetails,
  } = useQuery({
    queryKey: ["transactionDetails", selectedTransaction?.id],
    queryFn: () => getTrsansactionDetails({ id: selectedTransaction?.id, token }),
    enabled: !!token && !!selectedTransaction,
  });

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowReceipt(true);
  };

  return (
    <BalanceWrapper>
      {({ balanceDisplayData }) => (
        <div className="p-4 relative min-h-[90vh]">
          {/* Receipt Model */}
          <ReceiptModel
            show={showReceipt}
            onClose={() => setShowReceipt(false)}
            amountPaid={transactionDetails?.data?.totalAmount || "N/A"}
            billerCategory={transactionDetails?.data?.category || "N/A"}
            billerProvider={transactionDetails?.data?.provider || "N/A"}
            billerItem={transactionDetails?.data?.item || "N/A"}
            transactionDate={transactionDetails?.data?.transactionDate || "N/A"}
            transactionId={transactionDetails?.data?.transactionId || "N/A"}
            status={transactionDetails?.data?.status || "N/A"}
          />

          {/* Balance Component */}
          <Balance balanceData={balanceDisplayData} />

          {/* Transactions or No History Message */}
          <div className="my-6">
            {isLoadingHistory ? (
              <p>Loading transaction history...</p>
            ) : isErrorHistory || !transferHistory?.data?.length ? (
              <p className="text-center text-gray-500">No transaction history available.</p>
            ) : (
              transferHistory.data.map((transaction) => (
                <div
                  key={transaction.transaction_id}
                  className="p-4 bg-gray-100 rounded-lg mb-4 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <h4 className="font-bold">{transaction.item}</h4>
                  <p>Amount: {transaction.amount}</p>
                  <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
                  <p>Type: {transaction.type}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </BalanceWrapper>
  );
};

export default Transaction;