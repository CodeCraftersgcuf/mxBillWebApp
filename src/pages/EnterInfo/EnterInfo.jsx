import React, { useState } from "react";
import Status from "./components/Status";
import Selection from "./components/Selection";
import { useParams } from "react-router-dom";
import MakePayment from "./Models/MakePayemnt";
import LowBalance from "./Models/LowBalance";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getBillerItems } from "../../util/queries/appQueries";

const EnterInfo = () => {
  const { categoryId, providerId } = useParams();
  const token = Cookies.get("authToken");

  const {
    data: billerItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["billerItems", categoryId, providerId],
    queryFn: () =>
      getBillerItems({
        categoryId,
        providerId,
        token,
      }),
    enabled: !!token && !!categoryId && !!providerId,
  });

  const [PaymentModel, setPaymentModel] = useState(false);
  const [showLowBalance, setShowLowBalance] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [manualAmount, setManualAmount] = useState("");

  const item = !isLoading && !isError && billerItems?.data?.itemList?.[0] ? billerItems.data.itemList[0] : null;

  const calculateTotal = () => {
    const itemAmount = manualAmount || selectedItem?.amount || 0;
    const charges = selectedItem?.fixedComission || 0;
    return parseFloat(itemAmount) + parseFloat(charges);
  };

  return (
    <div className="p-4 relative">
      {isLoading && (
        <div className="text-center text-lg font-bold">
          Loading biller information...
        </div>
      )}
      {isError && (
        <div className="text-center text-lg font-bold text-red-500">
          Unable to fetch biller information. Please try again.
        </div>
      )}
      {!isLoading && !isError && billerItems && (
        <>
          <MakePayment
            show={PaymentModel}
            BillName={selectedItem?.paymentitemname || "Bill"}
            AccountName="John Doe"
            Amount={manualAmount || selectedItem?.amount || "0"}
            ChargeApplied={selectedItem?.fixedComission || "0"}
            total={calculateTotal()}
            Balance="500" // Replace with dynamic balance if needed
            onClose={() => setPaymentModel(false)}
          />
          <LowBalance
            show={showLowBalance}
            onClose={() => setShowLowBalance(false)}
            fundLink={"#"}
          />
          <div className={`mx-w-[100%] md:max-w-[70%] mx-auto my-4`}>
            <h1 className="text-center capitalize font-bold text-2xl">
              Top up your {billerItems?.data?.provider?.title || "account"}
            </h1>
            <p className="text-center my-4 md:w-[80%] text-lg mx-auto">
              {billerItems?.data?.provider?.description ||
                "Quickly top up your account and keep the fun going! Enjoy seamless deposits anytime, anywhere."}
            </p>
            <div className="bg-gray-400 my-4 w-full h-[4px] rounded"></div>
            <Status />
            <Selection
              billerItems={billerItems?.data || {}}
              onSelectionChange={setSelectedItem}
              onAmountChange={setManualAmount}
            />
            <div className="mt-8">
              <button
                onClick={() => setPaymentModel(!PaymentModel)}
                className="px-4 py-2 bg-theme-primary text-white rounded-lg shadow-lg text-center w-fit mx-auto block font-bold"
              >
                Confirm & Make Payment
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnterInfo;
