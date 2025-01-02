import React, { useState } from "react";
import Balance from "../Dashboard/components/balance/Balance";
import ReceiptModel from "./components/ReceiptModel";
import BalanceWrapper from "../../components/BalanceWrapper";
import { useQuery } from "@tanstack/react-query";
import { getTrsansactionDetails } from "../../util/queries/appQueries";
import { getTransferHistory } from "../../util/queries/accountQueries";
import Cookies from "js-cookie";
import Label from "../Dashboard/components/Recet/Label";

const ITEMS_PER_PAGE = 5;

const Transaction = () => {
  const token = Cookies.get("authToken");

  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
  const { data: transactionDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["transactionDetails", selectedTransactionId],
    queryFn: () => getTrsansactionDetails({ id: selectedTransactionId, token }),
    enabled: !!token && !!selectedTransactionId,
  });

  const handleTransactionClick = (transaction) => {
    setSelectedTransactionId(transaction.transaction_id); // Pass the correct ID to fetch details
    setShowReceipt(true);
  };

  const totalPages = Math.ceil(
    (transferHistory?.data?.length || 0) / ITEMS_PER_PAGE
  );

  const paginatedTransactions = transferHistory?.data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <BalanceWrapper>
      {({ balanceDisplayData }) => (
        <div className="p-4 relative min-h-[90vh]">
          {/* Receipt Model */}
          <ReceiptModel
            show={showReceipt}
            onClose={() => setShowReceipt(false)}
            amountPaid={`₦${transactionDetails?.data?.amount || "loading..."}`}
            billerCategory={transactionDetails?.data?.category || "loading..."}
            billerProvider={transactionDetails?.data?.provider || "loading..."}
            billerItem={transactionDetails?.data?.item || "loading..."}
            transactionDate={
              transactionDetails?.data?.transactionDate
                ? new Date(
                    transactionDetails.data.transactionDate
                  ).toLocaleString()
                : "loading..."
            }
            transactionId={transactionDetails?.data?.transactionId || "loading..."}
            status={transactionDetails?.data?.status || "loading..."}
            token={transactionDetails?.data?.token || "N/A"}
          />

          {/* Balance Component */}
          <Balance balanceData={balanceDisplayData} />

          {/* Transactions or No History Message */}
          <div className="my-6">
            {isLoadingHistory ? (
              <p className="text-center text-gray-500">
                Loading transaction history...
              </p>
            ) : isErrorHistory || !transferHistory?.data?.length ? (
              <p className="text-center text-gray-500">
                No transaction history available.
              </p>
            ) : (
              <div>
                {paginatedTransactions.map((transaction) => (
                  <div
                    key={transaction.transaction_id}
                    className=" bg-white shadow-lg rounded-lg mb-4 cursor-pointer hover:shadow-xl transition-shadow duration-200"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <Label
                      heading={transaction.item || "N/A"}
                      subheading={transaction.category || "N/A"}
                      amount={`₦${transaction.amount.toFixed(2)}`}
                      date={
                        new Date(transaction.date).toLocaleDateString() || "N/A"
                      }
                    />
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <button
                    className={`px-4 py-2 rounded ${
                      currentPage === 1
                        ? "bg-gray-300"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className={`px-4 py-2 rounded ${
                      currentPage === totalPages
                        ? "bg-gray-300"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </BalanceWrapper>
  );
};

export default Transaction;
