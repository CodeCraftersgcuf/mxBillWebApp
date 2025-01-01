import React from 'react';
import Account from './Account';
import { useNavigate } from 'react-router-dom';

const AccountCan = ({ providers = [], categoryId }) => {
  const navigate = useNavigate();

  const handleProviderClick = (providerId) => {
    navigate(`/${categoryId}/${providerId}`);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {providers.map((provider, index) => (
        <div key={index} onClick={() => handleProviderClick(provider.id)}>
          <Account image={provider.logo} />
        </div>
      ))}
    </div>
  );
};

export default AccountCan;
