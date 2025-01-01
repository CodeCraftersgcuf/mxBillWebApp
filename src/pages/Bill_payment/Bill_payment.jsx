import React from "react";
import Balance from "../Dashboard/components/balance/Balance";
import Menuitems from "../Dashboard/components/Menuitems/Menuitems";
import BalanceWrapper from "../../components/BalanceWrapper";

const Bill_payment = () => {
  return (
    <BalanceWrapper>
      {({ balanceDisplayData }) => (
        <div className="p-4 text-4xl">
          <Balance balanceData={balanceDisplayData} />
          <Menuitems textSize={"lg"} icon={"2xl"} circleSize={"20"} perColumn="4" />
        </div>
      )}
    </BalanceWrapper>
  );
};

export default Bill_payment;
