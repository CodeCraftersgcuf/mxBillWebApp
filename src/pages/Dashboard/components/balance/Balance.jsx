import SubBalance from './SubBalance';

const Balance = ({ balanceData = [] }) => {
  return (
    <div className="bg-theme-primary text-white rounded-lg shadow-lg shadow-gray-600 px-4 py-8 flex flex-row items-center justify-between gap-2">
      {balanceData.map((bal, index) => (
        <SubBalance
          key={index}
          amount={bal.amount}
          title={bal.title}
          paddingBottom={index === 1 ? 'pb-2' : 'pb-0'}
        />
      ))}
    </div>
  );
};

export default Balance;
