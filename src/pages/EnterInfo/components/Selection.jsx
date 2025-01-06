import React, { useState, useEffect } from "react";
import Options from "./Options";
import { useQuery } from "@tanstack/react-query";
import { getBillerItemDetails } from "../../../util/queries/appQueries";
import Cookies from "js-cookie";

const Selection = ({
  billerItems,
  onSelectionChange,
  onAmountChange,
  setCustomerId,
  customerId,
  setPhoneNumber,
  phoneNumber,
  category,
}) => {
  const token = Cookies.get("authToken");

  const itemList = billerItems?.itemList || [];
  const [selectedItem, setSelectedItem] = useState(itemList?.[0] || {});
  const [amount, setAmount] = useState(selectedItem?.amount || "");
  const [validationError, setValidationError] = useState(""); // To track validation errors

  const { data: billerItemDetails } = useQuery({
    queryKey: ["billerItemDetails", selectedItem?.id],
    queryFn: () =>
      getBillerItemDetails({
        itemId: selectedItem?.id,
        token,
      }),
    enabled: !!token && !!selectedItem?.id,
  });

  // Merge selectedItem with fetched details and send to parent
  useEffect(() => {
    const fullItemDetails = {
      ...selectedItem,
      ...(billerItemDetails?.data || {}), // Merge with API details
    };
    onSelectionChange(fullItemDetails); // Notify parent of the merged details
  }, [selectedItem, billerItemDetails, onSelectionChange]);

  // Notify parent about the updated amount
  useEffect(() => {
    onAmountChange(amount);
  }, [amount, onAmountChange]);

  // Automatically set customerId to phoneNumber for Airtime/Data categories
  useEffect(() => {
    if (category === "Airtime" || category === "Data") {
      setCustomerId(phoneNumber); // Sync customerId with phoneNumber
    }
  }, [phoneNumber, category, setCustomerId]);

  // Handle dropdown selection
  const handleDropdownChange = (selectedOption) => {
    const newItem = itemList.find(
      (item) => item.paymentitemname === selectedOption
    );
    setSelectedItem(newItem || {});
    setAmount(newItem?.amount || ""); // Reset amount when selection changes
    setValidationError(""); // Clear validation errors
  };

  // Handle manual amount input
  const handleAmountChange = (value) => {
    setAmount(value);
    setValidationError(""); // Clear validation errors
  };

  return (
    <div className="mt-8 flex flex-col gap-4">
      {/* Validation Error Display */}
      {validationError && (
        <div className="text-red-500 text-sm font-bold mb-2">
          {validationError}
        </div>
      )}
      <Options
        type="dropdown"
        icon={<i className="fa-solid fa-arrow-pointer"></i>}
        heading="Select"
        options={itemList.map((item) => item.paymentitemname)}
        value={selectedItem?.paymentitemname || ""}
        onChange={handleDropdownChange}
      />
      {category !== "Airtime" &&
        category !== "Data" && (
          <Options
            type="input"
            icon={<i className="fa-solid fa-user"></i>}
            heading="Customer ID"
            value={customerId}
            onChange={(value) => {
              setCustomerId(value);
              setValidationError(""); // Clear validation errors
            }}
          />
        )}
      <Options
        type="input"
        icon={<i className="fa-solid fa-mobile-screen"></i>}
        heading="Phone Number"
        value={phoneNumber}
        onChange={(value) => {
          setPhoneNumber(value);
          setValidationError(""); // Clear validation errors
        }}
      />
      <Options
        type="input"
        icon={<i className="fa-solid fa-wallet"></i>}
        heading="Amount"
        value={amount}
        editable={selectedItem?.amount === 0}
        onChange={handleAmountChange}
      />
    </div>
  );
};

export default Selection;
