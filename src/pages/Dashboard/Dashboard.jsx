import React from "react";
import Balance from "./components/balance/Balance";
import Menuitems from "./components/Menuitems/Menuitems";
import Recet from "./components/Recet/Recet";
import BalanceWrapper from "../../components/BalanceWrapper";
import SliderImages from "./components/SliderImages";
const Dashboard = () => {
  return (
    <BalanceWrapper>

      {({ balanceDisplayData }) => (
        
        <section className="px-0 md:p-4">
          <div className="">
            <Balance balanceData={balanceDisplayData} />
            <Menuitems />
            <Recet />
          
            <SliderImages />
          </div>
        </section>
      )}
    </BalanceWrapper>
  );
};

export default Dashboard;
