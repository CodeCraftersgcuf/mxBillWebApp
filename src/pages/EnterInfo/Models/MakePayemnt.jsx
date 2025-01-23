/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { payBillFn } from "../../../util/mutations/accountMutations";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import LowBalance from "./LowBalance";
import ReceiptModel from "../../transaction/components/ReceiptModel";
import Loader from "../../../components/Loader";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  divisionId,
  category_id,
  productId,
  paymentCode,
  paymentitemname,
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
  const token = Cookies.get("authToken");
  const [loaderLoading, setLoaderLoading] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  const { mutate: payBill, isPending: isBillPaying } = useMutation({
    mutationFn: payBillFn,
    onMutate: () => {
      setLoaderLoading(true);
    },
    onSuccess: (data) => {
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

  console.log("PhoneNumber", phoneNumber);

  const handlePaymentFunction = () => {
    const reqData = {
      amount: Amount,
      customerId: customerId,
      billerId: billerItemId,
      billerItemId: billerId,
      phoneNumber: phoneNumber,
      division: divisionId,
      category_id: category_id,
      productId: productId,
      paymentCode: paymentCode,
      paymentitemname: paymentitemname,
      userId,
    };
    payBill({
      data: reqData,
      token,
    });
  };
  const handleOnClose = () => {
    navigate("/dashboard"); // Correct usage of navigate function
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
        comingFromBill={true}
        onClose={handleOnClose}
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
      <div className="main bg-white w-full md:w-[80%] lg:w-[60%] p-4 rounded-t-lg flex flex-col gap-4 sm:gap-6">
        {/* Bill Name */}
        <div className="flex flex-row items-center justify-between text-base sm:text-lg">
          <h1 className="font-bold">Bill Name</h1>
          <h1 className="text-gray-700">{BillName}</h1>
        </div>

        {/* Account Name */}
        <div className="flex flex-row items-center justify-between text-base sm:text-lg">
          <h1 className="font-bold">Account Name</h1>
          <h1 className="text-gray-700">{AccountName}</h1>
        </div>

        {/* Amount */}
        <div className="flex flex-row items-center justify-between text-base sm:text-lg">
          <h1 className="font-bold">Amount</h1>
          <h1 className="text-gray-700">{Amount}</h1>
        </div>

        {/* Charges Applied */}
        <div className="flex flex-row items-center justify-between text-base sm:text-lg">
          <h1 className="font-bold">Charges Applied</h1>
          <h1 className="text-gray-700">{ChargeApplied}</h1>
        </div>

        {/* Total Payment */}
        <div className="flex flex-row items-center justify-between text-base sm:text-lg">
          <h1 className="font-bold">Total Payment</h1>
          <h1 className="text-gray-700">{total}</h1>
        </div>

        {/* Balance Section */}
        <div className="bg-theme-primary text-white p-3 sm:p-4 flex flex-row items-center justify-between text-base sm:text-lg rounded-lg">
          <h1 className="font-bold flex items-center gap-2">
            <i className="fa-solid fa-wallet"></i>
            Balance
          </h1>
          <h1>{Balance}</h1>
        </div>

        {/* Payment Button */}
        <div>
          <button
            className="bg-theme-primary text-white p-3 sm:p-4 font-bold text-base sm:text-lg rounded-lg hover:bg-theme-secondary transition duration-300 w-full"
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
