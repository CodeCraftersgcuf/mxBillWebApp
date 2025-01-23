import React, { useState, useEffect } from "react";
import Options from "./Options";

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
  const itemList = billerItems?.itemList || []; // Use the item list from parent
  const [selectedItem, setSelectedItem] = useState(itemList?.[0] || {}); // Initialize with the first item or an empty object
  const [amount, setAmount] = useState(selectedItem?.amount || ""); // Initialize amount based on selectedItem
  const [validationError, setValidationError] = useState(""); // To track validation errors

  // Sync selectedItem with parent
  useEffect(() => {
    onSelectionChange(selectedItem); // Notify parent of the updated item
  }, [selectedItem, onSelectionChange]);

  // Sync the amount with parent
  useEffect(() => {
    onAmountChange(amount);
  }, [amount, onAmountChange]);

  // Automatically sync customerId with phoneNumber for Airtime/Data
  useEffect(() => {
    if ((category === "Airtime" || category === "Data") && phoneNumber) {
      setCustomerId(phoneNumber);
    }
  }, [phoneNumber, category]);
  

  // Handle dropdown selection
  const handleDropdownChange = (selectedOption) => {
    const newItem = itemList.find(
      (item) => item.paymentitemname === selectedOption
    );
    if (newItem) {
      setSelectedItem(newItem); // Update selectedItem
      setAmount(newItem.amount || ""); // Update amount based on the selected item
      setValidationError(""); // Clear any validation errors
    } else {
      console.error("Item not found for the selected option:", selectedOption);
    }
  };

  // Handle amount input
  const handleAmountChange = (value) => {
    // Ensure the value is a valid number or empty
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setValidationError(""); // Clear any validation errors
    } else {
      setValidationError("Invalid amount entered.");
    }
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
              setValidationError(""); // Clear any validation errors
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
          setValidationError(""); // Clear any validation errors
        }}
      />
      <Options
        type="input"
        icon={<i className="fa-solid fa-wallet"></i>}
        heading="Amount"
        value={amount}
        editable={selectedItem?.amount == 0} // Allow editing only if the item has no preset amount
        onChange={handleAmountChange}
      />
    </div>
  );
};

export default Selection;
