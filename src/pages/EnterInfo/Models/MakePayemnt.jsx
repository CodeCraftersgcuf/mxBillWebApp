/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { payBillFn } from "../../../util/mutations/accountMutations";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import LowBalance from "./LowBalance";
import ReceiptModel from "../../transaction/components/ReceiptModel";
import Loader from "../../../components/Loader";

const MakePayment = ({
  show = false,
  customerId,
  billerId,
  billerItemId,
  phoneNumber,
  BillName = "N/A",
  AccountName = "N/A",
  Amount = "N/A",
  ChargeApplied = "N/A",
  total = "N/A",
  Balance = "N/A",
  onClose = () => {},
  setSho = () => {},
}) => {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  const userId = Cookies.get("userId");
  const [errorMessage, setErrorMessage] = useState("Error");
  const [modalShow, setModalShow] = useState(false);
  const [receiptShow, setReceiptShow] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [fundwalet, setFundwalet] = useState(false);
  const token = Cookies.get("authToken"); // Retrieve token from cookies
  const [loaderLoading, setLoaderLoading] = useState(false);
  const { mutate: payBill, isPending: isBillPaying } = useMutation({
    mutationFn: payBillFn,
    onMutate: () => {
      setLoaderLoading(true);
    },
    onSuccess: (data) => {
      // alert('Transaction successful');
      setLoaderLoading(false);
      console.log("transaction_data", data);
      setTransactionDetails(data);
      setReceiptShow(true);
      // setSho(false);
    },
    onError: (error) => {
      setLoaderLoading(false);
      setErrorMessage(error.message);
      setModalShow(true);
      setFundwalet(true);
      // setSho(false);
      // alert(error.message);
    },
  });
  console.log("BilllerId", billerId);
  console.log("BillerItemId", billerItemId);
  console.log("CustomerID", customerId);
  console.log("PhoneNumber", phoneNumber);
  console.log("BillName", BillName);
  console.log("AccountName", AccountName);
  console.log("Amount", Amount);
  console.log("ChargeApplied", ChargeApplied);
  console.log("Total", total);
  console.log("Balance", Balance);
  const handlePaymentFunction = () => {
    const reqData = {
      amount: Amount,
      customerId: customerId,
      billerId: billerItemId,
      billerItemId: billerId,
      phoneNumber: phoneNumber,
      userId,
    };
    payBill({
      data: reqData,
      token,
    });
  };

  if (!show) return null;

  return (
    <div
      className="modal absolute top-0 left-0 w-full min-h-full bg-gray-900 bg-opacity-50 z-50 flex items-end justify-center"
      onClick={handleOutsideClick}
    >
      {loaderLoading && <Loader />}
      <LowBalance
        show={modalShow}
        isFundWallet={fundwalet}
        setParentState={setSho}
        onClose={() => {
          setModalShow(false);
          setSho(false);
        }}
        errorMessage={errorMessage}
        message={errorMessage} // Pass the error message to the modal
        fundLink={"/fund/wallet"}
      />
      <ReceiptModel
        show={receiptShow}
        onClose={() => setReceiptShow(false)}
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
      <div className="main bg-white w-full md:w-[60%] p-4 rounded-t-lg flex flex-col gap-4">
        <div className="flex items-center justify-between text-2xl">
          <h1 className="font-bold">Bill Name</h1>
          <h1>{BillName}</h1>
        </div>
        <div className="flex items-center justify-between text-2xl">
          <h1 className="font-bold">Account Name</h1>
          <h1>{AccountName}</h1>
        </div>
        <div className="flex items-center justify-between text-2xl">
          <h1 className="font-bold">Amount</h1>
          <h1>{Amount}</h1>
        </div>
        <div className="flex items-center justify-between text-2xl">
          <h1 className="font-bold">Charges Applied</h1>
          <h1>{ChargeApplied}</h1>
        </div>
        <div className="flex items-center justify-between text-2xl">
          <h1 className="font-bold">Total Payment</h1>
          <h1>{total}</h1>
        </div>
        <div className="bg-theme-primary text-white p-2 flex items-center justify-between text-2xl rounded-lg">
          <h1 className="font-bold flex items-center gap-2">
            <i className="fa-solid fa-wallet"></i>
            Balance
          </h1>
          <h1>{Balance}</h1>
        </div>
        <div>
          <button
            className="bg-theme-primary text-white p-2 py-4 font-bold text-2xl rounded-lg hover:bg-theme-secondary transition duration-300 w-full"
            onClick={handlePaymentFunction}
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
