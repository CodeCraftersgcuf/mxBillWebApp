import React, { useState, useEffect } from "react";
import Options from "./Options";
import { useQuery } from "@tanstack/react-query";
import { getBillerItemDetails } from "../../../util/queries/appQueries";
import Cookies from "js-cookie";

const Selection = ({ billerItems, onSelectionChange, onAmountChange }) => {
  const token = Cookies.get("authToken");

  const itemList = billerItems?.itemList || [];
  const [selectedItem, setSelectedItem] = useState(itemList?.[0] || {});
  const [customerId, setCustomerId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(selectedItem?.amount || "");

  const { data: billerItemDetails, isLoading } = useQuery({
    queryKey: ["billerItemDetails", selectedItem?.id],
    queryFn: () =>
      getBillerItemDetails({
        itemId: selectedItem?.id,
        token,
      }),
    enabled: !!token && !!selectedItem?.id,
  });

  useEffect(() => {
    onSelectionChange(selectedItem);
    onAmountChange(amount);
  }, [selectedItem, amount, onSelectionChange, onAmountChange]);

  const handleDropdownChange = (selectedOption) => {
    const newItem = itemList.find((item) => item.paymentitemname === selectedOption);
    setSelectedItem(newItem || {});
    setAmount(newItem?.amount || ""); // Reset amount to the item's default amount
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    onAmountChange(value); // Notify parent of manual changes to the amount
  };

  return (
    <div className="mt-8 flex flex-col gap-4">
      <Options
        type="dropdown"
        icon={<i className="fa-solid fa-arrow-pointer"></i>}
        heading="Select"
        options={itemList.map((item) => item.paymentitemname)}
        value={selectedItem?.paymentitemname || ""}
        onChange={handleDropdownChange}
      />
      <Options
        type="input"
        icon={<i className="fa-solid fa-user"></i>}
        heading="Customer ID"
        value={customerId}
        onChange={setCustomerId}
      />
      <Options
        type="input"
        icon={<i className="fa-solid fa-mobile-screen"></i>}
        heading="Phone Number"
        value={phoneNumber}
        onChange={setPhoneNumber}
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
