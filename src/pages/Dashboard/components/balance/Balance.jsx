import React from 'react';
import SubBalance from './SubBalance';

const Balance = ({ balanceData = [] }) => {
  return (
    <div className="bg-theme-primary text-white rounded-lg shadow-lg shadow-gray-600 px-4 py-12 flex flex-col md:flex-row justify-around md:items-center gap-4">
      {balanceData.map((bal, index) => (
        <SubBalance
          key={index}
          amount={bal.amount}
          title={bal.title}
          paddingBottom={index === 1 ? 'md:pb-12' : ''}
        />
      ))}
    </div>
  );
};

export default Balance;
