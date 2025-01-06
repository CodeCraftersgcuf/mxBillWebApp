import React, { useContext, useEffect, useState } from "react";
import Status from "./components/Status";
import Selection from "./components/Selection";
import { useParams } from "react-router-dom";
import MakePayment from "./Models/MakePayemnt";
import LowBalance from "./Models/LowBalance";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getBillerItems } from "../../util/queries/appQueries";
import { validateCustomer } from "../../util/mutations/accountMutations";
import { getBalance } from "../../util/queries/accountQueries";
import Loader from "../../components/Loader";
// import { AuthContext } from "../../context/AuthContext";

const EnterInfo = () => {
  const { categoryId, providerId } = useParams();
  const token = Cookies.get("authToken");
  const user = Cookies.get("userId");
  const [category, setCategory] = useState("");
  const [PaymentModel, setPaymentModel] = useState(false);
  const [showLowBalance, setShowLowBalance] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error");
  const [selectedItem, setSelectedItem] = useState(null);
  const [customerId, setCustomerId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loaderLoading, setLoaderLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [manualAmount, setManualAmount] = useState("");
  const firstName = Cookies.get("firstName");
  const lastName = Cookies.get("lastName");
  const {
    data: balanceData,
    isLoading: balanceLoading,
    isError: balanceError,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(token),
    enabled: !!token,
    refetchInterval: 5000,
  });

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

  const item =
    !isLoading && !isError && billerItems?.data?.itemList?.[0]
      ? billerItems.data.itemList[0]
      : null;

  useEffect(() => {
    if (billerItems) {
      setCategory(billerItems?.data?.category?.category);
    }
  });
  const calculateTotal = () => {
    const itemAmount = manualAmount || selectedItem?.amount || 0;
    const charges = selectedItem?.fixedComission || 0;
    const percetageCommission = selectedItem?.percentageComission || 0;
    const perccetangeValue = (itemAmount * percetageCommission) / 100;
    console.log("perccetangeValue", perccetangeValue);
    return (
      parseFloat(itemAmount) +
      parseFloat(charges) +
      parseFloat(perccetangeValue)
    );
  };

  const { mutate: validate, isPending: isValidating } = useMutation({
    mutationFn: validateCustomer,
    onMutate: () => {
      setLoaderLoading(true); // Show the loader when the mutation starts
    },
    onSuccess: (data) => {
      // console.log(data);
      setLoaderLoading(false);
      setUserName(data?.customerName ?? firstName + " " + lastName);
      setPaymentModel(true);
      // rbSheetRef?.current.open();
    },
    onError: (data) => {
      setLoaderLoading(false);
      console.log("error message", data.message);
      setErrorMessage(data.message); // Set the error message
      setShowLowBalance(true); // Show the LowBalance modal
    },
  });

  // const handleValidationCLicked = () => {

  // };
  const handleValidationCLicked = () => {
    // Determine the final amount to validate
    const amountToValidate = manualAmount || selectedItem?.amount;

    // Perform validation
    if (!selectedItem || !selectedItem.id) {
      alert("Please select a valid item.");
      return;
    }
    if (!phoneNumber || phoneNumber.trim() === "") {
      alert("Please enter a valid phone number.");
      return;
    }
    if (
      category !== "Airtime" &&
      category !== "Data" &&
      (!customerId || customerId.trim() === "")
    ) {
      alert("Please enter a valid customer ID.");
      return;
    }
    if (!amountToValidate || parseFloat(amountToValidate) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // If all validations pass
    console.log("Validation Passed!");
    console.log("Selected Item:", selectedItem);
    console.log("Customer ID:", customerId);
    console.log("Phone Number:", phoneNumber);
    console.log("Amount:", amountToValidate);

    // Call mutation or API to submit the data
    validate({
      data: {
        customerId:
          category === "Airtime" || category === "Data"
            ? phoneNumber
            : customerId,
        id: selectedItem.id.toString(),
      },
      token,
    });
  };

  const calculateChargesApplied = () => {
    const itemAmount = manualAmount || selectedItem?.amount || 0;
    const charges = selectedItem?.fixedComission || 0;
    const percetageCommission = selectedItem?.percentageComission || 0;
    const perccetangeValue = (itemAmount * percetageCommission) / 100;
    return parseFloat(charges) + parseFloat(perccetangeValue);
  };
  return (
    <div className="p-4 relative md:max-w-[100%] mx-0 md:mx-auto"
    style={{
      minHeight: "calc(100vh - 64px)",
      maxWidth: "90%", // This will be applied for small screens between 325px and 420px
    }}
  
    >
      {loaderLoading && <Loader />}
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
            setSho={setPaymentModel}
            BillName={selectedItem?.paymentitemname || "Bill"}
            AccountName={userName}
            billerId={selectedItem?.id}
            billerItemId={selectedItem?.billerId}
            customerId={customerId}
            Amount={manualAmount || selectedItem?.amount || "0"}
            ChargeApplied={calculateChargesApplied()}
            total={calculateTotal()}
            Balance={balanceData?.balance}
            onClose={() => setPaymentModel(false)}
          />
          <LowBalance
            show={showLowBalance}
            onClose={() => setShowLowBalance(false)}
            errorMessage={errorMessage}
            message={errorMessage}
            fundLink={"#"}
          />
          <div className={``}>
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
              category={category}
              billerItems={billerItems?.data || {}}
              onSelectionChange={setSelectedItem}
              onAmountChange={setManualAmount}
              customerId={customerId}
              setCustomerId={setCustomerId}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
            <div className="mt-8">
              <button
                onClick={() => handleValidationCLicked()}
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
