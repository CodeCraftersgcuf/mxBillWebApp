import React from 'react';
import { Link } from 'react-router-dom';

const LinkComp = ({ name, link, icon, isActive, onClick }) => {
    return (
        <Link
            to={link}
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
                isActive ? 'bg-white text-black' : 'hover:bg-gray-700'
            }`}
        >
            <i className={`bx ${icon} text-2xl`}></i>
            <span className="capitalize">{name}</span>
        </Link>
    );
};

export default LinkComp;
