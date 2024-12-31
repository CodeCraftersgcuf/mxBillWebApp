import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const LinkComp = ({ link, icon, name }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <RouterLink to={link}>
      <div
        className={`flex items-center gap-2 p-2 text-base capitalize font-bold rounded-lg hover:bg-white hover:text-black ${
          isActive ? 'sidebar-link-active' : ''
        }`}
      >
        <i className={`bx ${icon} text-3xl`}></i>
        {name}
      </div>
    </RouterLink>
  );
};

export default LinkComp;
