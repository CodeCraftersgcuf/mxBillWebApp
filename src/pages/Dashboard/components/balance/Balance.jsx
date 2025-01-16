import SubBalance from "./SubBalance";

const Balance = ({ balanceData = [] }) => {
  return (
    <>
      {/* Default layout for screens outside 320px to 425px */}
      <div className="hidden sm:flex bg-theme-primary text-white rounded-lg shadow-lg shadow-gray-600 px-2 md:px-8 py-16 flex-row items-center justify-between gap-2">
        {balanceData.map((bal, index) => (
          <SubBalance
            key={index}
            amount={bal.amount}
            title={bal.title}
            paddingBottom={index === 1 ? "pb-4 mb-8" : "pb-0"}
          />
        ))}
      </div>

      {/* Specific layout for screens between 320px and 425px */}
      <div className="sm:hidden">
        <div className="bg-theme-primary text-white rounded-lg shadow-lg shadow-gray-600 px-2 md:px-8 py-16 flex flex-col gap-2">
          <div>
            <SubBalance
              amount={balanceData[1].amount}
              title={balanceData[1].title}
              paddingBottom={""}
            />
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <SubBalance
              amount={balanceData[0].amount}
              title={balanceData[0].title}
              paddingBottom={""}
            />
            <SubBalance
              amount={balanceData[2].amount}
              title={balanceData[2].title}
              paddingBottom={""}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Balance;
